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

.controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate, $cookies) {

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


.controller('ContentCtrl', function($scope, $state, $ionicSlideBoxDelegate, Main, $cordovaInAppBrowser, $ionicActionSheet, $timeout, Socialshare) {
  $scope.urls;

  $scope.allNews = Main.getProperty();
  if ($scope.allNews.length == 0) {
    Main.all().then(function(response) {
      $scope.allNews = response.data;
      $scope.allNews.source = response.data.source.replace(/-|\s/g, " ");
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

.controller('SelectedSourceCtrl', function($scope, $state, $ionicSlideBoxDelegate, Main, $cordovaAppVersion) {

  // var vm = this;
  //     $cordovaAppVersion.getVersionNumber().then(function(version) {
  //     $scope.appVersion = version;
  //   });

  $scope.isAuth = Main.getAll();


  Main.allSources().then(function(respone) {
    $scope.allSources = respone.data.sources;
    console.log($scope.allSources);
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

.controller('HomeCtrl', function($scope, $state, $ionicSlideBoxDelegate, Main, $cordovaAppVersion) {


  })
  .controller('AddCtrl', function($cordovaToast, $scope, $state, $ionicSlideBoxDelegate, Main, Users, $cordovaAppVersion, $cordovaCamera) {
    $scope.data = Main.getAll();
    var userId = $scope.data[0].id;
    $scope.newCard = {
      "createdBy": userId,
      "isPublished": true,
      "createdDate": "",
      "updatedDate": "",
      "category": null,
      "photoUri": null
    }

    $scope.takePicture = function() {
      var options = {
        quality: 60,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };
      $cordovaCamera.getPicture(options).then(function(imageData) {
        $scope.newCard.photoUri = "data:image/jpeg;base64," + imageData;

      }, function(err) {
        alert("Failed because: " + err);
        console.log('Failed because: ' + err);
      });

    };

    Users.fetchCategories().then(function(response) {
      $scope.listOfCategories = response;
    })

    $scope.getOption = function(object) {
      console.log(option.id);
      return option.id;
    }
    $scope.onSwipeRight = function() {
      $state.go('list-cards')
    }
    $scope.addNewCard = function() {
      $scope.newCard.categoryId = $scope.newCard.category.id;
      Users.addCard($scope.newCard).then(function(res) {
          $cordovaToast.showLongCenter(res.success[0].fieldName);
          $state.go('list-cards');
        }),
        function(response) {
          $cordovaToast.showLongCenter(response.errors[0].fieldName);

        }
    }

  })
  .controller('ListCtrl', function($cookies, $http, $scope, $state, Users, $ionicSlideBoxDelegate, Main, $cordovaAppVersion) {
    $scope.data = Main.getAll();
    var userId = $scope.data[0].id;
    Users.getAllUsers().then(function(res) {
      $scope.allUsers = res;
    }, function(response) {});

    Users.getAllCards(userId).then(function(res) {
      $scope.cardsList = res;
    })

    $scope.signout = function() {
       Main.remove($scope.data[0]);
      $state.go('sources');
    }

    $scope.onSwipeRight = function() {
      $state.go('add-card');
    }
    $scope.onSwipeLeft = function() {
      $state.go('sources');
    }

  })
  .controller('SignupCtrl', function(ENDPOINT, $cookies, Users, $timeout, $http, $scope, $state, $ionicSlideBoxDelegate, Main, $cordovaAppVersion, $cordovaCamera, $ionicPopup, $cordovaToast) {
    delete $http.defaults.headers.post['Content-Type'];
    $scope.userSignIn = {
      "username": "",
      "password": ""
    };
    $scope.newUser = {
      "profilePhotoUri": null,
      "isActive": true,
      "createdDate": new Date(),
      "updatedDate": new Date(),
      "type": "user"
    }
    $scope.takePicture = function() {
      var options = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 200,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };
      $cordovaCamera.getPicture(options).then(function(imageData) {
        $scope.newUser.profilePhotoUri = "data:image/jpeg;base64," + imageData;

      }, function(err) {
        alert("Failed because: " + err);
        console.log('Failed because: ' + err);
      });

    };

    $scope.submit = function() {
      if ($scope.newUser.password == $scope.newUser.confirmPassword && $scope.newUser.profilePhotoUri != null) {
        Users.createUser($scope.newUser).then(function(response) {
            $cordovaToast.showLongCenter(response.success[0].fieldName);
            $state.go('login');
          },
          function(res) {
            console.log(JSON.stringyfy(res));
            $cordovaToast.showLongCenter(res.errors[0].fieldName);
          })
      } else {
        if ($scope.newUser.profilePhotoUri == null)
          $cordovaToast.showLongCenter("Please Upload the Profile Picture.");
        else
          $cordovaToast.showLongCenter("Password and Confirm password is not same.");
      }
    }

    $scope.signIn = function() {
      Users.userSignin($scope.userSignIn).then(function(response) {
          // $cordovaToast.showLongCenter(response.success[0].fieldName);
          Main.add(response);
          $state.go('list-cards');
        },
        function(res) {
          $cordovaToast.showLongCenter(res.errors[0].fieldName);
        })

    }

  })
