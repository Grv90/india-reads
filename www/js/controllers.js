angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate,$cookies) {

  // Called to navigate to the main app
  $scope.startApp = function() {
    $state.go('main');
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };

  $cookies.put('SIGNED_IN_USER', 'true');

})


.controller('ContentCtrl', function($scope, $state, $ionicSlideBoxDelegate, Main, $cordovaInAppBrowser, $ionicActionSheet, $timeout,Socialshare) {
  $scope.urls;

  $scope.allNews = Main.getProperty();
  if ($scope.allNews.length == 0) {
    Main.all().then(function(response) {
      $scope.allNews = response.data;
      $scope.allNews.source=response.data.source.replace(/-|\s/g," ");
    })
  }


  $scope.options = {
    direction: 'vertical',
    slidesPerView: '1',
    paginationClickable: false,
    showNavButtons: true
  };

  $scope.urlchange = function($url, $rootScope) {
    $cordovaInAppBrowser.open($url, "_blank", "location=no", "clearcache: no", "toolbar: no");
  }

  $scope.$watch('data.slider', function(slider) {
    console.log('My slider object is ', slider);
    $scope.slider = $scope.slider;
    // Your custom logic here
  });

  $scope.onGesture = function() {
    $state.go('sources')
  }

  $scope.openShareDock = function(object) {


    // Show the action sheet
    var hideSheet = $ionicActionSheet.show({
      buttons: [{
        text: '<div class="row"><div class="col col-10"><span class="fa fa-facebook padding-left padding-right"></div><div class="col col-80">Faceebook</div></div> '
      }, {
        text: '<div class="row"><div class="col col-10"><span class="fa fa-twitter padding-left padding-right"></div><div class="col col-80">Twitter</div></div> '
      }],
      cancelText: '<div class="row"><div class="col col-10"></div><div class="col-80">Cancel</div></div>',
      titleText: '<div class="row"><div class="col col-10"><span class="fa fa-share padding-left padding-right"></div><div class="col col-80">Share to </div></div> ',

      cancel: function() {
        // add cancel code..
        console.log('hello');
        hideSheet();
      },
      buttonClicked: function(index) {
        if (index == 0) {
          Socialshare.share({
            'provider': 'facebook',
            'attrs': {
              'socialshareUrl': object.url
            }
          });
        }
        if (index == 1) {
          Socialshare.share({
            'provider': 'twitter',
            'attrs': {
              'socialshareUrl': object.url
            }
          });
        }
        return true;
      }
    });


  }



  $scope.data = {};
})

.controller('SelectedSourceCtrl', function($scope, $state, $ionicSlideBoxDelegate, Main,$cordovaAppVersion) {

  var vm = this;
    //   $cordovaAppVersion.getVersionNumber().then(function(version) {
    //   $scope.appVersion = version;
    // });


  Main.allSources().then(function(respone) {
    $scope.allSources = respone.data.sources;
  })


  $scope.onGesture = function() {
    $state.go('content')
  }

  $scope.data = {};


  $scope.fetchNews = function(obj) {
    Main.fetchSourceNews(obj.id, obj.sortBysAvailable[0]).then(function(response) {
      Main.setProperty(response.data);
      $state.go('content');
    })
  }
})
