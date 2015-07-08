// MemryApp

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'memryApp' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'memryApp.services' is found in services.js
// 'memryApp.controllers' is found in controllers.js
angular.module('memryApp', [
  'ionic',
  'memryApp.controllers',
  'memryApp.services',
  'ngMaterial',
  'reTree',                 // dependency of deviceDetector
  'ng.deviceDetector']
)

.run(function($ionicPlatform, $rootScope, deviceDetector) {
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

  if(deviceDetector){
    var isDesktopOrTablet;
      /*
       * detects memry platform is desktop or tablet for loading related templates
       * rootScope.isDesktopOrTablet object is used for loading desktop view in index.html
       * window object is used for loaing desktop view templates in modules wise
       */
      isDesktopOrTablet = (deviceDetector.isDesktop() || deviceDetector.isTablet());
      console.log('Browser or tablet', isDesktopOrTablet);
      if (isDesktopOrTablet) {
        window.templateMode = "desktop";
      } else {
        window.templateMode = "mobile";
      }
      window.isDesktopOrTablet = isDesktopOrTablet;
      $rootScope.isDesktopOrTablet = isDesktopOrTablet;
  }
})

.config(function($stateProvider, $urlRouterProvider, $mdThemingProvider) {
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

  $mdThemingProvider.theme('default')
    .primaryPalette('light-blue')
    .accentPalette('deep-orange');

  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "",
    abstract: true,
    // default.html is the file responsible for layout of
    // ionic or desktop views
    templateUrl: "templates/default.html"
  })

  // Each tab has its own nav history stack:
  .state('tab.new', {
    url: '/new',
    views: {
      'tab-new': {
        templateUrl: function(){
          return 'templates/entries/'+ window.templateMode +'/new.html';
        },
        controller: 'EntriesCtrl'
      }
    }
  })

  .state('tab.entries', {
      url: '/entries',
      views: {
        'tab-entries': {
          templateUrl: function(){
            return 'templates/entries/' + window.templateMode + '/index.html';
          },
          controller: 'EntriesCtrl'
        }
      }
    })

  .state('tab.profile', {
    url: '/profile',
    views: {
      'tab-profile': {
        templateUrl: function(){
          return 'templates/user/' + window.templateMode + '/profile.html';
        },
        controller: 'UserCtrl'
      }
    }
  })

  .state('tab.tags', {
    url: '/tags',
    views: {
      'tab-tags': {
        templateUrl: function(){
          return 'templates/user/' + window.templateMode + '/tags.html';
        },
        controller: 'TagsCtrl'
      }
    }
  })

  // Create a state for the 'users' directive
    .state('user', {
    url: "/user",
    abstract: true,
    templateUrl: function(){
      return 'templates/user/' + window.templateMode + '/user.html'
    }
  })

  .state('user.new', {
    url: '/new',
    templateUrl: function(){
      return 'templates/user/' + window.templateMode + '/new.html';
    },
    controller: 'UserCtrl'
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
    templateUrl: function() {
      return 'templates/user/' + window.templateMode + '/login.html';
    },
    controller: 'UserCtrl'
  });

  $urlRouterProvider.otherwise('/entries');
})

.config(function ($ionicConfigProvider) {
  $ionicConfigProvider.tabs.position("bottom");
});
