#!/bin/bash
for m in qwen3.8:27b-mlx qwen2.5:14b; do python3 clarify_run.py $m incomplete_ask_firm; python3 clarify_run.py $m complete_ask_firm; done
echo FIRM DONE
