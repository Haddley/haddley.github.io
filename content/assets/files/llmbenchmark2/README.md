# llmbenchmark2 experiment

Runs the 282 MMLU professional accounting questions (`orig.json`, from `cais/mmlu`, original answer key) through a model.

    python3 run.py qwen3:14b reason     # brief reasoning, then "ANSWER: X"
    python3 run.py qwen3:14b direct     # one letter only
    python3 run.py deepseek:deepseek-flash reason   # needs DEEPSEEK_API_KEY

`NUM_PREDICT=4000 python3 run.py ...` sets the answer cap for the reasoning pass (default 1500).
Answers go to `runs/<model>__<mode>.jsonl`. `python3 grade.py` scores every file, and `python3 overlap.py` counts how many models get each question right.
