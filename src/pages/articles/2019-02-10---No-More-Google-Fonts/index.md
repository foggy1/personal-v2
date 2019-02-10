---
title: No more Google fonts
date: "2019-02-10T16:51:00.000Z"
layout: post
draft: false
path: "/posts/no-more-google-fonts"
category: "Site"
tags:
    - "Gatsby"
    - "Fonts"
    - "Site"
description: "Inlining fonts is painless, leads to some of the biggest improvements in initial load times, and gets Google requests out of my build and my website."
---

The default font for the theme I branched this site off of is Roboto. Originally, it was loaded as such:

```javascript
// in gatsby-config.js
{
  resolve: `gatsby-plugin-google-fonts`,
  options: {
    fonts: [`roboto\:400,400i,500,700`],
  },
},
```
To those unfamiliar with Gatsby, it abstracts all kinds of nasty webpack and general build-time shenanigans by utilizing an ecosystem of plugins with a standard way of shimming things into the site at build-time. In this case, [gatsby-plugin-google-fonts](https://github.com/didierfranc/gatsby-plugin-google-fonts) does the following:

```javascript
// in gatsby-ssr.js

exports.onRenderBody = function(_ref, options) {
  var setHeadComponents = _ref.setHeadComponents

  var link = 'https://fonts.googleapis.com/css?family=' + getFonts(options)
  setHeadComponents([
    _react2.default.createElement('link', {
      key: 'fonts',
      href: link,
      rel: 'stylesheet'
    })
  ])
}
```
At a specific point in the render, Gatsby has a callback that's allowing this function to sock a font stylesheet link in the `<head>` of the site.

Cool!

... except I don't want Google junk on my site anymore. And one of the most painless things I can remove is an open source font that I can opt to get from somewhere else.

Additionally, this site has PWA functionality so that it loads better in crappy connection circumstances, and it seems silly to take a site like that and smack a bunch of links inside of the head that are used to, at load time, _make a bunch of network calls_. In fact, if your site calls in fonts from somewhere, go ahead and run Lighthouse or something against it. You'll see the fonts are one of the biggest culprits slowing down your site's initial load.

The creator of Gatsby [already thought of this](https://github.com/KyleAMathews/typefaces) with the `typefaces` npm package. You just install a specific font package -- e.g. `typeface-roboto` -- and then `require()` it at your top level component.

... and that's it.

Fonts are inlined at build time so that they don't need to be loaded from anywhere else, and you get the bonus of removing yet another vestige of surveillance capitalism from your website!
