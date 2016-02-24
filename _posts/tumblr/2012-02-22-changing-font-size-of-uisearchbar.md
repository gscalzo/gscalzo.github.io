---
layout: post
title: 'Changing font size of UISearchBar '
date: '2012-02-22T11:41:00+00:00'
tags:
- ios
tumblr_url: http://giordanoscalzo.tumblr.com/post/18065085499/changing-font-size-of-uisearchbar
---
Changing font size of UISearchBar There is no way to change font in a UISearchBar, but it’s possible with a little trick:
for(int i =0; i<[searchbar.subviews count]; i++) {
{% highlight javascript %}
           isKindOfClass:[UITextField class]])
        [(UITextField*)[searchbar.subviews objectAtIndex:i] 
        setFont:[UIFont       
{% endhighlight %}
}
