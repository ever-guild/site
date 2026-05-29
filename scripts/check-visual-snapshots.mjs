/* global console, process */
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const snapshotsDir = path.join(
  process.cwd(),
  'tests/acceptance/design-baseline.spec.ts-snapshots',
);

const files = fs
  .readdirSync(snapshotsDir)
  .filter((file) => file.endsWith('.png'))
  .sort();

const byHash = new Map();

for (const file of files) {
  const buffer = fs.readFileSync(path.join(snapshotsDir, file));
  const hash = crypto.createHash('sha256').update(buffer).digest('hex');
  const matches = byHash.get(hash) ?? [];
  matches.push(file);
  byHash.set(hash, matches);
}

const duplicates = [...byHash.values()].filter((matches) => matches.length > 1);

if (duplicates.length > 0) {
  const details = duplicates
    .map((matches) => `- ${matches.join(', ')}`)
    .join('\n');
  throw new Error(`Visual baseline screenshots must be distinct:\n${details}`);
}

console.log(`Checked ${files.length} visual baseline screenshots: all distinct.`);
