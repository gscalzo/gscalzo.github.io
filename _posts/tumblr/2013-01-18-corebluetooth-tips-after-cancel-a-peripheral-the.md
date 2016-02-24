---
layout: post
title: 'Corebluetooth tips: after cancel a Peripheral, the device isn''t shown during
  scan'
date: '2013-01-18T10:00:48+00:00'
tags:
- corebluetooth
- ios
- bluetooth low energy
- iphone development
tumblr_url: http://giordanoscalzo.tumblr.com/post/40832195458/corebluetooth-tips-after-cancel-a-peripheral-the
---
This is a strange one:
when you disconnect a peripheral calling cancelPeripheralConnection, thedidDisconnectPeripheral delegate method is invoked, but the peripheral doesn’t advertise itself for about 30 seconds.
This happens because in this time frame, iOS doesn’t really close the connection, so, from the peripheral point of view, the pairing it’s still established.
Apple didn’t explain this behaviour and a lot of speculation was done; the explanation considered more likely believes that it prevents occasionally glitch of connection.
Anyway it seems than in iOS 6.1 Beta4 the timeout is reduced to a couple of seconds.
