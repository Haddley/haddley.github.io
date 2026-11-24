#!/bin/bash
cd "$(dirname "$0")"
L=/private/tmp/claude-501/-Users-neilhaddley-Documents-GitHub-haddley-github-io/4f3307ec-100d-43ac-9040-7d9e068d2004/scratchpad/wiki.log
for m in qwen3:14b qwen3.8:27b-mlx; do NUM_PREDICT=12000 python3 run_wiki.py $m none >> $L 2>&1; done
echo "$(date +%T) none arms done, waiting for the build" >> $L
while [ $(wc -l < agent_runs3/deepseek-flash__gate.jsonl) -lt 141 ] || pgrep -f agent3.py >/dev/null; do sleep 120; done
echo "$(date +%T) build done" >> $L
for m in deepseek:deepseek-flash; do for a in none wiki wikiall; do python3 run_wiki.py $m $a >> $L 2>&1; done; done
for m in qwen3:14b qwen3.8:27b-mlx; do for a in wiki wikiall control; do NUM_PREDICT=12000 python3 run_wiki.py $m $a >> $L 2>&1; done; done
echo "$(date +%T) WIKI ALL DONE" >> $L
