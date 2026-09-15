#!/usr/bin/env bash
# Demo A · stesso prompt, modelli e effort diversi, con tempo e costo.
# Uso:  ./run.sh                     (i tre giri di default)
#       ./run.sh sonnet low          (un giro solo: modello effort)
# Ogni giro lavora su una copia pulita in /tmp, così il bug è sempre presente.
set -euo pipefail
cd "$(dirname "$0")"
PROMPT="$(cat prompt.txt)"
OUT="risultati-$(date +%Y%m%d-%H%M).md"

run_one() {
  local model="$1" effort="$2"
  local work; work="$(mktemp -d /tmp/demo-a.XXXX)"
  cp fatture.js fatture.test.js "$work/"
  echo "▶ $model · effort $effort" >&2
  local t0 t1 json
  t0=$(date +%s)
  json="$(cd "$work" && claude -p --model "$model" --effort "$effort" --output-format json \
          --allowedTools "Read,Edit,Bash(node --test*)" "$PROMPT" 2>/dev/null)"
  t1=$(date +%s)
  local cost turns fixed
  cost=$(printf '%s' "$json" | jq -r '.total_cost_usd // "n/d"')
  turns=$(printf '%s' "$json" | jq -r '.num_turns // "n/d"')
  if (cd "$work" && node --test >/dev/null 2>&1); then fixed="✅ test verdi"; else fixed="❌ test rossi"; fi
  printf '| %s | %s | %ss | $%s | %s | %s |\n' "$model" "$effort" "$((t1 - t0))" "$cost" "$turns" "$fixed" | tee -a "$OUT"
  printf '\n<details><summary>%s · %s · risposta</summary>\n\n%s\n\n</details>\n' "$model" "$effort" \
    "$(printf '%s' "$json" | jq -r '.result // empty')" >> "$OUT"
  rm -rf "$work"
}

{
  echo "# Demo A · $(date '+%d/%m/%Y %H:%M')"
  echo
  echo "Prompt: \`$(head -1 prompt.txt)…\`"
  echo
  echo "| modello | effort | tempo | costo | turni | esito |"
  echo "|---|---|---|---|---|---|"
} > "$OUT"

if [ $# -ge 2 ]; then
  run_one "$1" "$2"
else
  run_one sonnet low        # fascia media, effort basso
  run_one opus   high       # fascia alta, effort alto
  run_one opus   low        # fascia alta, effort basso: spesso il punto migliore
fi
echo "Risultati in $OUT" >&2
