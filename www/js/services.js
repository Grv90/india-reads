angular.module('starter.services', [])

.factory('Main', function($http, $cookies, ENDPOINT, $localStorage) {
    $localStorage = $localStorage.$default({
      things: []
    });

    var property = [];
    return {
      all: function() {
        return $http({
          method: 'GET',
          url: 'https://newsapi.org/v1/articles?source=the-times-of-india&sortBy=top&apiKey=698e627cab5d4131942f20f7d6173791'
        });
      },
      allSources: function() {
        return $http({
          method: 'GET',
          url: 'https://newsapi.org/v1/sources'
        });
      },
      fetchSourceNews: function(src, type) {
        return $http({
          method: 'GET',
          url: ' https://newsapi.org/v1/articles?source=' + src + '&sortBy=' + type + '&apiKey=698e627cab5d4131942f20f7d6173791'
        });
      },
      getProperty: function() {
        return property;
      },
      add: function(thing) {
        $localStorage.things.push(thing);
      },
      getAll: function() {
        return $localStorage.things;
      },
      remove: function(thing) {
        $localStorage.things.splice($localStorage.things.indexOf(thing), 1);
      },
      setProperty: function(value) {
        property = value;
      },
      signedInUser: function() {
        if (!angular.isUndefined($cookies.get('SIGNED_IN_USER'))) {
          return true;
        }
      },
      get: function(chatId) {
        for (var i = 0; i < chats.length; i++) {
          if (chats[i].id === parseInt(chatId)) {
            return chats[i];
          }
        }
        return null;
      }
    };
  })
  .factory('Users', function($q, $http, ENDPOINT, $cordovaToast, $cookies) {

    var createUser = function(object) {
      var deferred = $q.defer();
      $http.post(ENDPOINT + '/users', object, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .success(function(data, status, headers, config) {
          return deferred.resolve(data);
        }).error(function(data, status, headers, config) {
          $cordovaToast.showLongCenter(data.errors[0].fieldName);
          return deferred.reject(data);
        });
      return deferred.promise;

    };
    var getAllUsers = function() {
      var deferred = $q.defer();
      $http.get(ENDPOINT + '/users').success(function(data, status, headers, config) {
        return deferred.resolve(data);
      }).error(function(data, status, headers, config) {
        return deferred.reject(data);
      });
      return deferred.promise;
    };

    var getAllCards = function(userId) {
      console.log(userId);
      var deferred = $q.defer();
      $http.get(ENDPOINT + '/cards/' + userId).success(function(data, status, headers, config) {
        return deferred.resolve(data);
      }).error(function(data, status, headers, config) {
        return deferred.reject(data);
      });
      return deferred.promise;
    };

    var addCard = function(card) {
      var deferred = $q.defer();
      $http.post(ENDPOINT + '/cards/add', card, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).success(function(data, status, headers, config) {
        return deferred.resolve(data);
      }).error(function(data, status, headers, config) {
        return deferred.reject(data);
      });
      return deferred.promise;
    };

    var fetchCategories = function() {
      var deferred = $q.defer();
      $http.get(ENDPOINT + '/categories').success(function(data, status, headers, config) {
        return deferred.resolve(data);
      }).error(function(data, status, headers, config) {
        return deferred.reject(data);
      });
      return deferred.promise;
    }
    var userSignin = function(user) {
      var deferred = $q.defer();
      $http.post(ENDPOINT + '/users/login', user, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).success(function(data, status, headers, config) {
        return deferred.resolve(data);
      }).error(function(data, status, headers, config) {
        return deferred.reject(data);
      });
      return deferred.promise;

    };
    return {
      fetchCategories: fetchCategories,
      addCard: addCard,
      getAllCards: getAllCards,
      userSignin: userSignin,
      getAllUsers: getAllUsers,
      createUser: createUser
    };
  });
