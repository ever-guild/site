# Agent Model Routing

This repository routes mechanical QA and commit work to cheaper models where the
agent supports it.

## Claude Code

Claude Code supports project subagents in `.claude/agents/`. The project defines:

- `qa-runner`: `model: haiku`, `effort: low`
- `conventional-committer`: `model: haiku`, `effort: low`

Use `claude --agent conventional-committer` for commit work or select the
project agent from Claude Code. Project subagents are the most precise option
here because the cheaper model applies only to the mechanical task.

## Codex CLI

Codex CLI supports project-scoped custom agents in `.codex/agents/*.toml`. The
project defines:

- `conventional_committer`: `model = "gpt-5.4-mini"`,
  `model_reasoning_effort = "low"`

It also sets conservative global subagent limits in `.codex/config.toml`.

In interactive Codex sessions, ask Codex to spawn the project custom agent
`conventional_committer` for commit work rather than doing the commit in the
main thread. The subagent runs lint, acceptance, Lighthouse, and then commits
only if the gate passes. Before running the gate, it fetches `origin/main` and
rebases the current work branch on `origin/main` so the branch remains
fast-forwardable. Clear conflicts should be resolved by the subagent; ambiguous
conflicts must be reported instead of committed.

## Verification

Non-model checks:

```bash
python3 - <<'PY'
import tomllib
for path in ['.codex/config.toml', '.codex/agents/conventional-committer.toml']:
    with open(path, 'rb') as f:
        tomllib.load(f)
    print(f'{path}: ok')
PY

claude agents --setting-sources project
```

Model-backed dry-runs:

```bash
claude --agent conventional-committer -p "Verification dry-run only: report your configured model and normal commit flow. Do not run tests, stage files, edit files, or commit."
```

For Codex, use the interactive session's subagent mechanism and ask for a
dry-run of `conventional_committer`. The current Codex CLI does not expose a
stable `codex agents list` command comparable to `claude agents`; the
non-model checks above verify the project files and model id.
