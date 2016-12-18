angular.module('starter.services', [])

.factory('Main', function($http) {

   var property = [];
  // Might use a resource here that returns a JSON array
  //
  // // Some fake testing data
  // var chats = [{
  //   id: 0,
  //   name: 'Ben Sparrow',
  //   lastText: 'You on your way?',
  //   face: 'img/ben.png'
  // }, {
  //   id: 1,
  //   name: 'Max Lynx',
  //   lastText: 'Hey, it\'s me',
  //   face: 'img/max.png'
  // }, {
  //   id: 2,
  //   name: 'Adam Bradleyson',
  //   lastText: 'I should buy a boat',
  //   face: 'img/adam.jpg'
  // }, {
  //   id: 3,
  //   name: 'Perry Governor',
  //   lastText: 'Look at my mukluks!',
  //   face: 'img/perry.png'
  // }, {
  //   id: 4,
  //   name: 'Mike Harrington',
  //   lastText: 'This is wicked good ice cream.',
  //   face: 'img/mike.png'
  // }];

  return {
    all: function() {
      return $http({
        method: 'GET',
        url: 'https://newsapi.org/v1/articles?source=bloomberg&sortBy=top&apiKey=698e627cab5d4131942f20f7d6173791'
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
