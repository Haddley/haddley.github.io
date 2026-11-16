PROMPT="""You are marking a student's answer to a multiple-choice accounting question. You are given the correct answer.

Question:
{question}

Options:
{options}

Correct answer: {key}

Student's reply:
\"\"\"
{reply}
\"\"\"

Mark the reply. Give three scores from 1 to 10:
- accuracy: is the reasoning and the figures right, and does it reach the correct answer?
- completeness: does it work through what is needed to justify its answer?
- clarity: is it easy to follow?
And a verdict, one of: SOUND (right thinking), SLIP (a small error), FLAWED (wrong thinking or wrong answer), UNSUPPORTED (a claim with no reasoning behind it).
Reply with JSON only: {{"accuracy": n, "completeness": n, "clarity": n, "verdict": "...", "reason": "one sentence"}}"""
