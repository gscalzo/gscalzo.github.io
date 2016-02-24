---
layout: post
title: 'Corebluetooth tips: how many devices can I manage?'
date: '2013-01-22T10:01:10+00:00'
tags:
- ios
- corebluetooth
- iphone development
tumblr_url: http://giordanoscalzo.tumblr.com/post/41185050424/corebluetooth-tips-how-many-devices-can-i-manage
---
Ok, this is the question, given the lot of activity done on StackOverflow (for example here).
There isn’t an official answer from Apple, but during last Apple Technology Forum, I asked  directly to Brian Tucker (Apple CoreBluetooth Senior Manager).Brian was kind enough to give me an articulated answer:
there is no limit in concurrent connection, but problems rise during data transfer, because all connections share the same bandwidth, obviously.
Moreover, Bluetooth and Wifi share the same antenna, so the number of contemporary transferring devices are affected by the wireless activity.
Given these informations, a good rule of the thumb is to consider safe until about ten concurrent peripherals transferring data.
