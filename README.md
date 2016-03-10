# ion-facebook-helper

The [Phonegap Facebook Plugin](https://github.com/Wizcorp/phonegap-facebook-plugin) is a great way to accomplish native Facebook logins, but there are two problems that most programmers will bump into. The first is that the plugin only provides a minimalist API that requires significant coding to integrate into your application. The second is that many tutorials on how to integrate the plugin into your app put the logic into AngularJS controllers, which is the wrong location. This project solves both problems by leveraging the [Ionic Framework](http://ionicframework.com), in particular AngularJS and LocalStorage. Another problem that this project solves is that many web tutorials 

## Alternatives

* ngcordova is a great choice (although at the time I began this project that name of the Facebook plugin but ngCordova had not updated the name, making it incompatible with recent versions of the plugin).

## Installation Method

```
Install the [Ionic Framework](http://ionicframework.com/getting-started/)
Create and Authorize your Facebook App
git clone https://github.com/JustinBond/ion-facebook-helper
cd ion-facebook-helper
git platform add android
cordova plugin add https://github.com/Wizcorp/phonegap-facebook-plugin/ --variable APP_ID="YOUR_FACEBOOK_APP_ID" --variable APP_NAME="YOUR_FACEBOOK_APP_DISPLAY_NAME"
ionic plugin add https://github.com/apache/cordova-plugin-whitelist
ionic run android
```
Note that you cannot use ionic serve with the plugin.

## Login to Facebook

All you need to do is put in the button somehwere in your app:

```
<button class="button button-block button-positive" ng-click="facebookButtonPressed()">{{facebookButtonLabel}}</button>
```

When the user clicks the button the following will happen:
1. They will be taken to the Facebook plugin's native login dialogue.
2. When they return, the text for the button will update from "Login Facebook"
to "Logout Facebook". A subsequent press of the button will log them out.
3. The user's profile and friends list will be downloaded and restored.


