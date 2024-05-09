+++
title = "My Alfred Workflows"
template = "post.html"
date = 2018-11-04T22:35:44+00:00

[extra]
stale = true
+++
Alfred is a very powerful replacement for Spotlight on MacOS. It's basically an instant terminal that encourages setting aliases for common tasks. Combined with AppleScript on MacOS, nearly everything can be automated. Here are the automations I found most useful in Alfred for both creative and programming work.
<h2>Alfred Default Settings</h2>
I use the Solid Dark theme, which is a more transparent and brighter version of Alfred Dark. Yes, I realize the name is completely backwards. Yes, it is too late to change it.

Almost all other settings are defaults, with the exception being the advanced calculator. The default one isn't very usable for nontrivial calculations, so enabling the advanced calculator is a must.
<h2>Colors</h2>
<a href="https://github.com/TylerEich/Alfred-Extras">Colors</a> is a workflow that converts between color names, hex colors, RGB values, CMYK, and every other common expression of color. It's useful when Digital Color Meter gives me an R, G, B triplet and I want to convert it to hex, or if I want a slightly brighter version of a color and need to experiment.
<h2>Convert</h2>
<a href="https://github.com/deanishe/alfred-convert">Convert</a> converts between things. It even does currency, which is useful for doing "Fermi-question" type napkin math and when you want to calculate the average cost of living in Rozwory, Masovian Voivodeship, Poland.
<h2>Desktop Icons</h2>
Sometimes my desktop gets a *little* messy before a presentation. As such, I created a workflow that can hide or show the desktop on command.
<h2>Mobile Dev Shortcuts</h2>
Launching an AVD is a big pain if you're not using Android Studio. Starting it up and clicking start takes literal *minutes*. Using the Alfred workflow allows me to launch it in a few *seconds*. Likewise with the iOS simulator. This workflow makes development in a lightweight text editor much more bearable. This one isn't in the zip download at the end of the post because it contains identifiers that I'm not sure about, but it's not too hard to make yourself.
<h2>Mullvad</h2>
Connects me to the Mullvad VPN using Wireguard. Right now it opens a terminal window (which isn't ideal), but it's definitely more convenient than typing out the command myself.
<h2>Quicktime Recording</h2>
If I ever need to make a voice memo or record my screen, <a href="https://github.com/mattgxyz/alfred-record-sound-workflow">this workflow</a> is very useful. Definitely a lot easier than launching QuickTime and searching the menu for the record screen button. It's also useful when I need to record something time-sensitive.
<h2>Resize Image</h2>
This is a <a href="http://www.packal.org/workflow/resize-image">workflow</a> that resizes the currently selected image to a given width and maintains the aspect ratio. This is useful when I have a huge file from a camera and only really need it to be 1080p or so.
<h2>School Shortcuts</h2>
My school uses both *Google Classroom* and *Canvas*. This workflow opens up Safari from Alfred.
<h2>StackOverflow</h2>
<a href="https://github.com/deanishe/alfred-stackoverflow">This workflow</a> searches StackOverflow. Good for quick programming questions.
<h2>TerminalFinder</h2>
Going from terminal to finder is easy, just type <code>open .</code> - but going from finder to terminal is hard. Before <a href="https://github.com/LeEnno/alfred-terminalfinder">this workflow</a>, the easiest way I could find was going up a folder and then dragging the folder into terminal. This workflow makes it five inputs. Two to launch Alfred, and <code>ft</code> + enter.
<h2>Toggle Theme</h2>
I don't use this <a href="https://www.alfredforum.com/topic/5451-yosemite-dark-mode-toggle-with-alfred-theme-toggle/">workflow</a> much, but it switches between the dark and light themes in Mojave.
<h2>TouchBar Unsticker</h2>
For a while, MacOS had a nasty bug where the Touch Bar would freeze, making the F-keys and escape completely inaccessible. I haven't needed to use this recently, but it unsticks your TouchBar by killing the server process.
<h2>Conclusion</h2>
Here's the download for the workflows I created. <a href="https://nikhiljha.com/wp-content/uploads/2018/11/Alfred-Stuff.zip">Alfred-Stuff.zip (67KB)</a>

And that's it! What Alfred workflows are you using? This blog now supports almost all IndieWeb features, so if you write a response on your own blog, it should show up as a comment!