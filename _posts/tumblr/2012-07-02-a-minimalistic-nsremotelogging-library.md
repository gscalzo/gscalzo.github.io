---
layout: post
title: A minimalistic NSRemoteLogging library
date: '2012-07-02T22:46:20+01:00'
tags: []
tumblr_url: http://giordanoscalzo.tumblr.com/post/26368470965/a-minimalistic-nsremotelogging-library
---
Lately, I’m deeply involved into developing iOS apps for custom hardware.
Often I need to debug my app when it’s connected to that stuff, and I can’t use XCode to trace the log messages.
I’ve an ATS and a splitter, but sometimes I can’t plug it, because of the form of the custom connection.
So I needed, at last, a sort way to send NSLog messages elsewhere, maybe on a server.
I searched a ready made library, but didn’t find anything minimalistic as I needed, so I wrote one ;-)
Here they are the server and the client.
Of course is very opinionated (hosting on Heroku and CocoaPod spec), and tailored to my needs, anyway it works ;-)
To use into your project, add 
dependency ‘NSRemoteLog’, :podspec => ''https://raw.github.com/gscalzo/NSRemoteLog/master/NSRemoteLog.podspec’
to your Podfile (are you using CocoaPods, aren’t you?), and add these line to the precompiled header:
#import “NSRemoteLog.h”
#define NSLog(__FORMAT__, …) [NSRemoteLog log:[NSString stringWithFormat:__FORMAT__, ##__VA_ARGS__] serverUrl:@“http://hollow-galaxy-7080.herokuapp.com/”]

That’s all!
