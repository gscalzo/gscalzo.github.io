---
layout: post
title: Programmatically add custom event in the iPhone Calendar
date: '2012-02-21T18:19:00+00:00'
tags:
- ios
tumblr_url: http://giordanoscalzo.tumblr.com/post/18015696408/programmatically-add-custom-event-in-the-iphone
---
Programmatically add custom event in the iPhone Calendar

It can be useful to add custom event to your private calendar.
EventKit.Framework can do the trick:

{% highlight javascript %}
{% endhighlight %}

{% highlight javascript %}
event.endDate   = [[NSDate alloc] initWithTimeInterval:600
{% endhighlight %}

{% highlight javascript %}
{% endhighlight %}
[eventStore saveEvent:event span:EKSpanThisEvent error:&err]; 
