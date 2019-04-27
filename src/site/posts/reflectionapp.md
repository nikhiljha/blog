---
title: 'A Reflection: How to Actually Write Apps'
date: 2018-08-23T18:12:02+00:00
---
So a few days (weeks?) ago I published a very poorly written article about how to write modern Android apps. I was very excited about what Kotlin brought to the table in terms of Android development and wanted to get something out about it. I soon hit roadblock after roadblock of weird legacy quirks with Android and did what any sane person would do - rewrite the app.

## Flutter: A new way to write mobile apps.

I've never found a React Native app (not written by a big company at least) that felt *good*. There are plenty of iOS apps out there written in straight Swift that look excellent, and there are plenty of apps written in straight Java that look good as well. All of the React Native apps that I tried felt slow on everything but the fastest iPhones.

Then, by chance, I saw a suggested link on the side of StackOverflow. The question was about Dart/Flutter, so I looked around a bit and came to the decision that I was going to rewrite with Flutter.

## My first attempt at using Flutter.

The starter code is surprisingly helpful. It shows you how to make an app that reads from a state, display the state, and set the state. Nearly any programming task related to the user interface can be described in this way (create, read, update, delete).

A few hours later I had accomplished... nothing. I learned a lot about how Flutter and widgets worked, I got comfortable with the syntax of Dart, and I had written a couple simple apps that parsed data from some API somewhere, but the lack of an RSS Package and an SQLite Package that supported DateTime really confused me.

I halfheartedly opened up my old project and continued working on that for a bit when I realized two things.

1. An RSS feed is just XML in a specific format.
2. I created the SQLite Database, so it wouldn't be hard to make it into some other format.

After opening the SQLite Database in a GUI and exporting it as a JSON file (Flutter seems to have really good support for that), I was off to the races.

I managed to implement the other features of my app (news reader, schedule time checker, and one-tap calling) in the rest of the day. Not bad for a programming language I had never used before.

## UI Troubles

The sheer number of Widgets that you have to put into other Widgets in order to get a decent looking UI scared me at first. It seemed like the phone would probably have a hard time keeping up with that many objects on the screen at once. My phone was starting to lag in debugging, which was scaring me a bit.

Luckily, this turns out to be a nonissue. The production app runs just fine on all the devices I've seen it being used on. Basically, the production builds are significantly faster than the debug builds.

At the time though, I didn't know this. I found a few open source examples of a nice looking UI and copied one to make my app look decent.

## More Changes

I had implemented all the actual features, but the app still looked terrible. All text based data was displayed as plain text. Meanwhile the person writing the iOS app had something that looked amazing. Granted, he had been working on it for a few months longer than I had and his app was nowhere near stable enough to launch, but it already looked better.

Turns out, just having more buttons and choices makes people think it's more feature complete. Whereas he broke up "Sports" into multiple lists with subcategories, I put all of the different sports games on one page. Whereas he split the teachers into their respective departments, I put them on one page and planned to sort them and make them searchable.

My idea of design is/was something along the lines of ["I know it when I see it."](https://en.wikipedia.org/wiki/I_know_it_when_I_see_it) - which isn't good enough to actually create good UI design. I hope to learn more about good UI design in the future.

## Conclusion

Use Flutter. You won't have as many hand-holding libraries for you to use, but most of the problems that you might actually need a library to solve (as in, not rss) are solved.

It's technically in beta, but I've never seen it crash as a result of something that wasn't obviously my fault (like ignoring linter errors).
