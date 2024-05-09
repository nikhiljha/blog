+++
title = 'Neural Networks: First Steps'
template = "post.html"
date = 2018-05-02T18:10:54+00:00

[extra]
stale = false
+++
(This is a sequel to my previous post, [Neural Networks: A Baseline](https://nikhiljha.com/2018/01/09/Neural-Networks-A-Baseline/).)

Side note: I'm assuming anyone reading this has a basic understanding ("YouTube Level") of how neural networks work (a la CGP Grey).

I decided to build a fully connected feed-forward neural network, since that seemed to be the easiest thing to do.

This involves an array (vector) input, which goes "through" two matrices in order to receive a result.

Each number in the matrix corresponds to a weight or bias of a neuron. 

The way I think of matrices is a number modification tool. It takes some input, multiplies it by some number inside it, and then outputs it in a different shape. By doing this a few times, we have a neural network.

## Going Forward

Take the input matrix from the MNIST database and feed it into the network. It produces a list of very wrong answers.

We also want to regularize this and calculate loss, which I admittedly just copy pasted. From what I understand, they're finding the sum of all the scores and then dividing each score by the sum. This gives nice percent probabilities that add up to 100%.

Then they take the log of everything and flip the signs. Lastly, they use a formula that people say works pretty well to calculate loss. Ideally, the lower the loss the better our model will perform. Unfortunately, this is not always the case (due to overfitting).

```python
W1 = red * np.random.randn(784, 1024)
W2 = red * np.random.randn(1024, 10)
b1 = np.zeros(1024)
b2 = np.zeros(10)

h1 = X.dot(W1) + b1
h2 = np.maximum(0, h1)
scores = h2.dot(W2) + b2

exp_scores = np.exp(scores)
probs = exp_scores / np.sum(exp_scores, axis=1, keepdims=True)

log_probabilities = -np.log(probs[# Needs to be sliced depending on other code.])
data_loss = np.sum(log_probabilities) / minibatch_shape[0]
reg_loss = 0.5 * reg * np.sum(W1 * W1) + 0.5 * reg * np.sum(W2 * W2)
loss = data_loss + reg_loss
```

This is just multiplying random numbers together, so there's nothing too interesting to see here (except regularization). What's interesting is backprop, explained next.

## Going Backward

First we need to calculate the gradients. I haven't taken Calculus at school yet so I took some time to learn what derivatives are. First let's think of it in 2D.

In short, the derivative is the slope. If you add the slope to the x value, the y value always gets bigger. If you subtract the slope from the x value it always gets smaller.

The problem here is that this is only true for linear equations. The equations we're working with have hundreds of variables (think y = (x+3)(x-4)(x-2) or similar). As such, we need to find the slope at a single point, and then add it to the x value.

The new issue is that often times, this can take us down. With a very wavy graph, adding or subtracting the derivative can make us cross the local maximum or minimum and do the opposite of what it should.

Adding or subtracting 0.001 times the derivative is more likely to behave as expected. That 0.001 is called the learning rate. Smaller numbers usually give better results - but require more iterations and longer training times.

Now we just need to do that over our whole weight and bias matrix.

First, find the gradient (that means derivative) of the loss function. I'm not sure exactly why (TODO: learn Calculus to figure out why), but subtracting one and then dividing by the shape of the matrix gives us the gradient of the loss function wrt (with respect to) the answer. 

(Similar to how the derivative of y=x^2 is 2x wrt y.)

I tried to use it without this step and got bad results, so it seems to be necessary. On the off chance that someone is reading this, please let me know why this works.

Anyway, then all we need to do is calculate the gradients for all the weights and biases.

The gradient of W2 is h2 (transposed) times the gradient of the loss function. 

The gradient of d2 is just the sum of the gradients of the loss function.

The gradient of the ReLU is just setting all gradient values less than zero to zero.

... and repeat for W1 and W2. Due to something called the chain rule, the derivative of x wrt z is equal to the derivative of x wrt y times the derivative of y wrt z.

Then I added the derivative times a small learning rate to all the weights and biases in a loop - and we have a neural network!

## Result

97.87%. Although a far cry from the 99.79% achieved in 2013 - it's a start.

In the future I will try to bring it as close as possible to that 99.79% result given by those researchers. After reading their paper, it may even be possible to surpass their score.

I rushed through writing this (tests, other excuses), but I want to help other people learn. If you have any questions, feel free to contact me. At the very least (in the likely event I don't know) I'll try to find you a resource where you can find out.

## Notes

I managed to break one of the rules I set for myself already! People who have taken cs231n will notice that I followed that tutorial. Unlike most tutorials - I feel like I actually now have a basic understanding of the topic.

I realize that I shouldn't have boxed myself out of large learning opportunities like that one. It's probably better to keep an open mind, especially when trying to learn something new.

I'm thinking I'll take a break from neural networks and talk about something else instead in the next post.
