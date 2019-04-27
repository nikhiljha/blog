---
title: 'Cool Math Tricks #1: Implicit Derivative'
date: 2018-09-30T21:07:44+00:00
---
So you're in Calculus BC, and you just learned how to find the derivative of a function ($dy/dx$) when the variables aren't isolated. Unfortunately, the "standard" process that is usually taught is, although useful, really slow. Lucky for us, math always has shortcuts. In this post, I will describe a fast shortcut for implicit differentiation.

!! Do **NOT** use the shortcut and forget to learn the traditional method. You might have trouble with the conceptual questions that are asked if you do so.

## Traditional Method

You're given a function: $4x^3 + 3xy + 6y^3 = 9$

You differentiate everything like normal, except whenever you take the derivative of $y$, you multiply it by $dy/dx$ (as a result of the chain rule). If a term has both x and y, you use the product rule. It goes something like this...

```
Find the derivative of the following via implicit differentiation:
d/dx(4 x^3 + 3 x y + 6 y^3) = d/dx(9)
12x^2 + d/dx(3xy) + 18y^2(d/dx) = 0
12x^2 + 3*y + (d/dx)(3x) + 18y^2(d/dx) = 0
12x^2 + 3*y = - (d/dx)(3x) - 18y^2(d/dx)
12x^2 + 3*y = - (d/dx)(3x + 18y^2)
d/dx = - (12x^2 + 3*y)/(3x + 18y^2)
```

This is very helpful when you are doing related-rate type problems, as you have `d?/d?` in your equation already, ready to substitute in. This is also necessary to understand conceptual problems, as the shortcut handwaves it away. But how can we do it faster?

## Shortcut

### Background

On the day of the implicit derivative lesson in math, I was trying to solve the problem on my own without listening to the teacher (don't do this, I ended up with a... low... grade on the quiz because of it). I solved the problem incorrectly, but I did it again with a different problem just in case. It was at this point that I noticed a pattern.

My answers...
1. Always had the wrong sign.
2. Were flipped upside down (reciprocal).

This was too consistent for me to ignore, so I went to `##math` on Freenode to ask for help.

```
[2018-09-19 02:35:10] <fyber> In finding dy/dx for some simple function (like 3x^2 + 7xy + 2y^2 = 3)...
[2018-09-19 02:35:10] <fyber> If I treat y as a constant (dx/d?) I can get 6x + 7y
[2018-09-19 02:35:10] <fyber> If I treat x as a constant (dy/d?) I can get 7x + 4y
[2018-09-19 02:35:10] <fyber> Dividing (dy/d?) by (dx/d?), I get (7x + 4y) / (6x + 7y)
[2018-09-19 02:35:10] <fyber> The correct answer is the negative reciprocal of that, so I think I'm doing something right. Can I use this method and take the negative reciprocal in all cases?
[2018-09-19 02:36:09] <a____ptr> fyber: you could look up the implicit function theorem, which tells you when you can do it and why it has a negative reciprocal from "what you would expect"
[2018-09-19 02:37:58] <mancha> fyber: i dunno what those "?" are, but you don't treat them like constants, because they're not.
[2018-09-19 02:38:54] <fyber> I guess the "?" just represent the other side of the equation
[2018-09-19 02:39:09] <fyber> but if I think about it that way then I get 0/0 for the other side
[2018-09-19 02:39:10] <mancha> don't guess, it's your notation
... snip...
[2018-09-19 02:42:00] <fyber> I don't really know what I'm doing, it's just a neat pattern I noticed in my calculus class
[2018-09-19 02:42:16] <mancha> patterns are important
[2018-09-19 02:42:41] <a____ptr> fyber: if you think of 3x^2 + 7xy + 2y^2 as a function f(x,y), then what you're doing here by """(dx/d?)""" is taking the partial derivative of f wrt to x
[2018-09-19 02:42:53] <a____ptr> symbot: tex \partial
[2018-09-19 02:42:53] <symbot> a____ptr: ∂
[2018-09-19 02:43:11] <a____ptr> fyber: you'd write it as ∂/∂x f(x,y)... usually if you're using leibniz notation
```

!!! Apart from the amazing < 1 minute response time by `a____ptr` on IRC (❤️ IRC), we got the name of a theorem that confirms that what I'm doing should work in most cases, as well as the name of the calculus concepts that I was unknowingly using. From here, we can use Google to figure out what they are, and go from there. Now that all the background is out of the way, here's how to actually do the shortcut.

### The Actual Shortcut

You're given a function: $4x^3 + 3xy + 6y^3 = 9$

| Description                                             | Math                               | 
|---------------------------------------------------------|------------------------------------| 
| Move all terms to one side except constants.              |  $4x^3 + 3xy + 6y^3 = 9$           | 
| Pretend that y is a constant. Take the derivative.        |  $12x^2 + 3y$                      | 
| Pretend that x is a constant. Take the derivative.        |  $3x + 18y^2$                      | 
| Divide the x thing by the y thing and make it negative.   |  $-\dfrac{12x^2 + 3y}{3x + 18y^2}$ | 

### Why does it work?

Adapted from [Wikipedia](https://en.wikipedia.org/wiki/Implicit_function_theorem): The theorem states that if the equation F(x, y) = 0 satisfies some mild conditions on its partial derivatives, then one can in principle (though not necessarily with an analytic expression) express the variables of the function in terms of the other variables within some disc.

A simple ""proof"" of this (proof is in quotes because it doesn't actually prove anything, but it helps with understanding) is as follows.

Take a circle $f(x,y) = x^2 + y^2 - 1$. The partial derivatives are just $2x$ and $2y$. If you do the implicit derivative the normal way (chain rule), you get $2xdx + 2ydy = 0$. If you solve for $dy/dx$, you get $dy/dx = -x/y$, which is basically what the shortcut states. It turns out that if you only have two variables, dividing the partial derivative wrt x by the partial derivative wrt y and making the whole thing negative works.

Hope this helps!
