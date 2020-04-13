+++
title = 'KISS SSG: A really simple static site generator.'
template = "post.html"
date = 2018-10-17T21:09:55+00:00
+++
I was recently trying to make a static website. Every existing static site generator that I found wanted to force me to make a blog. I didn't want to make a blog, I just wanted to write markdown and have it turn into a website. (Almost like writing HTML by hand, except I get to write markdown instead.)

## The K.I.S.S. Principle
> Keep it simple, stupid.

I didn't need a whole lot from the project, and definitely didn't want to pull in Hugo or Jekyll or something else huge and too domain specific.

## The Solution

Pandoc can turn markdown into html. Bash can automate it. Simple!

```bash
#!/bin/bash
set -e

rm -fr build
cp -r src build

cd build
for file in $(find . -iname '*.md'); do
	pandoc $file -o $(echo $file | sed 's/\.[^.]*$//').html -c /pandoc.css -s
	rm $file;
done
```

Just write your own CSS, put it in the root of your source directory, and run the script. You can see an example website at [laptop friends](https://laptopfriends.tech/).