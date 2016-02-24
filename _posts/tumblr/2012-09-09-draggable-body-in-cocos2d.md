---
layout: post
title: Draggable Body in Cocos2d
date: '2012-09-09T15:56:39+01:00'
tags: []
tumblr_url: http://giordanoscalzo.tumblr.com/post/31196397355/draggable-body-in-cocos2d
---
Implement a draggable object in Cocos2d+Box2d is a common task, mainly during first development, so I wonder why itsn’t native in the framework.
Anyway, after struggled a little in google, I took my dead-tree copy of Learning Cocos2d and cut the useful part.

First of all it needs to create a query callback:
class SimpleQueryCallback : public b2QueryCallback
{
public:
{% highlight javascript %}
b2Fixture * fixtureFound;
SimpleQueryCallback(const b2Vec2& point) {
    pointToTest = point;
    fixtureFound = NULL;
}
bool ReportFixture(b2Fixture* fixture) {
    b2Body* body = fixture->GetBody();
    if (body->GetType() == b2_dynamicBody) {
        if (fixture->TestPoint(pointToTest)) {
            fixtureFound = fixture;
            return false;
        } }
    return true;
{% endhighlight %}
};

Then add touches handler:
- (b2Vec2)touchedPointConvertedFrom:(UITouch *)touch{
{% highlight javascript %}
touchLocation = [[CCDirector sharedDirector]
                 convertToGL:touchLocation];
touchLocation = [self convertToNodeSpace:touchLocation];

b2Vec2 locationWorld =
b2Vec2(touchLocation.x/PTM_RATIO, touchLocation.y/PTM_RATIO);
{% endhighlight %}
}

-(BOOL) ccTouchBegan:(UITouch *)touch withEvent:(UIEvent *)event {
{% highlight javascript %}

b2AABB aabb;
b2Vec2 delta = b2Vec2(1.0/PTM_RATIO, 1.0/PTM_RATIO);
aabb.lowerBound = locationWorld - delta;
aabb.upperBound = locationWorld + delta;
SimpleQueryCallback callback(locationWorld);
{% endhighlight %}

{% highlight javascript %}
    b2Body *body = callback.fixtureFound->GetBody();
    b2MouseJointDef mouseJointDef;
    mouseJointDef.bodyA = groundBody;
    mouseJointDef.bodyB = body;
    mouseJointDef.target = locationWorld;
    mouseJointDef.maxForce = 100 * body->GetMass();
    mouseJointDef.collideConnected = true;
    mouseJoint = (b2MouseJoint *) world->CreateJoint(&mouseJointDef);
    body->SetAwake(true);
    return YES;
}

{% endhighlight %}
}

-(void) ccTouchMoved:(UITouch *)touch withEvent:(UIEvent *)event {
{% highlight javascript %}
touchLocation =
[[CCDirector sharedDirector] convertToGL:touchLocation];
touchLocation = [self convertToNodeSpace:touchLocation];

b2Vec2 locationWorld = b2Vec2(touchLocation.x/PTM_RATIO,
                              touchLocation.y/PTM_RATIO);

if (mouseJoint) {
    mouseJoint->SetTarget(locationWorld);
{% endhighlight %}
}

-(void) ccTouchEnded:(UITouch *)touch withEvent:(UIEvent *)event {
{% highlight javascript %}
    world->DestroyJoint(mouseJoint);
    mouseJoint = NULL;
{% endhighlight %}
}
