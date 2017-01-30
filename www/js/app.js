// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'angular-loading-bar', '720kb.socialshare', 'ngCordova', 'ngCookies', 'starter.config', 'ngResource', 'ion-floating-menu','ngStorage','ionic-modal-select'])

.run(function($ionicPlatform, $rootScope, $cookies, $cordovaAppVersion) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)


    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });


  $rootScope.$on('$stateChangeStart', function($state, Main) {
    if (angular.isUndefined($cookies.get('SIGNED_IN_USER'))) {
      $state.go('home');
    }
  })

})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  delete $httpProvider.defaults.headers.common['X-Requested-With'];

  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {}

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.intro', {
      url: '/intro',
      views: {
        'tab-dash': {
          templateUrl: 'templates/intro.html',
          controller: 'IntroCtrl'
        }
      },
      onEnter: function($state, Main) {
        if (Main.signedInUser() == true) {
          $state.go('content');
        }
      }
    })
    .state('content', {
      url: '/content',
      templateUrl: 'templates/content.html',
      controller: 'ContentCtrl',
      cache: false
    })
    .state('home', {
      url: '/home',
      templateUrl: 'templates/home.html',
      controller: 'HomeCtrl',
      cache: false
    }).state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'SignupCtrl',
      cache: false
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: 'SignupCtrl',
      cache: false
    })
    .state('list-cards', {
      url: '/list',
      templateUrl: 'templates/list-cards.html',
      controller: 'ListCtrl',
      cache: false
    })
    .state('add-card', {
      url: '/add',
      templateUrl: 'templates/add-new-card.html',
      controller: 'AddCtrl',
      cache: false
    })
    .state('sources', {
      url: '/sources',
      templateUrl: 'templates/sources.html',
      controller: 'SelectedSourceCtrl'
    })
    // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/intro');

});
