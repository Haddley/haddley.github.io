#!/bin/bash
# Part 7 local runs, after the Part 6 queue frees the machine
while pgrep -f run_wiki.py >/dev/null || pgrep -f master_wiki3.sh >/dev/null; do sleep 60; done
for m in qwen3.8:27b-mlx qwen2.5:14b; do
  python3 clarify_run.py $m incomplete_forced; python3 clarify_run.py $m complete_ask; python3 clarify_run.py $m incomplete_ask
done
echo CLARIFY LOCAL DONE
