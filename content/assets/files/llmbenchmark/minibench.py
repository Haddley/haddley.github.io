#!/usr/bin/env python3
"""
minibench.py - ask a local model 30 accounting questions and mark the answers.

    python3 minibench.py --model gemma4:12b
    python3 minibench.py --model qwen3.5:2b --style direct --limit 5

Each run writes one results file, results/<model>__<style>.jsonl, with a line per question: what was asked, what
the model said, the number it gave, whether that is right, and how long it took. No database and no second model
to mark the answers: the questions know their own answers (see questions.py).

Python 3.9, standard library only. Needs Ollama running (https://ollama.com).
"""
import argparse
import json
import os
import sys
import time
import urllib.request

import questions


def ask(host, model, prompt, num_predict, timeout):
    """One question to Ollama. Temperature 0 and a fixed seed, with the model's own reasoning mode off."""
    body = json.dumps({
        "model": model,
        "stream": False,
        "think": False,
        "messages": [{"role": "user", "content": prompt}],
        "options": {"temperature": 0, "seed": 1, "num_predict": num_predict, "num_ctx": 4096},
    }).encode()
    request = urllib.request.Request(host.rstrip("/") + "/api/chat", data=body, headers={"Content-Type": "application/json"})
    started = time.time()
    with urllib.request.urlopen(request, timeout=timeout) as response:
        reply = json.load(response)
    reply["wall_seconds"] = time.time() - started
    return reply


def run(args):
    os.makedirs(args.out, exist_ok=True)
    path = os.path.join(args.out, "{}__{}.jsonl".format(args.model.replace(":", "_").replace("/", "_"), args.style))
    todo = questions.build(args.seed)[: args.limit] if args.limit else questions.build(args.seed)
    right = 0
    with open(path, "w") as out:
        for n, question in enumerate(todo, 1):
            row = {"model": args.model, "style": args.style, "id": question.id, "domain": question.domain,
                   "level": question.level, "expected": question.answer}
            try:
                reply = ask(args.host, args.model, questions.make_prompt(question, args.style), args.max_tokens, args.timeout)
                text = reply.get("message", {}).get("content", "")
                parsed = questions.parse_answer(text)
                tokens = reply.get("eval_count", 0)
                eval_seconds = reply.get("eval_duration", 0) / 1e9
                row.update({
                    "text": text, "parsed": parsed, "correct": questions.is_correct(parsed, question.answer),
                    "format_ok": parsed is not None,
                    "prompt_tokens": reply.get("prompt_eval_count", 0), "completion_tokens": tokens,
                    # seconds spent answering, not counting the one-off time to load the model into memory
                    "seconds": round(reply["wall_seconds"] - reply.get("load_duration", 0) / 1e9, 2),
                    "tokens_per_second": round(tokens / eval_seconds, 1) if eval_seconds else None,
                })
            except Exception as error:  # a model that fails to answer is a wrong answer, not a crash
                row.update({"text": "", "parsed": None, "correct": False, "format_ok": False, "error": str(error)[:200]})
            right += 1 if row["correct"] else 0
            out.write(json.dumps(row) + "\n")
            out.flush()
            print("{:>2}/{} {:<18} {} expected {:>10.2f}  got {:>10}  {:>6.1f}s".format(
                n, len(todo), question.id, "RIGHT" if row["correct"] else "wrong", question.answer,
                "-" if row["parsed"] is None else "{:.2f}".format(row["parsed"]), row.get("seconds", 0) or 0), flush=True)
    print("\n{}: {}/{} right ({:.0f}%)  ->  {}".format(args.model, right, len(todo), 100 * right / len(todo), path))


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--model", required=True, help="an Ollama model name, for example gemma4:12b")
    parser.add_argument("--host", default="http://127.0.0.1:11434", help="where Ollama is listening")
    parser.add_argument("--style", choices=sorted(questions.STYLES), default="working",
                        help="working: show the steps, then the answer; direct: the answer only")
    parser.add_argument("--out", default="results", help="the folder for the results file")
    parser.add_argument("--limit", type=int, default=0, help="only the first N questions (0 means all 30)")
    parser.add_argument("--seed", type=int, default=questions.SEED, help="the question seed")
    parser.add_argument("--max-tokens", type=int, default=700, help="the longest answer to allow")
    parser.add_argument("--timeout", type=int, default=600, help="seconds to wait for one answer")
    sys.exit(run(parser.parse_args()))
