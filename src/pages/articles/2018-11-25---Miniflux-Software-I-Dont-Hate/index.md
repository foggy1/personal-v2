---
title: "Software I Don't Hate: Miniflux"
date: "2018-11-25T16:51:00.000Z"
layout: post
draft: false
path: "/posts/software-i-dont-hate-miniflux"
category: "Stuff I don't hate"
tags:
    - "Stuff I don't hate"
    - "Miniflux"
    - "RSS"
description: "RSS is great and will always be great an Miniflux is a simple but opinionated feed reader that embraces the core philosophy of functional aggregation."
---

I love RSS. I could take or leave a lot of web standards, but RSS makes perfect sense to me and its treatment as a second or third class citizen of how we presently interact with the internet is a tragedy, albeit it an unsurprising one.

Why do I love RSS?

1. **My attention span**. It's... not great. And the modern internet is designed to capitalize on that by getting me to bounce around between bite-sized things. RSS aggregates stuff in one place such that if I'm sitting down and reading through things in which I'm interested, I need only go to one place: it helps consolidate my mental effort.
2. **Ads**. I don't want to deal with them.
3. **Popups internal to the website**. We're in an age where I can't go to a single website without getting one or both of a cookie popup (that I can't decline, by the way, which I'm pretty sure would be illegal if I were in the EU), or a "Download the mobile app!" popup on a mobile website that's clearly reactive enough to yell at me to download their app so that they can load three dozen analytics tools onto my phone.
4. **Readability**. This dovetails with the previous two but I just don't like sitting and reading things on Medium because I get about one square inch of phone real estate in which to scroll through their content.
5. **Big Brother(s)**. Google and Facebook (minimally) are following me almost everywhere I go on the internet, and I have to jump through hoops while browsing in order to try and obfuscate their already rich profile of me. As it stands on the Firefox install on my desktop machine I have six(!!!) add-ons used to explicitly and implicitly control tracking activity in my browser, along with a slew of preferences in Firefox itself. RSS allows me to stay in one place and bounce between content without giving anybody in particular a fleshed-out picture of my activity on the internet.

## The Problem: Websites Cheat

I used Feedly for a few years back when I was an aspiring freelance writer in order to try and pour as much writing into my brain as I could manage. I was too late to the RSS train to mourn the death of Google Reader, but I can't say I'm heartbroken at not being wedded to another Google service (I'm trying to migrate off of as many as I possibly can as it stands).

The problem with Feedly wasn't necessarily a problem with Feedly, but it was still an issue that Feedly wasn't equipped to help me with: websites cheat at RSS. The whole point is for me to aggregate content from across the internet, and yet many websites--even some purportedly tech-forward ones--cheat by making only a snippet of their article available in RSS syndication. This is a rather thinly-veiled method of driving traffic to their site.

While every site, particularly the ones driven by ad revenue, has a right to try and drive traffic to itself, it's a bad-faith usage of the RSS syndication system. The whole reason I'm using RSS is because I don't want to bounce around on the internet for the sake of both my attention span and the ad conglomerates tracking everything I do. When Ars Technica forces me to read "14 more paragraphs" of the article I'm already reading via a hyperlink to their site they're not just gaining ad revenue from someone who is already a reader: they're funneling me into a network of surveillance of which they are but one participant and over which they have no control. This might sound a little dramatic but it is, unfortunately, not false.

Any site that uses Google and/or Facebook analytics and syndicates only snippets of RSS to try and funnel people to their site are committing the double-foul of *forcing* me to violate my own privacy while partially breaking the syndication system itself.

## Enter Miniflux

[Miniflux](https://miniflux.app/) is an RSS reader written in Go and Python that you can deploy yourself via a [static binary](https://github.com/miniflux/miniflux/releases) (or you can [pay them for hosting](https://miniflux.app/hosting) at only 15 bucks a year). I presently run it on an Alpine server that I run along with a few other utilities for myself. Despite there being no guide to installing Miniflux on Alpine (the closest is a couple of Docker files), its status as a binary makes the whole setup relatively quick.

For those reasons alone (only a database dependency and being able to deploy it myself) Miniflux is superior to options like Feedly. On top of that, when Google and Facebook aren't tracking me, _Feedly is_. Feedly keeps track of everything I read internally, as well as using Google analytics to track me on their site. I actually net a privacy _loss_ from something like Feedly, because not only am I being tracked by large companies, but the fine-grainedness of how I approach and interact with my aggregated content is now something Feedly knows as well.

Miniflux doesn't log anything and, even if it did, it would log it to a database under my control. So, in addition to being easy to deploy on my own infrastructure, it doesn't leech on my infrastructure or send data about my activity to anybody else.

The real kicker is in Miniflux's elegant "Fetch Original Content" button. When I click this on a post that's only a snippet, Miniflux goes and scrapes the HTML of the offending page and plops in *right into my reader*. I haven't had a chance to inspect how it does this, but my guess is that it leans on the fact that Miniflux will always know the source link of the content (assuming the RSS feed is not broken) and then that page itself is likely following an HTML standard with its article in a certain tag.

I don't see this as bad faith scraping at all; rather, I see it as Miniflux stepping in to hold up the part of the RSS contract that these sites fail to uphold themselves.

## Gripes: Almost None

Ever since I started developing software I essentially do nothing but complain about other software. Of course, this is when I'm by myself, ranting out loud to nothing but an empty room (or maybe my girlfriend if she's unlucky enough to walk in when I can't find a button or a page refreshes too soon). In general, a lot of this comes in good humor from a place of empathy: I know exactly what kinds of temporal, financial, and personnel constraints the devs were facing when they put something together. Even if I don't know the particulars, I get it. But being honest about these flaws helps us all button up our respective projects.

With respect to Miniflux, between the ease of deployment (under 30 minutes on Alpine with no guide is pretty bonkers) and the no-bullshit approach to delivering content and NOT violating my privacy, I'm completely sold. My only gripe is in marking content as read. In the mobile versions of pages, I can swipe away things I already read or don't want to read. It's not the most tactile swipe in the world but it works fine.

On desktop, I'm not so lucky. I have to check off a tiny read button that isn't very much fun to press. This dovetails with the further issue of culling content in which I have no interest. Sometimes, a bunch of junk gets dumped in the feed because of what I read and I just want to get rid of ten things at once. I can't do that.

It's possible to argue that this forces the curator (as in me) to be more intentional about when they put in the feed. I'm sympathetic to that. But I'm not sure if a semi-minor UX decision should have a role in a decision set that is _that_ important to my feed experience.

