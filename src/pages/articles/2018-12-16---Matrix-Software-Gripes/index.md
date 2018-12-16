---
title: "Software Gripes: Synapse"
date: "2018-12-16T16:51:00.000Z"
layout: post
draft: false
path: "/posts/software-gripes-synapse"
category: "Software gripes"
tags:
    - "Software gripes"
    - "Matrix"
    - "Chat protocol"
description: "Granular room-and-device-based encryption is neat, but Matrix suffers from clunky back-end implementations."
---

## Why I Tried Synapse

Matrix is a chat protocol like IRC and XMPP. I mean "like" here in the sense that it is a protocol and not a particular client or particular back-end implementation. I wanted to run some type of chat protocol because my partner and I used AIM nearly until the very end and I miss having something that was lightweight and always on whenever I popped open one of my machines. IRC and XMPP are easy for me to set up, but they always require instructions that are too over-and-above "register and then sign in" for the average person. Additionally, in IRC's case, I'd be locked in a bubble and get no additional use out of the account than talking to the people I wrangled into my server.

Matrix seemed like a better fit: simple registration, pretty easy install,  slick Slack-esque front-end clients like Riot, and federation like XMPP that would allow me to reuse my account elsewhere.

Except Synapse, the most supported Matrix implementation, is an absolute resource hog.

## Performance Issues

I have an Alpine Linux server where I run a Pleroma instance (Pleroma is federated social platform somewhere between GNU Social and Mastodon), a Jenkins instance, a Nextcloud instance a Miniflux instance, and a Hugo instance that is always on (in other words, it compiles blog posts as I write them as if it was in dev mode and serves it as a service rather than post-compile. Why? Because I thought it would be funny and it actually works pretty well).

That's five services and I think I might be forgetting something. At any given time they take up about 1 gig of RAM total, with no notable spikes given my usage.

When I added Synapse, RAM began to plateau at 1.7 gigs (a 70% increase) and if I were to load a new chatroom, sometimes an entire CPU core would spike to 100% (average usage being... less than 7% at any given time that I check in).

In a word: unacceptable.

Just before writing this I finished plucking it out of my server. In addition to not being very friendly to the RAM on my service, I also just wasn't using it. The communities that are on there are underdeveloped at best and sketchy at worst (though I should point out that the sketchiness of certain groups of people who choose to use open, private platforms is not an indictment of those platforms; it's just irritating when other communities haven't also used up real estate in a more representative proportion). And, it turns out as I found out that it's just far enough beyond a typical registration to still be unintuitive to the average person.

Oh, also, it's written in Python 2.7, which I feel like I'm allowed to be angry about now that we're approaching 2019.

Anyway, at a certain point, it's easier to just turn to my partner and say "hey, install Signal" than anything else. In an ideal world (in _my_ ideal world), I control my own infrastructure for everything; but, I'd also have infinite time to deal with all that crap. If federated infrastructure that's meant to be self-hosted isn't really and immediately friendly to my resources --my time and my wallet being the two most readily exhaustible ones-- then it's not a good solution yet. 
