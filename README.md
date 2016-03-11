# ion-facebook-helper

The [Phonegap Facebook Plugin](https://github.com/Wizcorp/phonegap-facebook-plugin) is a great way to accomplish native Facebook logins, but there are two problems that most programmers will bump into. The first is that the plugin only provides a minimalist API that requires significant coding to integrate into your application. The second is that many tutorials on how to integrate the plugin into your app put the logic into AngularJS controllers, which is the wrong location. This project solves both problems by leveraging the [Ionic Framework](http://ionicframework.com), in particular AngularJS and LocalStorage. Another problem that this project solves is that many web tutorials 

## Alternatives

* ngcordova is a great choice (although at the time I began this project that name of the Facebook plugin but ngCordova had not updated the name, making it incompatible with recent versions of the plugin).

## Installation Method

This assumes that you have installed Ionic and created and authorized your Facebook app.

```
git clone https://github.com/JustinBond/ion-facebook-helper
cd ion-facebook-helper
git platform add android
cordova plugin add https://github.com/Wizcorp/phonegap-facebook-plugin/ --variable APP_ID="YOUR_FACEBOOK_APP_ID" --variable APP_NAME="YOUR_FACEBOOK_APP_DISPLAY_NAME"
ionic plugin add https://github.com/apache/cordova-plugin-whitelist
```
Note: you cannot use `ionic serve` with the Phonegap Facebook plugin.

The Ion Facebook Helper has already been injected into the sample Ionic project.
But if you are building your own app from scratch be sure to inject 
ionFacebookHelper into your app.js 
```
angular.module('starter', ['ionic', 'ifhControllers', 'IonFacebookHelper'])
```

## Login to Facebook

Put in the button somehwere in your app:

```
<button class="button button-block button-positive" ng-click="facebookButtonPressed()">{{facebookButtonLabel}}</button>
```

Clicking the button wraps up several stages of functionality. They will be 
taken to the Facebook native login dialogue. If they authenticate successfully, 
then the label for the button will be updated from *Login Facebook* to *Logout 
Facebook*. Clicking the button again would then log them out of Facebook. 
Finally, their Facebook profile and friends list will be downloaded and saved
to Ionic's LocalStorage.

## Calling a RESTful Server

For many apps, logging into Facebook is the first step to getting an Access 
Token which is then used to authenticate on your back-end server. The easiest 
way to accomplish that would be to modify the loginToggle() function in 
controllers.js. It uses AngularJS promises and already has several promises 
chained together, so it should be easy to add in one extra promise.

## Get your access token and profile info

In the controller for whichever view you need it, add the following code:
```
$scope.accessToken = FacebookLogin.getAccessToken();
$scope.name = FacebookLogin.getName();
$scope.email = FacebookLogin.getEmail();
$scope.pic = FacebookLogin.getPic();		// returns the URL to your profile pic
$scope.facebookID = FacebookLogin.getFacebookID();
```

## Get your friends list

In the controller for whichever view you need it, add the following code:
```
$scope.friends = FacebookLogin.getFriends();
```

Then in your view add html like the following:
```
<div class="row">
  <ul>
    <li ng-repeat="friend in friends">Name: {{friend.name}} ID: {{friend.id}}</li>
  </ul>
</div>
```






