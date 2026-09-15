#!/usr/bin/env bash
# Demo A · variante multi-vendor: stessa domanda a più modelli in parallelo con ai-consultants.
# Richiede la skill ai-consultants installata (~/.claude/skills/ai-consultants) e almeno due CLI (codex, agy, …).
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
q="$(mktemp)"; chmod 600 "$q"; trap 'rm -f "$q"' EXIT
cat prompt.txt > "$q"
cd "${AI_CONSULTANTS_DIR:-$HOME/.claude/skills/ai-consultants}"
INVOKING_AGENT=claude ./scripts/consult_all.sh --preset balanced \
  --context-root "$here" --query-file "$q" "$here/fatture.js@PRIMARY" "$here/fatture.test.js@CONTEXT" | tail -1 | while read -r dir; do
    echo "Report: $dir/report.md"
    [ -f "$dir/report.md" ] && sed -n 1,80p "$dir/report.md"
  done
