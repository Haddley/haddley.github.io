#!/bin/bash
cd "$(dirname "$0")"
L=/private/tmp/claude-501/-Users-neilhaddley-Documents-GitHub-haddley-github-io/4f3307ec-100d-43ac-9040-7d9e068d2004/scratchpad/wiki.log
NUM_PREDICT=12000 python3 run_wiki.py qwen3.8:27b-mlx none >> $L 2>&1
echo "$(date +%T) qwen3.8 none done, waiting for the build" >> $L
while [ $(wc -l < agent_runs3/deepseek-flash__gate.jsonl) -lt 141 ] || pgrep -f agent3.py >/dev/null; do sleep 120; done
echo "$(date +%T) build done" >> $L
for a in none wiki wikiall; do python3 run_wiki.py deepseek:deepseek-flash $a >> $L 2>&1; done
for a in wiki wikiall control; do NUM_PREDICT=12000 python3 run_wiki.py qwen3.8:27b-mlx $a >> $L 2>&1; done
echo "$(date +%T) WIKI ALL DONE" >> $L
