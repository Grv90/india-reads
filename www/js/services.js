angular.module('starter.services', [])

.factory('Main', function($http, $cookies) {
  var SIGNED_IN_USER = 'signed_in_user';


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
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    getProperty: function() {
      return property;
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
});
