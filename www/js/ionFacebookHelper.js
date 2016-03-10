var mod = angular.module('IonFacebookHelper', []);

mod.service('FacebookLogin', ['Notification', 'FacebookFriends', '$localstorage', '$q',
            function(Notification, FacebookFriends, $localstorage, $q) {

  var _buttonLabel = "Login Facebook";

  this.getLabel = function() {
    return $localstorage.get('buttonLabel', "Login Facebook");
  };

  this.getAccessToken = function() {
    return $localstorage.get('accessToken', null);
  };
  this.getName = function() {
    return $localstorage.get('name', null);
  };
  this.getEmail = function() {
    return $localstorage.get('email', null);
  };
  this.getFacebookID = function() {
    return $localstorage.get('facebookID', null);
  };
  this.getPic = function() {
    return $localstorage.get('pic', null);
  };
  this.getFriends = function() {
    return FacebookFriends.getFriends();
  };

  this.logout = function() {
    facebookConnectPlugin.logout(function() {
      console.log("Successfully logged out of Facebook");
      $localstorage.set('buttonLabel', "Login Facebook");
      Notification.notify();

      $localstorage.set('facebookID', null);
      $localstorage.set('accessToken', null);
      $localstorage.set('email', null);
      $localstorage.set('name', null);
      $localstorage.set('pic', null);
    },
    function() {
      console.log("Error: Failed to logout of Facebook");
    });
  };

  this.login = function() {
    var deferred = $q.defer();

    facebookConnectPlugin.login(['email', 'public_profile', 'user_friends'],
    function(response) {
      console.log("Successful Facebook login");
      $localstorage.set('facebookID', response.authResponse.userID);
      $localstorage.set('accessToken', response.authResponse.accessToken);
      $localstorage.set('pic',
      "http://graph.facebook.com/" + response.authResponse.userID + "/picture?type=large");

      FacebookFriends.deleteFriends();

      $localstorage.set('buttonLabel', "Logout Facebook");
      Notification.notify();
      deferred.resolve(response);
    },
    function(error) {
      console.log("Error logging into Facebook:", error);
      deferred.reject(error);
    });
    return deferred.promise;
  };

  this.getProfile = function() {
    console.log("Begin _getProfile()");
    var deferred = $q.defer();

    facebookConnectPlugin.api('/me?fields=email,name&access_token=' + $localstorage.get('accessToken'), null,
      function (response) {
        console.log("_getProfile success callback: ", response);
        $localstorage.set('email', response.email);
        $localstorage.set('name', response.name);
        deferred.resolve(response);
      },
      function (response) {
        console.log("_getProfile error callback", response);
        deferred.reject(response);
    });
    return deferred.promise;
  };

  this.downloadFriends = function() {
    var deferred = $q.defer();

    facebookConnectPlugin.api('/me/friends', null,
      function (response) {
        console.log("downloadFriends() success callback: ", response);
        _parseFriends(response.data);
        deferred.resolve(response.data);
      },
      function (response) {
        console.log("downnloadFriends error callback", response);
        deferred.reject(response);
    });
    return deferred.promise;
  };

  var _parseFriends = function(data) {
    for (i=0; i < data.length; i++) {
      var friendObject = data[i];
      FacebookFriends.addFriend(friendObject.name, friendObject.id);
    }
  };

}]);

mod.service('FacebookFriends', ['$localstorage', function($localstorage) {

  function Friend(name, id) {
    this.name = name;
    this.id = id;
    //this.pic = "http://graph.facebook.com/" + id + "/picture?type=large";
  }

  this.addFriend = function(name, facebookID) {
    var newFriend = new Friend(name, facebookID);
    var friends = $localstorage.getObject('friends');
    // Some duck typing here since Javascript's type checking have warts
    // Allows me to use generic object localstorage to store array
    try {
      friends.push(newFriend);
    }
    catch(err) {
      console.log("Caught ", err);
      friends = [];
      friends.push(newFriend);
    }
    $localstorage.setObject('friends', friends);
  };

  this.getFriends = function() {
    var friends = $localstorage.getObject('friends');
    friends.sort(function(a, b) { return b.name < a.name;});
    return friends;
  };

  this.deleteFriends = function() {
    $localstorage.setObject('friends', {});
  };
}]);

mod.service('Notification', function($rootScope) {

  this.subscribe = function(scope, callback) {
    console.log("subscribing to notification");
    var handler = $rootScope.$on('notifying-service-event', callback);
    scope.$on('$destroy', handler);
  };

  this.notify = function() {
    console.log("emitting notification");
    $rootScope.$emit('notifying-service-event');
  };
});

mod.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  };
}]);
