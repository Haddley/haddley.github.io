#!/bin/sh
# The runs behind the post. Five models with the full "working" prompt, then two "answer only" runs.
cd "$(dirname "$0")"
for model in qwen3.5:2b llama3.1:8b gemma4:12b qwen2.5:14b gemma4:26b; do
  echo "=== $model (working)"; python3 minibench.py --model "$model" --style working
done
for model in qwen3.5:2b gemma4:12b; do
  echo "=== $model (direct)"; python3 minibench.py --model "$model" --style direct
done
echo "=== all done"
