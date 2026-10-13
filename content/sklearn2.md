---
title: "Scikit-Learn"
part: 2
description: "An end-to-end machine learning project: predicting California house prices, from raw data to a tested model"
date: "2026-10-12"
categories: ["AI", "Python"]
tags: "machine-learning, scikit-learn, california-housing, pipelines, random-forest, cross-validation"
hidden: false
slug: "sklearn2"
image: "/assets/images/sklearn2/posts-meta.svg"
---

The problem in this project is made up, and I will say so now. The book invents a company that wants to estimate what a typical house costs in each California district, so that an investor can decide where to buy. No one needs these estimates, because the data already holds the real price for every one of its 20,640 districts: it comes from the 1990 census, one row for each district, with facts such as its location, the age of its houses, its rooms, its population, and its incomes, and the median price of a house there.

The book uses it because the answers are known, so that I can check my work. I hide some districts from the model, let it learn the link between facts and price from the rest, and then ask it to guess the prices of the hidden ones and compare its guesses with the truth. That is the same job that real valuation tools do for homes, where the price is not known and the facts are. What matters in this chapter is the sequence of steps for a project of this kind, which carry over to real problems, and not the prices, which are 1990 prices in any case. I explain why below.

The mistake for a district is the gap, in dollars, between the model's guess and the real price. On 4,128 districts that it had never seen, the final model was wrong by about $26,000 on average. Half of the districts were within about $15,500, which is about 9% of the price, and the worst guesses were off by about $300,000. The typical district's price is $180,000.

In [Part 1](/posts/sklearn1/), I ran the small example from the first chapter of the Hands-On Machine Learning book. The second chapter is a whole project, from raw data to a tested model.

## Key Points

**The eight steps of a machine learning project:**
1. **Look at the big picture**: decide what the prediction will be used for, and how its errors will be measured (here, as the typical size of the mistake in dollars)
2. **Get the data**: 20,640 California districts, with 10 columns each
3. **Explore the data**: histograms, a map, and correlations
4. **Prepare the data**: fill in missing values, encode text, scale the numbers, all in one pipeline
5. **Select and train a model**: a linear model (a straight line through the data), a decision tree (a flowchart of yes-or-no questions about a house, such as "is the median income above 5?", that ends in a price), then a random forest (many decision trees, whose prices are averaged)
6. **Fine-tune the model**: try different settings for the model and the data preparation, and keep the ones that score best, either by trying every combination from a short list (grid search) or by trying random combinations (randomized search)
7. **Present the solution**
8. **Launch, monitor, and maintain the system**

**What I learned from it:**
- The test set is set aside first, before looking at the data, so that it cannot influence any decision.
- A pipeline keeps every preparation step together, so the same steps run on the training data, the test data, and any new data.
- A model can look perfect on the houses it learned from and still be poor on new ones. The decision tree got the price of every training house exactly right, an error of $0, because it had memorised them. On houses it had not seen, its typical error was about $67,000.

:::brain-power
In this project, a decision tree scores an error of exactly 0 on its training data. Before reading on, ask yourself: is it the best model here? What would you check before trusting it with new districts?
:::

## Quick Example

A model's score on the data it learned from tells me almost nothing, because it can simply remember that data. To find out how good a model really is, I have to test it on data it has not seen. The code below does that without touching the test set. It cuts the training data into 10 equal parts, trains the model on 9 of them, and scores it on the part that was left out. It repeats this 10 times, so that every part is left out once, and then I have 10 scores to average. This is called 10-fold cross-validation, and each of the 10 parts is a "fold". The model here is a random forest, many decision trees whose answers are averaged. A decision tree is a flowchart of yes-or-no questions about a house, and [Part 6](/posts/sklearn6/) shows how one is grown.

The model is bundled with the steps that prepare the data, such as filling in missing values and scaling the numbers, into a single object called a pipeline. That matters in the ten rounds: each round prepares its data using only the 9 parts it trains on, so nothing from the part left out leaks into the preparation:

```python
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import cross_val_score
from sklearn.pipeline import make_pipeline

forest_reg = make_pipeline(preprocessing,
                           RandomForestRegressor(random_state=42))
forest_rmses = -cross_val_score(forest_reg, housing, housing_labels,
                                scoring="neg_root_mean_squared_error", cv=10)
```

Here is how each model did when I ran the notebook. The score in the table is a number called the RMSE, a kind of typical size of the mistake in US dollars, where lower is better. It is larger than the plain average gap, and I explain why in the questions below:

| Model | How it was measured | RMSE |
|---|---|---|
| Linear regression | on the houses it trained on | 68,648 |
| Decision tree | on the houses it trained on | 0 |
| Decision tree | on houses held back from training (10-fold cross-validation) | 67,153 |
| Random forest | on houses held back from training (10-fold cross-validation) | 47,003 |
| Random forest, grid search | held back from training (3-fold cross-validation), best | 43,954 |
| Random forest, randomized search | held back from training (3-fold cross-validation), best | 41,983 |
| **The final model** | **on the test set** | **41,536** |

**What the two searches did.** A model has settings that I choose before training starts, such as how many questions each tree may consider at once. These are called hyperparameters, and the best values are not known in advance. Two settings are searched here: `n_clusters`, how many geographic groups the pipeline sorts the districts into by latitude and longitude, and `max_features`, how many of the columns each tree may look at when it chooses a question.

- **Grid search** tries every combination from a short list that I write down. The notebook's list is 3 values of `n_clusters` with 3 of `max_features`, plus 2 with 3 more: 15 combinations. Each combination is scored with 3-fold cross-validation, and the best one wins. It is thorough, and the work grows quickly as the lists get longer.
- **Randomized search** is given a range for each setting, such as any whole number from 3 to 49 for `n_clusters`, and picks random combinations from it, here 10. It covers a wider range with the same amount of work, and is usually better when there are many settings or I do not know where the good values are.

Both ended with a better score than the random forest's 47,003 with its default settings: 43,954 from the grid, and 41,983 from the random search.

:::watch-it A score on the training data flatters
The decision tree's error of 0 on the houses it trained on became 67,153 on houses it had not seen. A model can memorise the data it was trained on, so only scores on data it has not seen say how it will do on new districts. That is why the test set is put aside first and used only once, at the very end.
:::

## What training means here

Every `.fit()` call trains a model, and this project trains about 110 of them, which is why it takes minutes rather than seconds:

| What | Models trained |
|---|---|
| Linear regression and a decision tree, once each | 2 |
| 10-fold cross-validation of the tree, the linear model and the random forest | 30 |
| One more random forest, on the whole training set | 1 |
| Grid search: 15 combinations × 3 folds, plus a final refit | 46 |
| Randomized search: 10 combinations × 3 folds, plus a final refit | 31 |

88 of those are random forests, each made of 100 decision trees, so the project grows about 8,800 trees in all. None of them trains the way a neural network does:

- **Linear regression** is worked out directly, in one calculation (least squares).
- **A decision tree** grows one split at a time, each time choosing the question that best divides the districts, until every leaf holds districts with the same value. That is why it scored exactly 0 on its own training data. [Part 6](/posts/sklearn6/) is a whole chapter on decision trees.
- **A random forest** grows 100 trees, each on a random sample of the districts, and averages their answers. One tree memorises its training data and changes a lot with small changes to the data, but 100 different trees make different mistakes, and averaging cancels many of them out. [Part 7](/posts/sklearn7/) covers random forests, and other ways of combining trees.

My [MiniGPT](/posts/minigpt-grown/) model starts from 826,433 random numbers and nudges every one of them thousands of times, using [backpropagation](/posts/sklearn10/) to find which way each should move. Nothing here is nudged: every model is either worked out exactly or grown one decision at a time. Scikit-Learn does have models that train by nudging, such as `SGDRegressor`, and small neural networks trained with backpropagation, such as `MLPRegressor`, but this project does not use them.

:::no-dumb-questions
**Q: What is a fold?**

A: One of the equal parts that cross-validation cuts the training set into. With 10-fold cross-validation, the districts are cut into 10 parts. The model is trained on 9 of them, and scored on the 1 part it has not seen. Then the next part is held out instead, and so on, until every part has been the held-out one. That is 10 trained models and 10 scores, and the RMSE in the table is their average. With 3 folds, as in the two searches, each model trains on two thirds of the training set and is scored on the other third.

**Q: What is the RMSE, and why not just use the average gap?**

A: The plainest score is the average gap between the guess and the real price, called the mean absolute error. On the test districts that is $26,115. The book uses the RMSE instead, root mean squared error, which is $41,536 on the same districts. It is worked out in three steps: square each gap, average the squares, and take the square root. Squaring makes a big mistake count far more than a small one: a gap of $300,000 counts nine times as much as a gap of $100,000. That is why the RMSE is larger, and why it is the better score when big mistakes are what hurt, as they would for an investor. Squaring also makes the maths smoother, which helps the nudging methods of later parts. The square root at the end turns the answer back into dollars. I could also express the gap as a percentage of the price, which says whether a $26,000 mistake matters on a $60,000 house or a $500,000 one: the typical district was about 9% off. The chapter keeps to dollars.

**Q: Why train about 110 models just to pick one?**

A: Each cross-validation fold trains a fresh model, and each combination of settings in a search is cross-validated. The extra models are how the project measures, fairly, which choices work best.

**Q: Why grow 100 trees, when one tree can score 0?**

A: The single tree memorised its training data. A random forest trains each tree on a different random sample and averages their answers, so many of their mistakes cancel out: an error of 47,003 on houses held back from training, against the single tree's 67,153.

**Q: Is the final test score good news?**

A: Yes, mainly because it is close to the best score from the held-back training houses: 41,536 on the test set, against 41,983. The estimate made during the project was honest.
**Q: Why use data from 1990?**

A: Because the chapter is about the workflow, not about the housing market. The workflow is the same for any table of data: set aside a test set, look at the data, prepare it, try a few models, fine-tune the best, and check it once on the test set. For learning that, the 1990 census data is ideal. It is free: the notebook downloads it with one line of Python from a public GitHub repository (`github.com/ageron/data`), the same file that readers of the book use, with no account, no payment, and no form to fill in. It comes from the 1990 United States census, compiled into a table for a statistics paper by Pace and Barry in 1997, and Scikit-Learn also includes a copy of it, which I used in [Part 12](/posts/sklearn12/). I have not read the exact licence terms, so I would check them before using the data in anything beyond learning. It is real, it is small enough to run on a laptop in minutes (20,640 districts), and it is full of the problems that real data has: missing values, text columns, numbers on very different scales, and values that are cut off at a limit, such as house ages capped at 52. Data from today would teach the same steps. It would just be harder to get, and harder to share.

**Q: Could I adjust the 1990 prices to today's?**

A: Not in any way that I would trust. General prices have risen by more than a factor of two since 1990, so I could multiply every price by that. But California houses have risen by far more than prices in general, and by different amounts in different places, so one multiplier would be wrong for most districts. The prices that are cut off at a limit would also become cut off at a limit that no real district has. The better way to get a model for today is to run the same steps on current data. That is what the last step of the project, "launch, monitor, and maintain", is about: a model is trained on data from one time, and has to be retrained as the world changes.

:::

## Which facts matter most?

The notebook answers this two ways, and I added a third check of my own. They disagree, which is the lesson.

- **Correlation:** a score from −1 to 1 for how closely a column moves with the price. Median income is far ahead at 0.69. The next best, rooms per house, is 0.14.
- **The forest's own ranking:** after training, the random forest reports how much each column helped. Median income is first, at 0.19, then being inland, at 0.08.
- **Leaving columns out (my own check, not in the book):** I trained a forest on the plain numeric columns, scored on houses held back from training (3-fold cross-validation), and then removed one column at a time:

| Columns used | Typical error ($) |
|---|---|
| All the numeric columns | 50,416 |
| Without longitude | 63,210 |
| Without latitude | 62,235 |
| Without median income | 51,883 |
| Without the age of the houses | 48,786 |
| Latitude and longitude only | 53,762 |
| Median income only | 96,134 |

Income is the strongest single link, but removing it barely hurts, because other columns carry the same information: richer districts are also in particular places. Removing location hurts most, and location alone does nearly as well as everything together. Removing the age of the houses made the error slightly smaller, which tells me that column is mostly noise. It is one run, so I would not read much into differences of a thousand dollars.

So "how closely related" depends on how I ask. Columns that overlap share the credit, and a high score shows that two things move together, not that one causes the other.

## Why a forest, and what else could I have used?

The authors did not pick a forest in advance. They tried a linear model, a decision tree and a random forest, scored all three on houses held back from training, and kept the best, which was the forest. For a table of facts about districts, that is a sensible choice. These are the main options, with their strengths and weaknesses. This is my own summary, and the later parts show the evidence for each.

| Model | Strength | Weakness |
|---|---|---|
| Linear regression ([Part 4](/posts/sklearn4/)), from the 1800s | Simple, fast, easy to explain: one number per column | Cannot bend to fit curves, and gives unreliable numbers when columns overlap (mine gave the island category a coefficient of 196,583 on very few houses) |
| Decision tree ([Part 6](/posts/sklearn6/)), 1980s | Easy to read as a flowchart | Memorises its training data: an error of $0 on the training houses and $67,153 on new ones |
| Random forest ([Part 7](/posts/sklearn7/)), 2001 | Strong on tables with little tuning, and much less prone than one tree to memorising the training data (the forest's error was 47,003 on new houses, against the tree's 67,153) | Slower, and no longer a flowchart that a person can read |
| Gradient-boosted trees ([Part 7](/posts/sklearn7/)), 2000s | Often the most accurate on tables today | More settings to tune, and easier to overfit |
| Neural networks ([Part 10](/posts/sklearn10/) onward), modern | The best for images, sound and text | Need much more data and tuning, and are often no better than trees on a table like this |

Random forests are not new, but they are still a standard first choice for tables of data. Neural networks are what has changed in the last decade. They have taken over images and language, but trees have mostly kept the tables.

## Running the notebook in Jupyter

The project is in the chapter 2 notebook that goes with the book, [02_end_to_end_machine_learning_project.ipynb](https://github.com/ageron/handson-ml3/blob/main/02_end_to_end_machine_learning_project.ipynb). I ran the project part of it, everything up to the test set, and then looked through the results in JupyterLab. The whole run took about 6 minutes on my Mac Studio, most of it in the two searches.

![](assets/images/sklearn2/jupyter-housing-head.png)
*I loaded the data: 20,640 districts, one row each, with the median house value in the ninth column*

![](assets/images/sklearn2/jupyter-histograms.png)
*I plotted a histogram of every column: housing_median_age is capped at 52, which shows as a tall spike on the right*

![](assets/images/sklearn2/jupyter-california-map.png)
*I put the districts on a map of California: the most expensive, in red, are along the coast, around the Bay Area and Los Angeles*

![](assets/images/sklearn2/jupyter-correlations.png)
*I looked for correlations: median_income is the column most closely related to house value, at 0.69*

![](assets/images/sklearn2/jupyter-pipeline.png)
*Scikit-Learn drew the preprocessing pipeline that feeds the linear regression: each kind of column gets its own steps, and 24 features come out*

![](assets/images/sklearn2/jupyter-cross-validation.png)
*A random forest was wrong by about 47,000 on houses held back from training, but only 17,548 on the houses it trained on, so it is still overfitting: it does much better on what it has seen*

![](assets/images/sklearn2/jupyter-randomized-search.png)
*Randomized search tried different numbers of geographic clusters and features: the best combination scored 41,983*

![](assets/images/sklearn2/jupyter-test-set.png)
*Finally, I tested the model on the test set, which it had never seen: an RMSE of 41,536, with a 95% confidence interval from 39,574 to 43,780*

:::bullet-points An end-to-end project, in short
- Put the test set aside before looking at the data.
- Keep every preparation step in one pipeline, so the same steps run on all data.
- Judge a model on houses it has not seen, using cross-validation, never on the houses it trained on.
- Search for the best settings, then test the final model once.
- Nothing in this project is nudged: models are worked out directly or grown one decision at a time.
:::

Next, [Scikit-Learn (Part 3)](/posts/sklearn3/) works through chapter 3: classification, with handwritten digits.

## References

- [Aurélien Géron's chapter 2 notebook](https://github.com/ageron/handson-ml3/blob/main/02_end_to_end_machine_learning_project.ipynb) - for Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow (third edition)
- [Scikit-Learn (Part 1)](/posts/sklearn1/) - the first chapter's example
- [scikit-learn](https://scikit-learn.org/) - the library's documentation
