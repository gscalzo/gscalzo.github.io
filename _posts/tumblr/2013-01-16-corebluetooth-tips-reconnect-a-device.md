---
layout: post
title: 'CoreBluetooth tips: reconnect a device'
date: '2013-01-16T10:00:51+00:00'
tags:
- ios
- corebluetooth
- bluetooth
- bluetooth low energy
- iphone dev
tumblr_url: http://giordanoscalzo.tumblr.com/post/40671728573/corebluetooth-tips-reconnect-a-device
---
Unlike previous version of Bluetooth, in Low Energy version almost everything must be managed by the application layer.It’s quite easy to understand scan, connect and discovery process, because there is plenty of tutorial and blog posts about it, but the reconnection stuff it''s a different kettle of fish.
As usual, after found the way, it’s very easy, but I had to dig deep into Stackoverflow before see the light.
First of all, we have to save the uuid of the paired device, using a local db, NSUserDefaults, a file…
Don’t forget to transform uuid to string format before save it:
NSString *pUuid = (__bridge NSString *)(CFUUIDCreateString(nil, otherPeripheral.UUID));

When the app restart, retrieve the identifier, transform it into CFUUIDRef
{% highlight javascript %}
{% endhighlight %}

and send retrievePeripherals message to CentralManager with the list of devices to reconnect:
{% highlight javascript %}
{% endhighlight %}

After that, the relative callback is then called:
{% highlight javascript %}
- (void)centralManager:(CBCentralManager *)central didRetrievePeripherals:(NSArray *)peripherals{
    [central connect:peripheral];
{% endhighlight %}
}

The connect message is an inexpensive method, and it’s useful also to reconnect when a device go away from iPhone.
