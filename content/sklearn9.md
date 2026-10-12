---
title: "Scikit-Learn"
part: 9
description: "Unsupervised learning: finding groups in data that has no labels, with K-Means, DBSCAN, and Gaussian mixtures, and getting far with only 50 labels"
date: "2026-10-12"
categories: ["AI", "Python"]
tags: "machine-learning, scikit-learn, clustering, k-means, dbscan, gaussian-mixtures"
hidden: false
slug: "sklearn9"
image: "/assets/images/sklearn9/posts-meta.svg"
---

In [Part 8](/posts/sklearn8/), I made data smaller. Every model so far in this series, except the dimensionality reduction, learned from labelled examples: a house and its price, an image and its digit. The ninth chapter of the Hands-On Machine Learning book drops the labels. Unsupervised learning looks for structure in the data alone, most often groups of similar instances, called *clusters*.

## Key Points

**What the chapter covers:**
1. **Clustering versus classification**: the same flowers, with and without their species labels
2. **K-Means**: places a chosen number of centres, and gives each instance to its nearest one
3. **Choosing the number of clusters**: inertia keeps falling as clusters are added, so look for an "elbow", or use the silhouette score
4. **Image segmentation**: clustering an image's colours, so that it is drawn with only a few
5. **Semi-supervised learning**: clustering first, so that a few labels go much further
6. **DBSCAN**: finds clusters of any shape by following dense regions, and marks the rest as noise
7. **Gaussian mixtures**: assume the data comes from a few bell-shaped groups, and give each instance a probability of belonging to each one
8. **Anomaly detection**: instances in low-density regions are flagged as unusual

**What I learned from it:**
- Without labels, there is no single right answer; the number of clusters is a choice, and different methods find different groups.
- K-Means only works well for round, similar-sized groups, which is why DBSCAN and Gaussian mixtures exist.
- Clustering can save a lot of labelling: labelling 50 well-chosen instances beat labelling 50 random ones by a wide margin.

## Quick Example

K-Means on 2,000 points in five blobs:

```python
from sklearn.cluster import KMeans
from sklearn.datasets import make_blobs

blob_centers = np.array([[ 0.2,  2.3], [-1.5 ,  2.3], [-2.8,  1.8],
                         [-2.8,  2.8], [-2.8,  1.3]])
blob_std = np.array([0.4, 0.3, 0.1, 0.1, 0.1])
X, y = make_blobs(n_samples=2000, centers=blob_centers, cluster_std=blob_std,
                  random_state=7)

k = 5
kmeans = KMeans(n_clusters=k, n_init=10, random_state=42)
y_pred = kmeans.fit_predict(X)
```

The chapter's best result is semi-supervised: a classifier for small 8 × 8 images of digits, trained with only 50 labels. Here is how each approach did on the 397 test images when I ran the notebook:

| Labels used | Test accuracy |
|---|---|
| 50 random training images | 74.8% |
| 50 representative images: the one nearest each of 50 cluster centres | 84.1% |
| Those 50 labels copied to every image in their cluster | 86.4% |
| All 1,400 training images, labelled | 90.7% |

Copying the labels to whole clusters is not perfect: 95.5% of the copied labels were right, when the 1% of each cluster furthest from its centre was left out.

## What training means here

There are no right answers to learn from, so training means finding structure, and each method finds it in its own way.

K-Means does not nudge. It starts with its centres at random, then repeats two steps: give every point to its nearest centre, then move each centre to the middle of its points. When nothing changes, it stops. Each step is a jump to an exact answer, not a small step down a slope, but the result depends on where the centres started: one random start ended with an inertia of 219.6, where the best of 10 starts reached 211.6. That is why the notebook asks for 10 starts, `n_init=10`, and keeps the best. Mini-batch K-Means, for big datasets, does move its centres a little at a time, using small batches of points, which makes it a close cousin of the nudging in [Part 4](/posts/sklearn4/).

A Gaussian mixture is fitted in a similar back-and-forth, called Expectation–Maximization; on the chapter's data it settled in just 4 rounds. DBSCAN does not iterate at all: it grows each cluster outwards from dense points, once. My [MiniGPT](/posts/minigpt-grown/) model, by contrast, has a right answer for every letter, and nudges its 826,433 numbers towards it.

## Running the notebook in Jupyter

The chapter is in the notebook that goes with the book, [09_unsupervised_learning.ipynb](https://github.com/ageron/handson-ml3/blob/main/09_unsupervised_learning.ipynb). I ran everything before the exercise solutions, which took about 4 minutes on my Mac Studio, and then looked through the results in JupyterLab.

![](assets/images/sklearn9/jupyter-clustering-vs-classification.png)
*The iris flowers with their species labels (left) and without them (right): without labels, a clustering algorithm has to find the groups itself*

![](assets/images/sklearn9/jupyter-kmeans-steps.png)
*K-Means at work: the centres start at random, then each round gives every point to its nearest centre and moves the centres to the middle of their points*

![](assets/images/sklearn9/jupyter-wrong-k.png)
*The wrong number of clusters: with 3, blobs are merged; with 8, blobs are split*

![](assets/images/sklearn9/jupyter-elbow.png)
*Inertia falls as clusters are added; the bend, the "elbow", suggests a good number*

![](assets/images/sklearn9/jupyter-image-segmentation.png)
*Clustering the ladybug photo's colours: with 10 colours it looks almost unchanged, and with 2 the ladybug disappears into the flower*

![](assets/images/sklearn9/jupyter-representative-digits.png)
*The 50 representative digits, one per cluster: labelling these 50 gave 84.1% accuracy, against 74.8% for 50 random ones*

![](assets/images/sklearn9/jupyter-dbscan.png)
*DBSCAN on two moons: with a small neighbourhood it finds many small clusters and marks a lot of noise; with a larger one it finds the two moons*

![](assets/images/sklearn9/jupyter-gaussian-mixture.png)
*A Gaussian mixture's three bell-shaped groups, with contours showing how densely each region is expected to hold points*

Next, [Scikit-Learn (Part 10)](/posts/sklearn10/) works through chapter 10: neural networks with Keras, where backpropagation finally arrives.

## References

- [Aurélien Géron's chapter 9 notebook](https://github.com/ageron/handson-ml3/blob/main/09_unsupervised_learning.ipynb) - for Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow (third edition)
- [Scikit-Learn (Part 8)](/posts/sklearn8/) - dimensionality reduction
- [scikit-learn](https://scikit-learn.org/) - the library's documentation
