---
title: "Scikit-Learn"
part: 6
description: "Decision trees: a model that asks one question at a time, grown split by split, and why it needs holding back"
date: "2026-10-12"
categories: ["AI", "Python"]
tags: "machine-learning, scikit-learn, decision-trees, cart, iris, regularization"
hidden: false
slug: "sklearn6"
image: "/assets/images/sklearn6/posts-meta.svg"
---

In [Part 5](/posts/sklearn5/), I drew the widest possible line between two groups. This chapter of the Hands-On Machine Learning book gets to a decision a different way: by asking one yes-or-no question after another, like a flowchart. It is the same iris flowers as before, 150 of them, and the model's job is to say which of three species a flower belongs to, from its petal length and width. The data is real, and the flowers are only a small, clear example.

A tree with two questions was enough: "is the petal length 2.45 cm or less?", then "is the petal width 1.75 cm or less?". It got 144 of the 150 flowers right, including all 50 setosas. A person can read it, which is its main attraction.

## Key Points

**The lesson:** a decision tree is the easiest model to explain, because it is a list of questions that anyone can follow. The computer writes the questions: at each step it tries every question it could ask, keeps the one that separates the groups best, and repeats inside each answer. Its weakness is the other side of the same coin. Left alone, it keeps asking until it has memorised every training flower, and a small change in the data can change even its first question.

**What I learned from it:**
- Left alone, a tree keeps splitting until it has memorised the training data, which is why the tree in [Part 2](/posts/sklearn2/) scored an error of exactly 0 on its own training houses.
- Limiting how deep the tree may grow, or how few flowers may be left at the end of a branch, stops it from memorising. This is called regularization, and it is the same idea as the penalties in [Part 4](/posts/sklearn4/).
- Trees are unstable: training on slightly different data can change every question.

The chapter also covers trees that predict numbers, with each branch ending in an average, and how to draw a tree. I do not go into those here.

:::brain-power
Before reading on, imagine sorting the 150 iris flowers into their three species with yes-or-no questions about their petals. Which single question would you ask first, and why?
:::

## Quick Example

A tree, two questions deep, trained on the petal length and width of all 150 iris flowers:

```python
from sklearn.datasets import load_iris
from sklearn.tree import DecisionTreeClassifier

iris = load_iris(as_frame=True)
X_iris = iris.data[["petal length (cm)", "petal width (cm)"]].values
y_iris = iris.target

tree_clf = DecisionTreeClassifier(max_depth=2, random_state=42)
tree_clf.fit(X_iris, y_iris)
```

When I ran it, the tree learned two questions:

| Question | If yes | If no |
|---|---|---|
| Is the petal length 2.45 cm or less? | Iris setosa: all 50 setosas, and nothing else | Ask the next question |
| Is the petal width 1.75 cm or less? | Iris versicolor: 49 versicolors and 5 virginicas | Iris virginica: 45 virginicas and 1 versicolor |

For a flower with petals 5 cm long and 1.5 cm wide, it answers "no", then "yes", and says Iris versicolor, with a chance of 90.7%: 49 of the 54 training flowers in that leaf.

:::watch-it Trees are unstable
Grow a tree on slightly different data, or with a different random seed, and even its first question can change. Each question is chosen greedily, and the questions below depend on it, so one small change can ripple through the whole tree. Ensembles of many trees, in [Part 7](/posts/sklearn7/), are the usual cure.
:::

## What training means here

Nothing is nudged, and nothing is worked out in one calculation either. Scikit-Learn grows the tree one best question at a time. At the top, it tries every measurement and every possible cut-off, such as 2.45 cm, and picks the question that splits the flowers into groups that are as nearly as possible all one species. Then it does the same inside each group, and so on, until it reaches the depth limit or the groups are pure. It never goes back to change an earlier question.

That greedy, one-decision-at-a-time growth is quick, but it does not guarantee the best possible tree, and it is why a small change in the data can change the very first question. My [MiniGPT](/posts/minigpt-grown/) model works the opposite way: every one of its numbers is adjusted a little on every step, and nothing is ever fixed for good.

:::no-dumb-questions
**Q: Where does the 90.7% come from?**

A: From the end of the branch that the flower lands in, which is called a leaf. 54 training flowers ended up there, 49 of them versicolors, and 49 ÷ 54 is 90.7%. A tree's chances are just shares of the training flowers in each leaf.

**Q: Do trees need the measurements to be rescaled first, like support vector machines (SVMs)?**

A: No. Each question compares one measurement with a cut-off, so changing its units just moves the cut-off, and the questions still split the flowers the same way.

**Q: If a tree can memorise its training data, why limit it?**

A: Memorising is the problem. A tree that carves out a region for every training flower follows the noise, and does worse on new flowers. Limits such as `max_depth` stop it early.
:::

## Running the notebook in Jupyter

The chapter is in the notebook that goes with the book, [06_decision_trees.ipynb](https://github.com/ageron/handson-ml3/blob/main/06_decision_trees.ipynb). I ran everything before the exercise solutions, which took a few seconds on my Mac Studio, and then looked through the results in JupyterLab.

![](assets/images/sklearn6/jupyter-iris-tree.png)
*Graphviz drew the tree: the first question, petal length 2.45 cm or less, sets apart all 50 setosas, and the second asks about petal width*

![](assets/images/sklearn6/jupyter-tree-boundaries.png)
*Each question cuts the petal plane with a straight line parallel to an axis: depth 0, then depth 1, and the dotted lines a deeper tree would add*

![](assets/images/sklearn6/jupyter-tree-probabilities.png)
*For petals 5 cm long and 1.5 cm wide, the tree says 90.7% Iris versicolor and 9.3% Iris virginica*

![](assets/images/sklearn6/jupyter-tree-regularization.png)
*With no restrictions, the tree carves out tiny regions around single points; with min_samples_leaf = 5 it is smoother, and it scored 0.92 on new data instead of 0.898*

![](assets/images/sklearn6/jupyter-regression-tree.png)
*A regression tree predicts the average value in each region, so its predictions are steps, and a deeper tree has more of them*

:::bullet-points Decision trees, in short
- A tree classifies by asking one yes-or-no question after another, and can be read like a flowchart.
- CART grows the tree greedily, one best split at a time, and never goes back.
- Left alone, a tree memorises its training data, so its depth is limited.
- Trees are unstable, which is why they are usually grown in ensembles.
:::

Next, [Scikit-Learn (Part 7)](/posts/sklearn7/) works through chapter 7: ensemble learning and random forests, which combine many trees.

## References

- [Aurélien Géron's chapter 6 notebook](https://github.com/ageron/handson-ml3/blob/main/06_decision_trees.ipynb) - for Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow (third edition)
- [Scikit-Learn (Part 5)](/posts/sklearn5/) - support vector machines
- [scikit-learn](https://scikit-learn.org/) - the library's documentation
