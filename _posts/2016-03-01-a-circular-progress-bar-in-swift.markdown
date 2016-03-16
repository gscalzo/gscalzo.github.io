---
layout: post
title:  "Facebook Music Stories Spinning Artwork Teardown 1/2: circular progress bar"
date:   2016-03-15 01:00:00
last_modified_at:  2016-03-15 01:00:00
excerpt: "Facebook Music Stories has a nice spinning artwork effect when the song plays, let see how to implement it..."
categories: tutorial
tags:  swift tutorial teardown facebook
image:
  feature: 02_circular_progress_bar.jpg
  topPosition: 0px
bgContrast: dark
bgGradientOpacity: darker
syntaxHighlighter: yes
---
Few months ago Facebook implemented the feature of sharing a song from an external streaming app, like Spotify, Deezer or Apple Music.

<div class="img img--fullContainer img--14xLeading" style="background-image: url(https://9to5mac.files.wordpress.com/2015/11/music-stories.jpg?w=2500&h=0#038;h=562);">    
</div>
[Facebook Music Stories article on 9TO5Mac](http://9to5mac.com/2015/11/05/facebook-iphone-apple-music-spotify-music-stories/)

Leaving aside all the considerations about what it could mean for sharing music, the thing I liked the most was the smooth animation that transforms the artwork in a spinning record-like; also, the button presents a circular progress bar to indicate the progress of the song. 

##Goal
We want to replicate in full the Facebook Music Stories animation, and, because it would be too long do it in the same tutorial, we'll split into two blog posts: in the current one we'll implement the skeleton of the app and the circular progress bar, in the next one we'll implement the transformation into a blurred spinning record and back.

##Observations
As said, we'll concentrate in this post to haves a basic app to host the animation and to implement the progress bar.
<iframe width="853" height="480" src="https://www.youtube.com/embed/_m7gi1wOlgs" frameborder="0" allowfullscreen></iframe>
As you can see in the video above, the play buttons become a pause button and a circular progress grows as the song plays.

##Blueprint
###Project Setup
Let's fire up Xcode and create a new project using the template #Single View Application#:
<div class="img--post img--12xLeading" style="background-image: url({{ site.baseurl_posts_img }}/2016-03-01/01_ProjectTemplate.png);">    
</div>
After that we give the name, *SpinningArtwork* or whatever you want, without forgetting to select _Swift_ as language:
<div class="img--post img--12xLeading" style="background-image: url({{ site.baseurl_posts_img }}/2016-03-01/02_ProjectName.png);">    
</div>

As you can see the template creates an empty ViewController embedded in a *Main.storyboard*.
To make it clearer, let's rename it as *SpinningArtworkViewController*, and change it in the storyboard, after selecting the ViewController:
<div class="img--post img--12xLeading" style="background-image: url({{ site.baseurl_posts_img }}/2016-03-01/03_RenameViewController.png);">    
</div>
<div class="img--post img--12xLeading" style="background-image: url({{ site.baseurl_posts_img }}/2016-03-01/04_SelectViewController.png);">    
</div>
<div class="img--post img--12xLeading" style="background-image: url({{ site.baseurl_posts_img }}/2016-03-01/05_NewViewControllerInStoryboard.png);">    
</div>
###Assets

Let's now add the assets to the project: download the zip from [here]({{ site.baseurl_posts_img }}/2016-03-01/Resources/Assets.zip)
After selecting the _Assets_:
<div class="img--post img--12xLeading" style="background-image: url({{ site.baseurl_posts_img }}/2016-03-01/06_SelectAssets.png);">    
</div>
we drag the resources in the right sidebar, and we move the artwork in the _@2x_ place:
<div class="img--post img--12xLeading" style="background-image: url({{ site.baseurl_posts_img }}/2016-03-01/07_ArtworkAsset.png);">    
</div>
For the button assets, because they are _pdf_ they can be automatically resized by Xcode during the compile fase, but we need to specify that they are _vectorial_ and then _universal_:
<div class="img--post img--12xLeading" style="background-image: url({{ site.baseurl_posts_img }}/2016-03-01/08_ButtonVector.png);">    
</div>
<div class="img--post img--12xLeading" style="background-image: url({{ site.baseurl_posts_img }}/2016-03-01/09_ButtonUniversal.png);">    
</div>

### Blurred Background
Although not completely related to the component we want to implement, having a blurred background behind the artwork gives an idea of completeness to our example, and it reminds the original component from Facebook.
Let's start adding a _UIImageView_ as  a subview of the main view in the Storyboard, and then we configure the constraints to make it big as the mainview.
The process is quite straightforward, but notably don't forget to:

- add _AbbeyRoadArtwork_ as _Image_ of the _UIImageView_
- select _Aspect Fill_ in the view mode, otherwise, the image will be stretched
- uncheck _Constrain to margins_ to have the image covering the whole _View_
- add 0 to all of the boundary constraints
- select _Update Frames: Items of new Constraints_, so that the view in _Interface Builder_ will be updated accordingly to the new layout

<div class="img--post img--12xLeading" style="background-image: url({{ site.baseurl_posts_img }}/2016-03-01/10_ArtworkBackground.png);">    
</div>

Let's now add a _Visual Effect View_ to the hierarchy:
<div class="img--post img--12xLeading" style="background-image: url({{ site.baseurl_posts_img }}/2016-03-01/11_AddVisualEffect.png);">    
</div>
Similarly, we add the constraints to the view:
<div class="img--post img--12xLeading" style="background-image: url({{ site.baseurl_posts_img }}/2016-03-01/12_AddConstraintsToVisualEffect.png);">    
</div>
Running the app we have a nice blurred background effect:
<div class="img--post img--12xLeading" style="background-image: url({{ site.baseurl_posts_img }}/2016-03-01/13_BlurredBackground.png);">    
</div>

### Spinnable Artwork
Having finally a skeleton of the app, let's implement a custom view for our component.
To make more interesting, we'll make it as _Designable_, which means that it can be seen in Interface Builder.
To make it designable, we need to prepend the keyword _@IBDesignable_ to the class, and because we want to be able to set the image of the artwork interactively in Interface Builder, we create a property _imageName_ and we decorate it with _@IBInspectable_.
Usually designable means that the view has a way to draw itself in the code, but it can be also be defined using a _nib_ file: to do this, we need to add a view as a subview of custom view itself and add some magic to load the class from the _nib_.
The following is the public interface of the class:

{% highlight swift %}
import UIKit

@IBDesignable
class SpinnableArtwork: UIView {
    @IBOutlet var view: UIView!
    @IBOutlet var artworkImageView: UIImageView!
    @IBOutlet var playerButton: PlayerButton!

    @IBInspectable var imageName: String! {
        didSet {
            artworkImageView.image = UIImage(named: imageName)
        }
    }
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        setup()
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        setup()
    }
}
{% endhighlight %}

As you can see, in both the initializers we are calling a _setup()_ function that is defined in a private extension:

{% highlight swift %}
private extension SpinnableArtwork {
    func setup() {
        view = loadViewFromNib(theClassName)
        view.frame = bounds
        view.autoresizingMask = [UIViewAutoresizing.FlexibleWidth, 
                                 UIViewAutoresizing.FlexibleHeight]
        addSubview(view)
    }
    
    func loadViewFromNib(nibName: String) -> UIView {        
        let bundle = NSBundle(forClass: self.dynamicType)
        let nib = UINib(nibName: nibName, bundle: bundle)
        let view = nib.instantiateWithOwner(self, options: nil)[0] 
                    as! UIView        
        return view
    }
    
    var theClassName: String {
        return NSStringFromClass(self.dynamicType)
               .componentsSeparatedByString(".").last!
    }
}
{% endhighlight %}

As you can imagine from the previous code, we need to create a _nib_ file with the same name as the class: _SpinnableArtwork_ in this case.
In _Interface Builder_ we then set the _File's Owner_ as the class we have just created:
<div class="img--post img--5xLeading" style="background-image: url({{ site.baseurl_posts_img }}/2016-03-01/14_NibFileOwner.png);">    
</div>

Before adding the views, we create a skeleton of button for the _play/pause_, which inherits from _UIImageView_:

{% highlight swift %}
import UIKit

class PlayerButton: UIImageView {
}
{% endhighlight %}
This will change the image from _play_ to _pause_ and it will contain the circular progress bar.

As you can see in the following image, the custom view is composed by a container view, which is loaded in the _setup()__ function in the code, a full screen image that contains the artwork, and the _Player Button_ in the center:
<div class="img--post img--10xLeading" style="background-image: url({{ site.baseurl_posts_img }}/2016-03-01/15_SpinningArtworkNib.png);">    
</div>
The constraints are really simple: basically all the view are centered in the parent view, and the size is equal to the parent for the container and the artwork image view, and smaller for the button:
<div class="img--post img--10xLeading" style="background-image: url({{ site.baseurl_posts_img }}/2016-03-01/16_SpinningArtworkHierarchy.png);">    
</div>
To define that the player button is always proportionally smaller than the parent view, we defined a equal relationship between its width and the width of the parent, and then we changed the multiplier constants to _0.4_:
<div class="img--post img--10xLeading" style="background-image: url({{ site.baseurl_posts_img }}/2016-03-01/17_ProportionalWidth.png);">    
</div>
Now let's add our custom view in the _Main.storyboard_.
To do this we add a plain _UIView_ and then we change the _Custom Class_ to _SpinnableArtwork_.
The constrains are basically to center it, setting an aspect ratio 1:1, and fix the width to 240:
<div class="img--post img--10xLeading" style="background-image: url({{ site.baseurl_posts_img }}/2016-03-01/18_DesignableViewContraints.png);">    
</div>
After selecting the _Spinnable Artwork_ as custom class, we can see in the _Attributes Inspector_ that a new _Image Name_ attribute is appeared: as you can guess, it is our inspectable variable that assigns the image to the custom class:
<div class="img--post img--10xLeading" style="background-image: url({{ site.baseurl_posts_img }}/2016-03-01/19_InspectableAttribute.png);">    
</div>
Setting _"AbbeyRoadArtwork"_ as value and running the app, we can see that our new component works as expected.
However, wasn't _IBDesignable_ supposed to show in the Storyboard?
Why we still have a white view?
This is because when the app runs, the image is retrieved from the main bundle, but when the app runs inside _Interface Builder_, the bundle is different and the image is not found.
To make it appear in the storyboard we need to add a function int he _SpinnableArtwork_ class, to prepare the view for the storyboard:
{% highlight swift %}
extension SpinnableArtwork {
    override func prepareForInterfaceBuilder() {
        let image = UIImage(named: "AbbeyRoadArtwork", inBundle: NSBundle(forClass: self.dynamicType), compatibleWithTraitCollection: nil)
        artworkImageView.image = image
    }
}
{% endhighlight %}
Now the artwork is visible in the storyboard as well.
<div class="img--post img--10xLeading" style="background-image: url({{ site.baseurl_posts_img }}/2016-03-01/20_VIsibleDesignableView.png);">    
</div>

### Play and Pause
Let's move on and make the button changing when we tap on the view.
First of all, we add the _IBAction_ in the _SpinningArtwork_ class:

{% highlight swift %}
@IBDesignable
class SpinnableArtwork: UIView {
    //...    
    private var playing = false {
        didSet {
            updateUI()
        }
    }
    
    @IBAction func artworkDidTap(sender: AnyObject) {
        playing = !playing
    }
    //...
}
{% endhighlight %}
Where the private function _updateUI()_  changes the image in the button:
{% highlight swift %}
private extension SpinnableArtwork {
    func setup() {
        //...
        updateUI()
    }
    //...
    func updateUI() {
        if playing {
            playerButton.image = UIImage(named: "large_pause")
        } else {
            playerButton.image = UIImage(named: "large_play")
        }
    }
}
{% endhighlight %}

As you can see we have also added a call to _updateUI()_ during the setup, so that the player button is correctly initialized.
Finally, we add a _TapGesture_ and we connect the action to the function _artworkDidTap_:
<div class="img--post img--10xLeading" style="background-image: url({{ site.baseurl_posts_img }}/2016-03-01/21_TapGesture.png);">    
</div>

##Player
A play/pause button is quite useless, so that let's implement a Fake Player that just update the progress every second.
To be ready to use a real player, we define a protocol _Player_:
{% highlight swift %}
protocol Player {
    func play()
    func stop()
}
{% endhighlight %}

We define also a protocol for every object interest in receiving the progress of the player:
{% highlight swift %}
protocol PlayerObserver: class {
    func progress(progress: Int)
}
{% endhighlight %}

Finally, let's implement a Fake Player:
{% highlight swift %}
class FakePlayer: Player {
    private var timer: NSTimer!
    private var progress = 0
    weak var playerObserver: PlayerObserver?

    func play() {
        timer = NSTimer.scheduledTimerWithTimeInterval(0.5,
            target: self,
            selector: Selector("timerDidFire"),
            userInfo: nil,
            repeats: true)
        progress = 0
    }
    
    func stop() {
        timer.invalidate()
    }
    
    @objc func timerDidFire() {
        progress += 1
        if progress > 100 {
            timer.invalidate()
            return
        }
        
        playerObserver?.progress(progress)
    }
}
{% endhighlight %}

The _SpinnableArtwork_, being interested in the progress of the player, must implement the observer protocol:
{% highlight swift %}
extension SpinnableArtwork: PlayerObserver {
    func progress(progress: Int){
        print("Progress: \(progress)")
    }
}
{% endhighlight %}

To be able to play and stop the player, we add a player property, and we change the tap action:
{% highlight swift %}
@IBDesignable
class SpinnableArtwork: UIView {
    //...
    var player: Player?
    
    @IBAction func artworkDidTap(sender: AnyObject) {
        if playing {
            player?.stop()
        } else {
            player?.play()
        }
        playing = !playing
    }
    //...
}
{% endhighlight %}

In the _SpinningArtworkViewController_ we create an outlet to connect the view in the storyboard, and we set the player in it:
{% highlight swift %}
class SpinningArtworkViewController: UIViewController {
    @IBOutlet var spinnableArtwork: SpinnableArtwork! {
        didSet {
            let player = FakePlayer()
            player.playerObserver = spinnableArtwork
            spinnableArtwork.player = player
        }
    }
}
{% endhighlight %}

Running the app, we can see that tapping on the cover, the button changes and the progress appears in the Xcode console:
<div class="img--post img--10xLeading" style="background-image: url({{ site.baseurl_posts_img }}/2016-03-01/22_ProgressConsole.png);">    
</div>

##Circular Progress Bar
Finally, we are set everything for the grand finale.
Most important class of this first part of the project is the _ProgressLayer_, which is a full circle Shape Layer, and it exposes a _progress()_ function that draws the percentage of the circle, being 0 at the beginning and 100 at the end:
{% highlight swift %}
import UIKit

class ProgressLayer: CAShapeLayer {
    private struct Constants {
        static let startAngle = -CGFloat(M_PI_2)
        static let endAngle: CGFloat = CGFloat(2*M_PI) + startAngle
    }
    
    func computePath(rect: CGRect) {
        strokeColor = UIColor.whiteColor().CGColor
        lineWidth = 8
        lineCap = kCALineCapButt;
        strokeEnd = 0.00;
        fillColor = UIColor.clearColor().CGColor
        
        let side = rect.width / 2.0
        let radius = side - lineWidth
        
        let path = CGPathCreateMutable()
        CGPathAddArc(path, nil, side, side, radius, Constants.startAngle, Constants.endAngle, false)
        self.path = path
    }
    
    func progress(progress: Int) {
        if strokeEnd >= 1 {
            strokeStart = (CGFloat(progress)-1)/100.0
        } else {
            strokeStart = 0
        }
        
        let animation = CABasicAnimation(keyPath: "strokeEnd")
        animation.duration = 0.5
        animation.fillMode = kCAFillModeForwards
        animation.timingFunction = CAMediaTimingFunction(name: kCAMediaTimingFunctionLinear)
        animation.removedOnCompletion = false
        strokeEnd = CGFloat(progress)/100.0

        addAnimation(animation, forKey: "strokeEnd animation")
    }
}
{% endhighlight %}

Actually, the code is straightforward.
Probably the only notable thing is the calculation of the initial and final angle: being the starting angle of an arc in iOS at the right horizontal, and we want to make it start at the central vertical, we need the subtract PI/2.

We then set this layer as the default layer in the _PlayerButton_:

{% highlight swift %}
class PlayerButton: UIImageView {
    override class func layerClass() -> AnyClass {
        return ProgressLayer.self
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        (layer as! ProgressLayer).computePath(bounds)
    }
}

extension PlayerButton: PlayerObserver {
    func progress(progress: Int){
        (layer as! ProgressLayer).progress(progress)
    }
}
{% endhighlight %}

In the _SpinnableArtwork_ we just need to call the progress function in the playable button:
{% highlight swift %}
extension SpinnableArtwork: PlayerObserver {
    func progress(progress: Int){
        print("Progress: \(progress)")
        playerButton.progress(progress)
    }
}
{% endhighlight %}

Et Voilà, we implemented a Circular Progress Bar!

<div class="img--post img--10xLeading" style="background-image: url({{ site.baseurl_posts_img }}/2016-03-01/23_CircularProgressBar.png);">    
</div>

##Conclusions
The post was longer than I thought, but it permits to have a clear idea on how to build an interactive custom component.
We saw how to have a _Designable View_, how to implement a layer, and how to animate it.
The code for this part can be found [here on Github](https://github.com/gscalzo/SpinnigArtwork/tree/CircularProgressBar) 