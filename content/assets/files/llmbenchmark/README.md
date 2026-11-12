# mini-llm-benchmark

A from-scratch LLM benchmark in four small files. It asks a local model 30 accounting questions that know their
own answers, marks the replies with a few lines of code, and prints a scoreboard. No database, no second model to
do the marking, no dependencies.

It is a simplified companion to [llm-accounting-benchmark](https://github.com/Haddley/llm-accounting-benchmark),
which uses a judge model, a rubric, SQLite and a Streamlit app.

| File | What it does |
|---|---|
| `questions.py` | Builds the 30 questions (six topics, five levels each) and works out each right answer. Also reads a reply and checks it. |
| `minibench.py` | Sends the questions to a model through Ollama and saves every answer to `results/<model>__<style>.jsonl`. |
| `report.py` | Marks the saved answers again and prints the scoreboard. `--json` writes everything to one file. |
| `test_questions.py` | Checks the sums and the checker against answers worked out by hand. |
| `run_all.sh` | The runs behind the blog post. |

## Run it

You need Python 3.9 or later and [Ollama](https://ollama.com).

```
ollama pull qwen3.5:2b
python3 -m unittest                                   # the sums and the checker
python3 minibench.py --model qwen3.5:2b --limit 5     # a quick try
python3 minibench.py --model qwen3.5:2b               # all 30 questions
python3 report.py                                     # the scoreboard
python3 minibench.py --model qwen3.5:2b --style direct   # answer only, no working
```

## How a question is marked

Every prompt ends by asking for a final line `ANSWER: <number>`. The checker reads the number on the last such
line and accepts it when it is within one cent of the right answer, compared as whole cents. A reply with no
`ANSWER:` line is marked wrong and counted separately in the report.

The questions come from a fixed seed (`SEED` in `questions.py`), so everyone who runs it asks the same 30.

## Settings

Temperature 0, a fixed model seed, the model's own thinking mode switched off, a 4,096-token context and answers
cut off at 700 tokens. All of these are in `minibench.py`.
