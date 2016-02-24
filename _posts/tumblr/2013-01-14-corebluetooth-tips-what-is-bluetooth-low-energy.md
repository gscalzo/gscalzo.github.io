---
layout: post
title: 'CoreBluetooth tips: what is Bluetooth Low Energy'
date: '2013-01-14T10:01:02+00:00'
tags:
- corebluetooth
- iOS
- iphone development
- bluetooth
tumblr_url: http://giordanoscalzo.tumblr.com/post/40509186650/corebluetooth-tips-what-is-bluetooth-low-energy
---
Ok, let’s face it: Bluetooth is a well know and established technology, but it’s still a pain in the a**.
Its reconnecting feature should avoid the need to discover and connect a device, but too often it simply doesn’t work!
Some time ago, I bought a Zeo (I know, I know… a forehead band it’s just… stupid), but most annoying problem was connect it to the iPhone: every night I had to fight with the Bluetooth connection (switch off/switch on the iPhone, the device, etc), until I quit that crap.
Moreover, Bluetooth 2.0 is a energy drainer and, in a Bluetooth device, the battery life is too short for my taste.
Ok, enter Bluetooth 4.0, a really game changer.
It’s been defined as the hidden treasure of iPhone 4S, because few people noticed it, but now, as big players like Fitbit,  Withings and Parrot are entering the arena, no one can still understimate it.
From development point of view, the main difference with its predecessor is the lack of a stream channel, therefore it has a narrow bandwidth and data transfer is made through async api.
In iOS, Bluetooth 2.0 is still managed by GameKit library, but a brand new api, CoreBluetooth, has been introduced in iOS 5.0 to deal with 4.0 version.
Strangely enough, the documentation is very sparse, so that tutorials and first hand experiences, so a lot of discoveries should be made  by trial and error.
A good introduction to CoreBluetooth can be find here.In upcoming posts I’ll share some findings from the past few months, that if I found written down somewhere,  it would have saved several sleepless night.
