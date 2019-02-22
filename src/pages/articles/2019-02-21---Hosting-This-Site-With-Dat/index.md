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

[Dat is cool](https://datproject.org/). Here's a clip from their docs:

> Cloud services, such as Dropbox or GitHub, force users to store data on places outside of their control. Until now, it has been very difficult to avoid centralized servers without major sacrifices. Dat's unique distributed network allows users to store data where they want. By decentralizing storage, Dat also increases speeds by downloading from many sources at the same time.

It's a lot to go through in this short post (so I won't!) but the Dat project provides an `npm` package ([dat](https://www.npmjs.com/package/dat)) where you can do things like:

* `dat create` a dat project. Similar to git, you get a `.dat` folder with all kinds of goodies. You also get a `dat.json` with, optionally, a title and description. Unlike git (and not optionally), creating a `dat` proj generates a unique `dat://{hash}` uri. No need to then _de facto_ centralize the project on something like Github: that uri alone is sort of the canonical "center" of the dat world, and it's sourced via ensuing p2p sharing.
* `dat share` which allows you to, you know, _share_ your dat project. You get some secret keys on your machine during the creation process that make it so that only you can publish new changes to your particular dat.





https://github.com/datproject/docs/blob/master/papers/dat-paper.pdf
