---
layout: post
title: 'How to Fix "Error: No developer directory found at /Developer"'
date: '2012-03-08T17:58:34+00:00'
tags: []
tumblr_url: http://giordanoscalzo.tumblr.com/post/18952145920/how-to-fix-error-no-developer-directory-found-at
---
Upgrading to XCode 4.3, if you launch the compilation by command line, you could encounter the error:

Error: No developer directory found at /Developer. Run /usr/bin/xcode-select to update the developer directory 

This because the Developer folder is now in the Xcode bundle itself, so you have to launch the command:
sudo /usr/bin/xcode-select -switch /Applications/Xcode.app/Contents/Developer/ 
