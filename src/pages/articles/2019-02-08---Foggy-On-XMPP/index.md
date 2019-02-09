---
title: Foggy on XMPP
date: "2019-02-08T16:51:00.000Z"
layout: post
draft: false
path: "/posts/foggy-on-xmpp"
category: "Projects"
tags:
    - "XMPP"
    - "Jabber"
description: "Back on XMPP thanks to ejabberd and a few long, frustrating nights."
---

Long story short, I've got an XMPP server set up for myself and you can hit me up pretty much any time I'm on a computer at foggy@jumanji.io.

Between [prosody](https://prosody.im/) and [ejabberd](https://www.ejabberd.im/), I ended up going with the latter. The reason? Well, they both were an absolute nightmare to set up on a couple of my go-to hosts, but mostly for reasons independent of the frameworks.

Prosody, to its credit, worked out of the box absolutely anywhere I put it: unfortunately, on the one machine I really wanted to run it on, I was having separate cert issues where I would have had to jump through hoops to keep prosody's SSL up to date. On that same machine and one other, I couldn't get ejabberd working because of icky low-level erlang tool conflicts. It was my first experience being mad at an erlang install on a machine. And because the other service was a critical one, I didn't want to tangle with the package manager more than I had to.

It feels good to be in control of a chat platform that just works (as opposed to a [bloated mess](/posts/software-gripes-synapse)). AIM was a big part of my life (it was the main means I used to communicate with my partner long distance for over two years), and I hope more folks turn back to Jabber as a standard. I'm tired of bloated electron apps and obtuse, proprietary phone apps (apps that I can't even install because they're only available via app stores I don't have on my phone).
