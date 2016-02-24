---
layout: post
title: Print all iOS fonts in Swift
date: '2014-08-27T11:13:21+01:00'
tags: []
tumblr_url: http://giordanoscalzo.tumblr.com/post/95900320382/print-all-ios-fonts-in-swift
---
Handy function that I always forget
{% highlight swift %}
func printFonts() {
    for familyName in fontFamilyNames {
        println("------------------------------")
        println("Font Family Name = [\(familyName)]")
        let names = UIFont.fontNamesForFamilyName(familyName as! String)
        println("Font Names = [\(names)]")
    }
{% endhighlight %}
