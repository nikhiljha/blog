+++
title = "\"Smart\": Buzzword Box"
template = "post.html"
date = 2019-07-29

[extra]
stale = false
+++

This article was originally posted to tsukuru.club, a website I made with [Audrey Xie](https://audreyxie.com/). You can see
the original archived version [at the Internet Archive](https://web.archive.org/web/20190729063846/https://tsukuru.club/posts/buzzword-box-smart-1/),
but the full text has been copied to this website for convenience.

<hr>

My (younger) cousins are visiting right now, and they found a cardboard box. The box is about a meter tall and half a meter wide, just large enough for them to fit inside it. Naturally, they turned it into a small house, complete with a cutout at the top for "Air Conditioning" (a fan they borrowed from the kitchen) and a *very* sturdy shelf on the inside.

![The House](/images/tsukuru/buzzword-box/house.jpg)

They wanted me to make the box even cooler, so I decided to incorporate as many buzzwords as possible into it. This week's buzzword is "smart" - which is the bare minimum I need to get a microcontroller into the box. From there, I have a world of opportunities: Machine Learning, Internet of Things, Blockchain...

Along the way, I also tried to teach my youngest cousin a little bit of programming. The [microcontroller (MCU) I'm using](https://www.adafruit.com/product/3333) supports [block code](https://makecode.adafruit.com) and alligator clips to connect accessories. This way, I can involve the others without handing them a soldering iron.

<video preload="auto" autoplay="autoplay" muted="muted" loop="loop" webkit-playsinline="">
    <source src="https://cdn-shop.adafruit.com/product-videos/320x240/3333-05.mp4" type="video/mp4">
</video>

## Lighting

Just to get started, I guided my youngest cousin through making a dimmable LED circle. I had a strip of LEDs, but in an effort to simplify the process we just used the LED ring built into the MCU. The box is small enough for the brightest setting to be a reasonable amount of light.

<video preload="auto" autoplay="autoplay" muted="muted" loop="loop" webkit-playsinline="">
    <source src="/images/tsukuru/buzzword-box/lighting.mp4" type="video/mp4">
</video>

## Smart Lock

The next thing I thought up is a way to prevent people from getting into the box if they aren't allowed to. Who doesn't like being part of an exclusive club? I got the idea from the block code website, where I saw that it had support for servos.

> "I have a servo. The MCU supports this servo. We should build a lock!" - Nikhil Jha, 2019

Some scissors, cardboard, tape, and alligator clip wires later, and we had a working lock!

<video preload="auto" autoplay="autoplay" muted="muted" loop="loop" webkit-playsinline="">
    <source src="/images/tsukuru/buzzword-box/lock.mp4" type="video/mp4">
</video>

In true "smart thing" fashion, the lock looks like it's working, but if you think about it then it actually doesn't work at all (the door swings both ways, and the bolt itself is made of cardboard).

## Next

With these basic electronically controllable things implemented, I can get started with the more interesting buzzwords. Here are a couple ideas I have.

- Machine Learning: Use face recognition to unlock the door.
- Internet of Things: Connect the lock to HomeKit (ESP32 <-> HomeAssistant <-> HomeKit) to open it with your phone.
- Algorithm: Turn on the fan when the temperature is above a certain degree. (The MCU has a temperature sensor onboard.)
- Blockchain: I issue tokens to people with little enough code to be still called a blockchain. You can use the tokens to change the color of the lights in the box.
- BIG Data: Install every sensor I can find or buy for < $1 and log them. Use it to predict something.
