# ion-facebook-helper

The [Phonegap Facebook Plugin](https://github.com/Wizcorp/phonegap-facebook-plugin) is a great way to accomplish native Facebook logins, but there are two problems that most programmers will bump into. The first is that the plugin only provides a minimalist API that requires significant coding to integrate into your application. The second is that many tutorials on how to integrate the plugin into your app put the logic into AngularJS controllers, which is the wrong location. This project solves both problems by leveraging the [Ionic Framework](http://ionicframework.com), in particular AngularJS and LocalStorage. Another problem that this project solves is that many web tutorials 

## Alternatives

* ngcordova is a great choice (although at the time I began this project that name of the Facebook plugin but ngCordova had not updated the name, making it incompatible with recent versions of the plugin).

## Installation Method

It is easy to install by simply cloning the repository, but all you really need is ionFacebookHelper.js so you may just want to grab that and ignore the rest of the installation instructions.

Install the [Ionic Framework](http://ionicframework.com/getting-started/)
Create and Authorize your Facebook App
Clone the repository: 
```
git clone https://github.com/JustinBond/ion-facebook-helper
```
Add a platform:
```
cd ion-facebook-helper
git platform add android
```
Install the Phonegap-Facebook-Plugin: 
```
cordova plugin add https://github.com/Wizcorp/phonegap-facebook-plugin/ --variable APP_ID="YOUR_FACEBOOK_APP_ID" --variable APP_NAME="YOUR_FACEBOOK_APP_DISPLAY_NAME"
```
Install the Phonegap Facebook Whitelist plugin: 
```
ionic plugin add https://github.com/apache/cordova-plugin-whitelist
```
Build and run (note that plugins cannot be run out of ionic serve): 
```
ionic run android
```

## Login to Facebook

