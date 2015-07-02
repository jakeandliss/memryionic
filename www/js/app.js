// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.new', {
    url: '/new',
    views: {
      'tab-new': {
        templateUrl: 'templates/entries/new.html',
        controller: 'EntriesCtrl'
      }
    }
  })

  .state('tab.entries', {
      url: '/entries',
      views: {
        'tab-entries': {
          templateUrl: 'templates/tab-entries.html',
          controller: 'EntriesCtrl'
        }
      }
    })

  .state('tab.profile', {
    url: '/profile',
    views: {
      'tab-profile': {
        templateUrl: 'templates/tab-profile.html',
        controller: 'UserCtrl'
      }
    }
  })

  .state('tab.tags', {
    url: '/tags',
    views: {
      'tab-tags': {
        templateUrl: 'templates/tab-tags.html',
        controller: 'TagsCtrl'
      }
    }
  })

  // Create a state for the 'users' directive
    .state('user', {
    url: "/user",
    abstract: true,
    templateUrl: "templates/user/user.html"
  })

  .state('user.new', {
    url: '/new',
    views: {
      'new': {
        templateUrl: 'templates/user/new.html',
        controller: 'UserCtrl'
      }
    }
  })

  .state('user.forgot-password', {
    url: '/forgot-password',
    views: {
      'forgot-password': {
        templateUrl: 'templates/user/passwords/new.html',
        controller: 'UserCtrl'
      }
    }
  })

  .state('edit', {
    url: '/user/edit',
    templateUrl: 'templates/user/edit.html',
    controller: 'UserCtrl'
  })

  .state('update-password', {
    url: '/user/update-password',
    templateUrl: 'templates/user/passwords/edit.html',
    controller: 'UserCtrl'
  })


  .state('user.login', {
    url: '/login',
    views: {
      'login': {
        templateUrl: 'templates/user/sessions/new.html',
        controller: 'UserCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/entries');

})


.config(function ($ionicConfigProvider) {

  // place nav bar on bottom for all devices
  $ionicConfigProvider.tabs.position("bottom");
});
