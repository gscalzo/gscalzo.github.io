---
layout: post
title: 'iOS dev tips: CocoaPods'
date: '2013-01-25T07:00:00+00:00'
tags:
- iOS
- iOS development
tumblr_url: http://giordanoscalzo.tumblr.com/post/41429098516/ios-dev-tips-cocoapods
---
Premise: I’m not anymore so young (I’m doubly young :-)), and I started to love computer with ZxSpectrum and than Dos (coming out: I’ve never owned an Amiga :-().
So my dev life cycle is mostly controlled by Cli commands.
In this serie of (short) posts, I’d like to note down all common tools I use in my projects.
First, and maybe, most important one is my favourite dependency manager: CocoaPods.
CocoaPods is like gem+bundler ora working version of Maven (joking :-)).
All it needs is to install the gem, create a simple configuration file with the dependencies, run pods install and… Voilà!
No more fight with external libraries, Arc or non Arc!
Now and them some glitches still appear, but nothing that a
rm -rf Pods && pods update 
can’t resolve.
