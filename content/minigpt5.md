---
title: "MiniGPT"
part: 6
description: "Learning from a teacher: training a small MiniGPT to copy a bigger model's whole wheel of chances, why the teacher must share the student's pieces, and the finding that a small teacher who knows the stories beats a big one who does not, with a follow-along notebook"
date: "2026-10-05"
categories: ["AI"]
image: "/assets/images/minigpt5/posts-meta.svg"
tags: "knowledge-distillation, llama, logit-distillation, mlx, machine-learning"
hidden: false
slug: "minigpt5"
---

Every MiniGPT so far has learned the same way, the guessing game from [Part 2](/posts/minigpt-grown/): guess the next token, check the real one, and nudge the dials. Meta's small Llama 3.2 models learned from something more. The [Llama 3.2 announcement](https://ai.meta.com/blog/llama-3-2-connect-2024-vision-edge-mobile-devices/) says that "logits from the Llama 3.1 8B and 70B models were used as targets" during pre-training: the small models learned by copying what big models thought, not just from the text. This post tries the same idea on a Mac, with a small MiniGPT as the student and five different teachers.

The code is in [`part6-distillation/`](https://github.com/Haddley/minigpt-series/tree/main/part6-distillation), with a follow-along notebook for a Mac, [`minigpt_follow_along_6.ipynb`](https://github.com/Haddley/minigpt-series/blob/main/part6-distillation/minigpt_follow_along_6.ipynb).

## The big picture, in plain English

### Learning from the answer, or from a teacher

:::brain-power
After "Tim gave his dog a", the real next word in a story is *bone*. A guessing game that only knows the answer says: *bone* was right, everything else was wrong. What does a good teacher know that this answer leaves out?
:::

In the guessing game, the only thing the machine learns from at each step is the one right answer. *Bone* gets all the credit, and *ball*, *treat*, *hug*, and *banana* are all equally wrong. But they are not equally wrong: *ball*, *treat*, and *hug* would all make sense, and *banana* would be strange.

A trained model knows that. Before it writes, it has a whole [wheel of chances](/posts/minigpt/#so-how-does-it-choose-what-to-write-it-spins-a-wheel), a slice for every token. Here is GPT-2's real wheel after "Tim gave his dog a": *hug* 6.2%, *big* 2.1%, *good* 2.0%, *treat* 1.0%, and thousands of thinner slices; its 20 biggest slices hold only 28% of the wheel. **Distillation** trains the student to copy that whole wheel, not just to pick the right answer. Each guess teaches it much more: which near misses were reasonable, and which were absurd.

GPT-2 learned from text on the web, and it gives *bone* just 0.03%: 501st place. Keep that in mind; it turns out to matter.

### The two parts of the score

The student is scored on two things at once, and both are surprise scores from [Part 2](/posts/minigpt-grown/#keeping-score-the-surprise-score):

- **How surprised it is by the real next token**, as before.
- **How different its wheel is from the teacher's wheel.** The measure is called *KL divergence*: 0 when the two wheels are identical, and larger the more they differ.

I weight the two equally. Before comparing the wheels, I soften both with a [temperature](/posts/minigpt/#step-5-spin-the-wheel) of 2, the same setting as in Part 1, so that the thin slices, the near misses, are big enough to learn from.

### The teacher must use the same pieces

There is a catch, and it rules out every current big model. Comparing two wheels slice by slice only makes sense if slice 1,000 means the same token on both wheels. So the teacher must use exactly the student's tokeniser, its supply of pieces from [Part 3](/posts/minigpt2/).

My student uses GPT-2's 50,257 pieces. Qwen3 uses its own, about 151,000; Llama 3 uses another, 128,000; Gemma, Mistral, and Phi each have their own. None of their wheels line up with my student's. So the teachers here all use GPT-2's pieces. That is a bigger family than GPT-2 alone: GPT-Neo, and the models released with the TinyStories paper, use them too.

:::watch-it
The teacher also runs on every training step, in the same 64 GB as the student. Both wheels, for 16 snippets of 256 tokens with 50,257 slices each, take about 0.8 GB apiece. The plain student peaked at 5.4 GB; with GPT-2 as a teacher, 11.1 GB; with GPT-2 XL, 16.8 GB. Distillation means running two machines to train one.
:::

### Five teachers

The student is the 30-million-number MiniGPT from [Part 4](/posts/minigpt3/), on GPT-2's pieces. I trained it five times, 3,000 steps each, on the same stories:

| Teacher | Size | Teacher's own bits per byte | Student's bits per byte | Minutes |
|---|---|---|---|---|
| none | | | 0.7555 | 12.8 |
| GPT-2 | 124 million | 0.965 | 0.7469 | 25.1 |
| GPT-2 XL | 1.5 billion | 0.799 | 0.7382 | 113.9 |
| TinyStories-33M | 33 million | **0.467** | 0.7204 | 23.5 |
| My MiniGPT-512 | 51 million | 0.644 | **0.6936** | 20.1 |

GPT-2 and GPT-2 XL learned from text on the web. TinyStories-33M is the largest model released with the TinyStories paper, trained on all of the stories. My MiniGPT-512 is a wider MiniGPT that I trained on the same practice stories as the student, for 5,000 steps.

![](assets/images/minigpt5/distill-curves.png)
*Bits per byte while training. The two web-text teachers stay near the no-teacher line; the two teachers who know the stories pull the student well below it*

### What the teachers taught

- **A bigger web-text teacher barely helped.** GPT-2 XL is twelve times the size of GPT-2, and moved the student from 0.7469 to 0.7382, for four and a half times the training time. The third column says why: at 1.5 billion numbers, GPT-2 XL is still *worse* at these stories (0.799) than the 30-million-number student trained on them (0.756). It had never read anything like them.
- **A teacher who knew the stories helped a lot.** TinyStories-33M is 45 times smaller than GPT-2 XL, but it had read every story, and it scores 0.467. It pulled the student to 0.7204, past both GPT-2s, in 23 minutes.
- **The best teacher was the one most like the student.** My MiniGPT-512 is a *worse* model on paper, 0.644 against 0.467, but it gave the best student by far, 0.6936. It is built the same way as the student, so its wheels are natural ones for the student to copy, and it trained only on the practice stories, so the test stories were new to both of them.

That student also learned faster: it passed the no-teacher student's *final* score at about step 1,700, rather than step 3,000, and finished with an 8% lower surprise score. Not the "10 times faster" sometimes quoted for giant teachers, but real.

:::pencil Pick a teacher
You have a small student that writes recipes. You can distil from one of three teachers, all using the student's pieces. Which would you pick?

1. A model 50 times bigger than the student, trained on the whole web.
2. A model twice the student's size, trained on 10 million recipes.
3. A model the student's size, trained on recipes and with a different tokeniser.

:::answer
Teacher 2. Teacher 3 is out: with a different tokeniser, its wheels do not line up with the student's. Teacher 1 might know some cooking, but, like GPT-2 XL with the stories, being big and general did not make it good at the student's actual job. Teacher 2 knows recipes, and is close to the student in size and kind, just like the MiniGPT-512 that won here.
:::
:::

### What they write

![](assets/images/minigpt5/generation.png)
*The no-teacher student and the MiniGPT-512 student, from the same opening*

The no-teacher student loses the thread: "he wanted to take his melon home from his eyes", a second character also called Tim, and a melon that talks. The taught student holds a scene: Tim, a friend called Sam, a lost cake, a search, and an ending, finishing with "the moral of the story is…", the closing line many TinyStories use, which the no-teacher student never picked up.

:::fireside-chat Tonight: GPT-2 XL and TinyStories-33M, on who is the better teacher
**GPT-2 XL:** One and a half billion numbers. I have read half the web. Whatever the student needs to know, I know it.

**TinyStories-33M:** I have 33 million numbers, and I have read every one of these stories.

**GPT-2 XL:** Then I outnumber you forty-five to one.

**TinyStories-33M:** And you score 0.799 on the stories. I score 0.467. The student itself, after 13 minutes on its own, scores 0.756: it already knows these stories better than you do.

**GPT-2 XL:** I still moved it, a little.

**TinyStories-33M:** By 0.017 bits per byte, for nearly two hours of the Mac's time and 17 GB of its memory. I moved it twice as far, in 23 minutes.

**GPT-2 XL:** And yet neither of us won.

**TinyStories-33M:** No. The MiniGPT-512 did: a worse model than me, but built like the student and trained on the same stories. It turns out a teacher's job is not to be clever. It is to be useful to this particular student.
:::

:::bullet-points Part 6, in short
- Distillation trains a student to copy a teacher's whole wheel of chances, not just the right answer.
- The score adds the usual surprise to a measure of how different the two wheels are: KL divergence.
- The teacher must use exactly the student's pieces, which rules out every current big model here.
- Running a teacher every step costs memory: 5.4 GB grew to 11 to 17 GB.
- A teacher who knew the stories beat one 45 times its size that did not.
- The best teacher was built like the student and trained on the same stories.
:::

:::no-dumb-questions
**Q: Why not just train the student longer, instead of using a teacher?**

A: You can, but the teacher gives more per step. Each guess carries the teacher's opinion of every possible token, not one right answer. That is why the taught student reached the untaught one's final score in about 1,700 steps instead of 3,000.

**Q: Could the student end up better than its teacher?**

A: On its own data, it can, because it also learns from the real answers. Here, the student taught by GPT-2 XL beat its teacher easily: 0.738 against 0.799.

**Q: Why soften the wheels with a temperature?**

A: A confident teacher puts almost everything on one slice, which teaches nearly nothing more than the answer itself. Softening, with a temperature of 2, makes the near misses visible, and those are what the student is there to learn. The `T²` in the code puts the size of the score back, so softening does not shrink how much the student learns.

**Q: So how did Meta use Llama 3.1 to teach Llama 3.2, if every model has its own pieces?**

A: Because Llama 3.1 and 3.2 share the same tokeniser. That is the real lesson: distillation works within a family of models that cut text the same way.
:::

:::pencil Who does what?
Match each everyday description on the left with its proper name on the right.

| Everyday description | Proper name |
|---|---|
| 1. training a student to copy a teacher's wheel | A. *KL divergence* |
| 2. how different two wheels are | B. *one-hot* target |
| 3. learning only from the one right answer | C. *distillation* |
| 4. softening a wheel so the near misses show | D. the *temperature* |
| 5. the raw scores before they become a wheel | E. *logits* |

:::answer
1 is C, 2 is A, 3 is B, 4 is D, and 5 is E.
:::
:::

### The jargon decoder

| What I called it | What the experts call it |
|---|---|
| copying a teacher's whole wheel | *logit distillation*, or *knowledge distillation* |
| learning only from the right answer | training on a *one-hot* target, or *hard labels* |
| the teacher's wheel | *soft targets* |
| how different two wheels are | the *KL divergence* (Kullback–Leibler divergence) |
| the raw scores against the answer cards | the *logits* |
| the softening setting | the distillation *temperature* |

## The code, in the order it runs

The code is in [`part6-distillation/`](https://github.com/Haddley/minigpt-series/tree/main/part6-distillation). It reuses Part 4's MLX machine and Part 3's stories, with GPT-2's pieces.

### The teachers: `train_distill.py`'s `--teacher`

`--teacher none` trains the student alone. `--teacher gpt2` and `--teacher gpt2-xl` load a frozen GPT-2 through `mlx-lm`. `--teacher torch:roneneldan/TinyStories-33M` loads TinyStories-33M in PyTorch, because `mlx-lm` cannot load its design, and hands its wheels across to the MLX student. And `--teacher runs/teacher.safetensors` loads my MiniGPT-512, which `train_teacher.py` trains first:

```bash
python train_teacher.py --dim 512 --layers 8 --iters 5000
```

### The score: in `train_distill.py`

Both machines see the same batch; the teacher's wheel is fixed, and only the student's dials move:

```python
t_logp = nn.log_softmax(t_logits / args.temp, axis=-1)      # the teacher's softened wheel
s_logp = nn.log_softmax(s / args.temp, axis=-1)             # the student's softened wheel
kl = (mx.exp(t_logp) * (t_logp - s_logp)).sum(-1).mean()    # how different they are
return args.alpha * ce + (1 - args.alpha) * (args.temp ** 2) * kl
```

`ce` is the usual surprise at the real next token. With `--alpha 0.5`, the two parts count equally, and `--alpha 1.0` switches the teacher off altogether.

### Scoring the teachers: `eval_teacher.py`

`eval_teacher.py --teacher gpt2-xl` measures a teacher's own bits per byte on the test stories: the "teacher's own" column in the table.

![](assets/images/minigpt5/distill-runs.png)
*The five runs, with each teacher's own score*

## Try it yourself

- **The follow-along notebook:** [`part6-distillation/minigpt_follow_along_6.ipynb`](https://github.com/Haddley/minigpt-series/blob/main/part6-distillation/minigpt_follow_along_6.ipynb), for Jupyter on a Mac with Apple Silicon. It shows a teacher's wheel next to the one-hot answer, works the KL divergence out by hand, and trains a student with GPT-2 as its teacher.
- **On the command line,** after Part 3's `prepare_data.py` and `tokenizers_setup.py`:

```bash
cd minigpt-series/part6-distillation
python train_distill.py --tag baseline --teacher none    --alpha 1.0
python train_distill.py --tag gpt2     --teacher gpt2    --alpha 0.5
python train_distill.py --tag gpt2xl   --teacher gpt2-xl --alpha 0.5
python train_distill.py --tag ts33m    --teacher torch:roneneldan/TinyStories-33M --alpha 0.5
python train_teacher.py --dim 512 --layers 8 --iters 5000
python train_distill.py --tag big      --teacher runs/teacher.safetensors --alpha 0.5
python eval_teacher.py  --teacher gpt2-xl
python figures.py
```

MLX needs Apple Silicon. The GPT-2 teachers download from Hugging Face the first time.

[Part 7](/posts/minigpt6/) goes back to the modern machine and gives attention a sliding window, so that it can read a much longer row in the same memory.

## References

- [Llama 3.2: revolutionizing edge AI and vision — Meta AI, 2024](https://ai.meta.com/blog/llama-3-2-connect-2024-vision-edge-mobile-devices/)
- [The Llama 3 Herd of Models — Meta AI, 2024](https://arxiv.org/abs/2407.21783)
- [Distilling the Knowledge in a Neural Network — Hinton, Vinyals & Dean, 2015](https://arxiv.org/abs/1503.02531)
- [TinyStories: How Small Can Language Models Be and Still Speak Coherent English? — Eldan & Li, 2023](https://arxiv.org/abs/2305.07759)
- [mlx-lm](https://github.com/ml-explore/mlx-lm)
