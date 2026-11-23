#!/bin/bash
cd "$(dirname "$0")"
for m in llama3.2:3b llama3.1:8b gemma3:12b qwen3.8:27b-mlx gemma3:27b qwen2.5:72b llama3.3:70b; do
  python3 rerun_cut.py $m 4000 >> /private/tmp/claude-501/-Users-neilhaddley-Documents-GitHub-haddley-github-io/4f3307ec-100d-43ac-9040-7d9e068d2004/scratchpad/rerun_cut.log 2>&1
done
echo RERUN DONE >> /private/tmp/claude-501/-Users-neilhaddley-Documents-GitHub-haddley-github-io/4f3307ec-100d-43ac-9040-7d9e068d2004/scratchpad/rerun_cut.log
