---
layout: post
title: 'Corebluetooth tips: can I go in background?'
date: '2013-01-21T10:00:47+00:00'
tags:
- ios
- corebluetooth
- bluetooth
- bluetooth low energy
- iphone development
tumblr_url: http://giordanoscalzo.tumblr.com/post/41092481411/corebluetooth-tips-can-i-go-in-background
---
Of course yes!
Simply add the key bluetooth-central under UIBackgroundModes and every notification is received in background too.
This is very useful to create some polling methods, implementing a sort of timer in our Bluetooth device that send a notification every a defined time interval, to wake up the app and do whatever we want.  
