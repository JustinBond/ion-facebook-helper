# ion-facebook-helper

The [Phonegap Facebook Plugin](https://github.com/Wizcorp/phonegap-facebook-plugin) is a great way to accomplish native Facebook logins, but there are two problems that most programmers will bump into. The first is that the plugin only provides a minimalist API that requires significant coding to integrate into your application. The second is that many tutorials on how to integrate the plugin into your app put the logic into AngularJS controllers, which is the wrong location. This project solves both problems by leveraging the [Ionic Framework](http://ionicframework.com), in particular AngularJS and LocalStorage. Another problem that this project solves is that many web tutorials 

## Features

* AngularJS service to manage your login session.
* AngularJS service to call the Facebook Graph to get profile information.
* AngularJS service to call the Facebook Graph to get your friends list and parse the results.
* Ionic LocalStorage is used to persistently save login, profile, and friends until you logout.
* AngularJS service to manage the text for a Facebook login/logout button.
* AngularJS controller with basic functionality for clicking login, profile, and friends buttons that can be further customized by the programmer.

## Alternatives

* ngcordova is a great choice (although at the time I began this project that name of the Facebook plugin but ngCordova had not updated the name, making it incompatible with recent versions of the plugin).

## Installation - the easy way:

