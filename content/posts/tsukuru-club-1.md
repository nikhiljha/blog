+++
title = "Playing a Rhythm Game on a Real Piano: A Short Project"
template = "post.html"
date = 2019-07-13

[extra]
stale = false
+++

This article was originally posted to tsukuru.club, a website I made with [Audrey Xie](https://audreyxie.com/). You can see
the original archived version [at the Internet Archive](https://web.archive.org/web/20200619054924/https://tsukuru.club/posts/rhythm-game-on-real-piano/),
but the full text has been copied to this website for convenience.

<hr>

Many rhythm games have UIs inspired by the piano. It's a simple instrument on the surface (just press the keys to make noise), and that made it a great base for many rhythm games. Let's play these games on a real piano!

This is a super short article for a super short project, but there are more projects coming up soon! Stay tuned!

<!--more-->

## The Plan

The entire concept is gluing input from the piano to output as keystrokes, so I figured I could write it in about 10 lines of Python. I basically needed the following program structure...

1. Read MIDI input data
2. Map the MIDI input to keypresses
3. Actually press the keys on the keyboard

## Implementation

Lucky for me, my piano has Bluetooth MIDI output. It's finnicky on non-Apple devices, but getting a regular MIDI signal was a piece of cake using the MacOS `Audio MIDI Setup`.

![Connecting the Piano](/images/tsukuru/rhythm-piano/studio.png)

Next up was actually programming, which in Python-land means 5% typing out code, 15% copy-pasting code, and 80% trying different libraries to figure out which is best. After trying out many different libraries to do both tasks, I settled with `mido` for MIDI I/O and `keyboard` for keyboard I/O.

```python
# Dependencies
import mido
import keyboard

# Use A Major Scale
# Maybe switch to something more interesting...
notes = {
	57: "d", # A3
	61: "f", # C#4
	64: "j", # E4
	69: "k", # A4
}

# Main note processing loop...
with mido.open_input() as inport:
    for msg in inport:
    	# Convert MIDI note to key using dict.
    	key = notes.get(msg.note, None)
    	
    	# If the key exists, play it.
    	if key != None:
    		if msg.type == "note_on":
    			keyboard.press(key)
    		elif msg.type == "note_off":
    			keyboard.release(key)
```

... and then it didn't work.

## Troubleshooting

Turns out, MacOS protects you from programs both reading and writing to your keyboard / mouse input. This is probably a good default, because very few apps actually need that permission.

![Disabling Protection](/images/tsukuru/rhythm-piano/safety.png)

... and after disabling protections on `Terminal.app`, I was ready to play rhythm games!

## Product

![StepMania](/images/tsukuru/rhythm-piano/yay.jpg)

The Bluetooth latency is noticable but it's not too bad. Neat.

You can find the full code and instructions [at this git repository](https://github.com/nikhiljha/midi2kb).
