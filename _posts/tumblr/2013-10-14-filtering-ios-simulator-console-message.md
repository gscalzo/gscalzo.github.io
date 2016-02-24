---
layout: post
title: Filtering iOS Simulator Console message
date: '2013-10-14T15:38:41+01:00'
tags:
- iOS Development
tumblr_url: http://giordanoscalzo.tumblr.com/post/64016281232/filtering-ios-simulator-console-message
---
Are you relying on some kind of messages you put in NSLog to see what are happening in your work in progress app?
Are these messages buried inside a lot of other messages?
This made my day:
tail -f /var/log/system.log | grep “EVENT_MARKER”

Neat, isn’t it?
