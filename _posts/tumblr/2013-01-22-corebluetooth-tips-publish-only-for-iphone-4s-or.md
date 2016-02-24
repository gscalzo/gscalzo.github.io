---
layout: post
title: 'Corebluetooth tips: publish only for iPhone 4S or greater'
date: '2013-01-22T10:01:10+00:00'
tags:
- ios
- corebluetooth
- bluetooth low energy
- iphone development
tumblr_url: http://giordanoscalzo.tumblr.com/post/41185050446/corebluetooth-tips-publish-only-for-iphone-4s-or
---
It’s obvious, but, as usual, I just forgot it :-)
To force an app to iPhone 4S or greater, add the key bluetooth-le under UIRequiredDeviceCapabilities entry.
The full the filter grid for the various devices can be found in iTunes Connect Developer Guide’s Appendix C - Device Compatibility Matrix.
