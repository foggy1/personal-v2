---
title: Hosting this site with Dat
date: "2019-02-21T16:51:00.000Z"
layout: post
draft: false
path: "/posts/hosting-this-site-with-dat"
category: "Site"
tags:
    - "Dat"
    - "p2p"
    - "Site"
description: "Even with serverless deployment, sites like mine have one source of truth; dat spreads out that responsibility."
---

[Dat is cool](https://datproject.org/). If you download [Beaker Browser](https://beakerbrowser.com/) you can visit my site on the peer-to-peer web at [this dat:// link](dat://615f743b4ccaf6dc53a68dea17891ca602d2f0afa04758d93f3b61060596a758/). For a little about Dat, here's a clip from their docs:

> Cloud services, such as Dropbox or GitHub, force users to store data on places outside of their control. Until now, it has been very difficult to avoid centralized servers without major sacrifices. Dat's unique distributed network allows users to store data where they want. By decentralizing storage, Dat also increases speeds by downloading from many sources at the same time.

It's a lot to go through in this short post (so I won't!) but the Dat project provides an `npm` package ([dat](https://www.npmjs.com/package/dat)) where you can do things like:

* `dat create` a dat project. Similar to git, you get a `.dat` folder with all kinds of goodies. You also get a `dat.json` with, optionally, a title and description. Unlike git (and not optionally), creating a `dat` project generates a unique `dat://{hash}` uri. No need to then _de facto_ centralize the project on something like Github: that uri alone is sort of the canonical "center" of the dat world, and it's sourced via ensuing p2p sharing.
* `dat share` which allows you to, you know, _share_ your dat project. You get some secret keys on your machine during the creation process that make it so that only you can publish new changes to your particular dat. Once it's been shared, there are tools like [hypercored](https://www.npmjs.com/package/hypercored) to subscribe to changes and continue to peer them.
* `dat clone`, git clone's both more and less cumbersome distant cousin. _Less_ cumbersome because file size doesn't matter and download speed depends on peers. _More_ cumbersome because activities like forking and working across upstreams is essentially impossible (you'd have to `dat clone` then copy the project, remove the metadata, sync the original cloned dat and diff across the fork yourself without version control) and, will _download speed depends on peers_. Without popping your stuff on [Hashbase](https://hashbase.io) or setting up something like `hypercored` as a service on your own infrastructure, decentralized is just... nowhere.

At the moment, I've got a little `npm` script that I run manually in my Gatsby project that moves my local `.dat` into the generated `public/` build folder, as well as the `dat.json` at which point it runs `dat share`. I've only been messing with this for a little while, so I'm still trying to grok the best way to have an improved flow without losing track of things. Running manually is meh (I could make a Gatsby plugin for that), but even if I automate it, I'm not sure how to handle the fact that share watches for changes and won't just finish on completing upload. I'm sure there's something that won't watch but... well, documentation is focused in other places, or I missed something.


In the meantime, I'd like to get around to reading the [Dat white paper](https://github.com/datproject/docs/blob/master/papers/dat-paper.pdf).
