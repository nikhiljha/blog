+++
title = "Attempting to Use LoRaWAN to Make a Cheap Item Tracking System"
template = "post.html"
date = 2019-08-08

[extra]
stale = true
+++

This article was originally posted to tsukuru.club, a website I made with [Audrey Xie](https://audreyxie.com/). You can see
the original archived version [at the Internet Archive](https://web.archive.org/web/20191209222250/https://tsukuru.club/posts/adventures-in-lorawan-1/),
but the full text has been copied to this website for convenience.

Edit 6/18/2020: See the note at the end of this article.

<hr>

If you're like me, you've been hearing about a thing called "LoRaWAN" for a while.
It promises long distance (~7 km line of sight, ~2km if placed sufficiently high up
in an urban area, down to ~100m within a house), low bandwidth communication with
very low power consumption.

I really wanted to make my bicycle have cool features (like lights and a GPS tracker),
but LTE coverage is expensive. LoRA coverage is also lacking in my area, so I needed to
make my own relay to test.

I decided to start by making an LTE-free GPS tracker.

For the purpose of practicality, my area apparently does have Sigfox coverage, so I will
eventually add that too.

## The Things Network

Someone made a free network of LoRA gateways that anyone can add to and use. This
is similar to what Sigfox does, except instead of having corporate service providers,
the gateways can be provided by anyone.

[![The Things Network Homepage](/images/tsukuru/lorawan/homepage.png)](https://www.thethingsnetwork.org/)

I originally wanted to fully control everything in the stack, but using a free service
like this means that I get increased range and an easier way to set things up. Win!

## Building the Gateway

It turns out that I had two Pycom Fipys still unused from a previous project. The fipy
provides LoRA, Sigfox, WiFi, Bluetooth, and LTE on a single board, so I figured that it
would be able to function as a good LoRA gateway.

![The Gateway](/images/tsukuru/lorawan/gateway_pic.jpeg)

The gateway would take information from the LoRA radio and send it over WiFi to The Things
Network.

Thankfully, the Pycom website had a tutorial explaining how to create a relay. 
Unfortunately, the tutorial is overcomplicated, so here's what I did. You can 
skip the rest of this section if you're not interested in a tutorial.

First, get your gateway ID from the Fipy REPL.

```python
from network import WLAN
import ubinascii
wl = WLAN()
ubinascii.hexlify(wl.mac())[:6] + 'FFFE' + ubinascii.hexlify(wl.mac())[6:]
```

Then, get the latest versions of all relevant files and put them in an empty folder.

```bash
wget https://raw.githubusercontent.com/pycom/pycom-libraries/master/examples/lorawan-nano-gateway/config.py
wget https://raw.githubusercontent.com/pycom/pycom-libraries/master/examples/lorawan-nano-gateway/main.py
wget https://raw.githubusercontent.com/pycom/pycom-libraries/master/examples/lorawan-nano-gateway/nanogateway.py
```

Then, type relevant values into the config. I had to type in my WiFi information, comment
out the Europe section, and change the router from `eu` to `us` (the -west is implied).

In order to setup the gateway on the Things Network website, you will need the gateway ID
that you found in the first step.

## Managing the Device

It turns out, Pycom has a free device management software called Pybytes that allows you
to get a full REPL (and do OTA software updates) as long as you're within range of WiFi, 
and check on device status if connected by WiFi, Sigfox, or The Things Network.

The instructions for setting this up were super straightforward on their website, so I
won't redocument them here.

## Testing the Range

To test the range I used an Adafruit LoRA Feather M0. The library they suggest using
with the M0 seems to no longer work - the example code goes into a failed state
right after trying to send for the first time.

The TinyLoRa library was small and didn't cause any errors, so I used that instead.

![Dropped Frames](/images/tsukuru/lorawan/transmitter_pic.jpeg)

I was around 3 meters away from where I put the gateway, but even when I got close
to it, TTN still reported no data recieved. After resetting the arduino many times,
one packet went through, and another. I ended up getting over **95% packet loss**!

![Dropped Frames](/images/tsukuru/lorawan/framedrops.png)

It turns out, the Pycom board isn't really the best thing to use as a gateway. The
ideal LoRaWAN gateway has 8 channels and some fancy tech to manage that.

## Trying Sigfox?

The Sigfox map shows where I am to have 3+ base stations in range (apparently ideal)
but no matter how much I walked around outside, I couldn't get the Fipy to connect
to a base station. My frequency/region is set correctly, but nothing comes through
on the Sigfox backend.

## Conclusion

In order to use LoRaWAN with The Things Network, you need an actual gateway. Cheaping
out doesn't work if you actually want your data to go through. I'll post again with
more hardware once I get to building a proper, LoRaWAN compliant gateway.

Edit 6/18/2020: I was looking through posts while moving everything over from tsukuru.club,
and I noticed this, which is wildly inaccurate, please disregard this. I'm keeping it
up for archival purposes though.
