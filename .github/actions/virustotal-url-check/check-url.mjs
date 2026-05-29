/* global Buffer, console, fetch, process, setTimeout */
import crypto from "node:crypto";
import fs from "node:fs";

const API_BASE = "https://www.virustotal.com/api/v3";

loadLocalEnv();

const input = (name, fallback = "") => process.env[`INPUT_${name}`] ?? fallback;

const apiKey = input("API_KEY", process.env.VIRUSTOTAL_APIKEY || "");
const targetUrl = input("URL", process.env.VIRUSTOTAL_URL || "https://ever-guild.net/");
const reanalyze = input("REANALYZE", "true").toLowerCase() === "true";
const waitSeconds = Number.parseInt(input("WAIT_SECONDS", "90"), 10);
const maxMalicious = Number.parseInt(input("MAX_MALICIOUS", "0"), 10);
const maxSuspicious = Number.parseInt(input("MAX_SUSPICIOUS", "0"), 10);
const failOnDetection = input("FAIL_ON_DETECTION", "true").toLowerCase() === "true";

if (!apiKey) {
  throw new Error("Missing VirusTotal API key.");
}

if (!targetUrl) {
  throw new Error("Missing URL.");
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function loadLocalEnv() {
  if (process.env.GITHUB_ACTIONS === "true" || process.env.VIRUSTOTAL_APIKEY) {
    return;
  }

  for (const path of [".env.local", ".env"]) {
    if (!fs.existsSync(path)) {
      continue;
    }

    const lines = fs.readFileSync(path, "utf8").split(/\r?\n/);
    for (const line of lines) {
      const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
      if (!match) {
        continue;
      }

      const [, key, rawValue] = match;
      if (process.env[key]) {
        continue;
      }

      process.env[key] = rawValue.replace(/^["']|["']$/g, "");
    }
  }
}

function urlId(url) {
  return Buffer.from(url).toString("base64url");
}

function reportUrlId(url) {
  return crypto.createHash("sha256").update(url).digest("hex");
}

function count(value) {
  const number = Number(value);
  return Number.isSafeInteger(number) && number >= 0 ? number : 0;
}

function normalizeStats(stats = {}) {
  return {
    malicious: count(stats.malicious),
    suspicious: count(stats.suspicious),
    harmless: count(stats.harmless),
    undetected: count(stats.undetected),
    timeout: count(stats.timeout),
  };
}

function analysisDate(value) {
  const timestamp = count(value);
  return timestamp ? new Date(timestamp * 1000).toISOString() : "unknown";
}

function output(name, value) {
  const outputPath = process.env.GITHUB_OUTPUT;
  if (!outputPath) {
    return;
  }

  fs.appendFileSync(outputPath, `${name}=${String(value)}\n`);
}

async function vtFetch(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      accept: "application/json",
      "x-apikey": apiKey,
      ...options.headers,
    },
  });

  const text = await response.text();
  let body;
  try {
    body = text ? JSON.parse(text) : {};
  } catch {
    body = { raw: text };
  }

  if (!response.ok) {
    const message = body?.error?.message || body?.raw || response.statusText;
    throw new Error(`VirusTotal API ${response.status}: ${message}`);
  }

  return body;
}

async function requestAnalysis(id) {
  const body = await vtFetch(`/urls/${id}/analyse`, { method: "POST" });
  const analysisId = body?.data?.id;
  if (!analysisId) {
    throw new Error("VirusTotal did not return an analysis id.");
  }
  return analysisId;
}

async function waitForAnalysis(analysisId) {
  const deadline = Date.now() + waitSeconds * 1000;

  while (Date.now() < deadline) {
    const body = await vtFetch(`/analyses/${analysisId}`);
    const status = body?.data?.attributes?.status;

    if (status === "completed") {
      return body;
    }

    await sleep(5000);
  }

  throw new Error(`VirusTotal analysis did not complete within ${waitSeconds} seconds.`);
}

async function getReport(id) {
  return vtFetch(`/urls/${id}`);
}

function collectFlagged(results = {}) {
  return Object.values(results)
    .filter(({ category }) => category === "malicious" || category === "suspicious")
    .map(({ engine_name: engineName, category, result }) => ({
      engineName,
      category,
      result,
    }))
    .sort((a, b) => a.engineName.localeCompare(b.engineName));
}

function writeSummary({ stats, reportUrl, lastAnalysisDate }) {
  const summaryPath = process.env.GITHUB_STEP_SUMMARY;
  if (!summaryPath) {
    return;
  }

  const date = analysisDate(lastAnalysisDate);

  fs.appendFileSync(
    summaryPath,
    [
      "## VirusTotal URL Check",
      "",
      `URL: ${targetUrl}`,
      `Report: ${reportUrl}`,
      `Last analysis: ${date}`,
      "",
      `Stats: malicious=${stats.malicious || 0}, suspicious=${stats.suspicious || 0}, harmless=${stats.harmless || 0}, undetected=${stats.undetected || 0}`,
      "",
      "Flagged engine details are printed in the action log.",
      "",
    ].join("\n"),
  );
}

const id = urlId(targetUrl);
const reportId = reportUrlId(targetUrl);

console.log(`Checking ${targetUrl}`);
console.log(`VirusTotal URL id: ${id}`);

if (reanalyze) {
  console.log("Requesting VirusTotal re-analysis.");
  const analysisId = await requestAnalysis(id);
  console.log(`Analysis id: ${analysisId}`);
  await waitForAnalysis(analysisId);
}

const report = await getReport(id);
const attributes = report?.data?.attributes || {};
const stats = normalizeStats(attributes.last_analysis_stats);
const flagged = collectFlagged(attributes.last_analysis_results);
const vtUrlId = reportId;
const reportUrl = `https://www.virustotal.com/gui/url/${vtUrlId}`;

output("url-id", vtUrlId);
output("report-url", reportUrl);
output("malicious", stats.malicious || 0);
output("suspicious", stats.suspicious || 0);
output("harmless", stats.harmless || 0);
output("undetected", stats.undetected || 0);

writeSummary({
  stats,
  reportUrl,
  lastAnalysisDate: attributes.last_analysis_date,
});

console.log(`Report: ${reportUrl}`);
console.log(`Stats: ${JSON.stringify(stats)}`);

if (flagged.length > 0) {
  console.log("Flagged engines:");
  for (const item of flagged) {
    console.log(`- ${item.engineName}: ${item.category} (${item.result || "no result"})`);
  }
}

const malicious = stats.malicious || 0;
const suspicious = stats.suspicious || 0;
if (failOnDetection && (malicious > maxMalicious || suspicious > maxSuspicious)) {
  throw new Error(
    `VirusTotal detections exceed limits: malicious=${malicious}/${maxMalicious}, suspicious=${suspicious}/${maxSuspicious}.`,
  );
}
