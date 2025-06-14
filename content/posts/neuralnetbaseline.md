+++
title = "Neural Networks: A Baseline"
template = "post.html"
date = 2018-08-01T18:09:24+00:00

[extra]
stale = true
+++
In order to adequately understand Neural Networks, I need to get a general idea of the tooling people actually use in the real world. No more tutorials providing `helpers.py` files which obfuscate simple tasks. I want to try to use my ability searching and solving problems to get around that instead.

That said, here are a couple rules that I made for myself in regards to learning about Neural Networks.

1. No "easy" tutorials or classes. Although easy to complete, I usually learn very little out of them.
2. Documentation and academic papers are not only allowed, but recommended. Everything new comes in the form of code, documentation, or an academic paper, and I want to be able to read those.
3. Python packages are also allowed, as long as they do not do what I'm trying to learn about.

In this post, I use a prebuilt implementation of a random forest classifier to get a baseline. This post is me getting my feet wet with the Python data science tooling.

<!--more-->

## Dataset Choice

First things first, find a small dataset to practice with.

After looking around for a while I found the MNIST dataset. It contains pictures of handwritten digits for character recognition. It's also less than 100 MB, and as such will easily fit into RAM of any modern computer.

The dataset can be downloaded on [Yann LeCun's Website](http://yann.lecun.com/exdb/mnist/).

One thing to note is that `wget` automatically unzips the gzip files, while leaving the extension (a byproduct of how the web works). As listed on the site, all I needed to do to get it to work was to remove the `.gz` file extension.

## Loading the Dataset

The dataset format is fairly basic and is described on [Yann LeCun's Website](http://yann.lecun.com/exdb/mnist/). Unfortunately, for a high level language user like me, it was not immediately obvious how I could load this into Python to make it useful.

One interesting thing I noticed was that this dataset is big-endian, while most modern processors are little-endian. In practice, this doesn't cause much of a problem for someone using Python.

I looked up the idx file format and found `idx2numpy`, a package on PyPi that makes loading the dataset as easy as `idx2numpy.convert_from_file("train-images-idx3-ubyte")`.

```python
train_data = idx2numpy.convert_from_file("train-images-idx3-ubyte").reshape(60000, 784)
train_label = idx2numpy.convert_from_file("train-labels-idx1-ubyte")
test_data = idx2numpy.convert_from_file("t10k-images-idx3-ubyte").reshape(10000, 784)
test_label = idx2numpy.convert_from_file("t10k-labels-idx1-ubyte")
```

Note: The `.reshape()`s become necessary later, as I will explain.

## Inspecting the Dataset

Getting a good look at how the dataset is structured seems like a good idea. To do so, I did a `.shape` on all of my data.

Note: I am using a Jupyter notebook, so I don't need to print my results. The results are shown within the notebook.

```python
train_data.shape; // Before resizing: (60000, 28, 28)
train_label.shape; // Before resizing: (60000,)
```

Okay, seems pretty simple. We have 60000 images, with each image being 28 pixels by 28 pixels.

## Getting a Baseline

Okay, time to do some simple analysis with scikit-learn and a Random Forest Classifier (herein, RFC).

```python
from sklearn.ensemble import RandomForestClassifier
clf = RandomForestClassifier(max_depth=2, random_state=0)
clf.fit(train_data, train_label)
clf.score(test_data, test_label)
```

Oops, without the `.reshape()` function added on, it doesn't work. A quick look at the Scikit-Learn documentation explains why. It is expecting 2D data in the shape (number, data). I thought about it for a while and figured that due to how RFCs work, it wouldn't matter if I resized the 3D data into 2D space. Numpy makes this easy, all I needed to do was reshape it to (60000, 28*28) - and I have 2D data.

We get a 57% baseline for ~10 lines of Python. Not bad compared to the 10% accuracy given by random guessing.

## Future

The end goal of this is for me to implement a neural network without using high level libraries like TensorFlow or Theano that gets above 90% accuracy. The current state of the art is around 99.79% accuracy, and reading the academic paper once I've learned a bit about neural networks could help me get there as well.
