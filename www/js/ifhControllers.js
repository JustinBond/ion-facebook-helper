angular.module('ifhControllers', [])

.controller('LoginCtrl', function($scope, Notification, FacebookLogin) {
  $scope.facebookButtonLabel = FacebookLogin.getLabel();

  var update = function() {
    console.log("Begin update");
    $scope.facebookButtonLabel = FacebookLogin.getLabel();
    $scope.$apply();
  };

  // A wrapper function that is called when the Facebook button is clicked
  $scope.facebookButtonPressed = function() {
    console.log("Facebook button pressed");
    Notification.subscribe($scope, update);
    loginToggle();
  };

  var loginToggle = function() {
    facebookConnectPlugin.getLoginStatus(function(success) {
      if(success.status === 'connected'){
        console.log("User logged in ... logging out");
        FacebookLogin.logout();
      }
      else {
        console.log("User logged out ... logging in");
        FacebookLogin.login()
        .then(function(data) {
          console.log("first then - getProfile");
          var promise = FacebookLogin.getProfile();
          return promise;
        })
        .then(function(data) {
          console.log("second then - getFriends");
          var promise = FacebookLogin.downloadFriends();
          return promise;
        });
      }
    });
  };
})

.controller('ProfileCtrl', function($scope, FacebookLogin) {
  $scope.name = FacebookLogin.getName();
  $scope.email = FacebookLogin.getEmail();
  $scope.pic = FacebookLogin.getPic();
  $scope.facebookID = FacebookLogin.getFacebookID();
  $scope.accessToken = FacebookLogin.getAccessToken();
})

.controller('FriendsCtrl', function($scope, FacebookLogin) {
  $scope.friends = FacebookLogin.getFriends();
  console.log("Final friends list: ", $scope.friends);
});
