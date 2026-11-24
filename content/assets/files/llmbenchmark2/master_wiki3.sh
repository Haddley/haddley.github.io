#!/bin/bash
cd "$(dirname "$0")"
L=/private/tmp/claude-501/-Users-neilhaddley-Documents-GitHub-haddley-github-io/4f3307ec-100d-43ac-9040-7d9e068d2004/scratchpad/wiki.log
while ! grep -q "WIKI ALL DONE" $L; do sleep 120; done
for a in none wiki wikiall control; do NUM_PREDICT=12000 python3 run_wiki.py qwen2.5:14b $a >> $L 2>&1; done
echo "$(date +%T) QWEN2.5 14B WIKI DONE" >> $L
