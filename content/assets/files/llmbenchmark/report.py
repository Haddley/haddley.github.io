#!/usr/bin/env python3
"""
report.py - read the results files and print the scoreboard.

    python3 report.py                 # tables in the terminal
    python3 report.py --json out.json # also write every row and the totals into one file

Python 3.9, standard library only.
"""
import argparse
import glob
import json
import os
import statistics

import questions


def load(folder):
    runs = {}
    for path in sorted(glob.glob(os.path.join(folder, "*.jsonl"))):
        rows = [json.loads(line) for line in open(path) if line.strip()]
        machines = json.load(open(os.path.join(folder, "machines.json"))) if os.path.exists(os.path.join(folder, "machines.json")) else {}
        for r in rows:
            if r["model"] in machines:
                r["machine"] = machines[r["model"]]   # which computer this model ran on, from results/machines.json
            # Mark again from the saved number, so a fix to the checker applies without asking any model again.
            r["correct"] = questions.is_correct(r.get("parsed"), r["expected"])
        if rows:
            runs[(rows[0]["model"], rows[0]["style"])] = rows
    return runs


def percent(rows):
    return 100.0 * sum(1 for r in rows if r["correct"]) / len(rows) if rows else 0.0


def summarise(rows):
    speeds = [r["tokens_per_second"] for r in rows if r.get("tokens_per_second")]
    seconds = [r["seconds"] for r in rows if r.get("seconds")]
    return {
        "questions": len(rows),
        "correct": sum(1 for r in rows if r["correct"]),
        "percent": round(percent(rows), 1),
        "no_answer_line": sum(1 for r in rows if not r["format_ok"]),
        "median_tokens_per_second": round(statistics.median(speeds), 1) if speeds else None,
        "mean_seconds": round(statistics.mean(seconds), 1) if seconds else None,
        "mean_tokens": round(statistics.mean(r.get("completion_tokens", 0) for r in rows)),
        "by_domain": {d: round(percent([r for r in rows if r["domain"] == d]), 1) for d in sorted({r["domain"] for r in rows})},
        "by_level": {str(l): round(percent([r for r in rows if r["level"] == l]), 1) for l in sorted({r["level"] for r in rows})},
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--results", default="results")
    parser.add_argument("--json", help="write everything to this file")
    args = parser.parse_args()
    runs = load(args.results)
    if not runs:
        raise SystemExit("no results yet in " + args.results)
    summary = {"{}|{}".format(*key): summarise(rows) for key, rows in runs.items()}
    order = sorted(runs, key=lambda k: -summary["{}|{}".format(*k)]["percent"])
    print("{:<16} {:<8} {:>9} {:>7} {:>11} {:>9} {:>8}".format("model", "prompt", "right", "%", "no ANSWER", "tok/s", "sec/q"))
    for key in order:
        s = summary["{}|{}".format(*key)]
        print("{:<16} {:<8} {:>6}/{:<2} {:>6.1f}% {:>11} {:>9} {:>8}".format(
            key[0], key[1], s["correct"], s["questions"], s["percent"], s["no_answer_line"], s["median_tokens_per_second"], s["mean_seconds"]))
    print("\nBy domain (% right):")
    domains = sorted({d for s in summary.values() for d in s["by_domain"]})
    print("{:<26}".format("") + "".join("{:>15}".format(d) for d in domains))
    for key in order:
        s = summary["{}|{}".format(*key)]
        print("{:<26}".format("{} ({})".format(*key)) + "".join("{:>15}".format(s["by_domain"].get(d, "")) for d in domains))
    print("\nBy level (% right; level 1 is one step, level 5 is five):")
    for key in order:
        s = summary["{}|{}".format(*key)]
        print("{:<26}".format("{} ({})".format(*key)) + "".join("{:>9}".format(s["by_level"].get(str(l), "")) for l in range(1, 6)))
    if args.json:
        rows = [r for run in runs.values() for r in run]
        json.dump({"summary": summary, "rows": rows}, open(args.json, "w"), indent=1)
        print("\nwritten", args.json)


if __name__ == "__main__":
    main()
