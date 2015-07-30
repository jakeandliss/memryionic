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
  'reTree', // dependency of deviceDetector
  'ng.deviceDetector',
  "ngSanitize",
  'ui.bootstrap',
  'ionic-audio',
  'ngCordova',
  "slickCarousel",
  'ui.bootstrap'
])

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

  if (deviceDetector) {
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



  $mdThemingProvider.definePalette('strawberry', {"50":"#fcf4f2","100":"#f6ddd7","200":"#f0c7bc","300":"#eab4a6","400":"#e5a18f","500":"#e08e79","600":"#c47c6a","700":"#a86b5b","800":"#8c594c","900":"#70473d","A100":"#f6ddd7","A200":"#f0c7bc","A400":"#e5a18f","A700":"#a86b5b",
    'contrastDefaultColor': 'light',    // whether, by default, text (contrast) on this palette should be dark or light
    'contrastDarkColors': ['50', '100', '200', '300', '400', 'A100'], //hues which contrast should be 'dark' by default
  });
  $mdThemingProvider.definePalette('calm', {"50":"#f9fcfc","100":"#eef6f5","200":"#e2f0ee","300":"#d8eae8","400":"#cfe5e2","500":"#c5e0dc","600":"#acc4c1","700":"#94a8a5","800":"#7b8c8a","900":"#63706e","A100":"#eef6f5","A200":"#e2f0ee","A400":"#cfe5e2","A700":"#94a8a5",
    'contrastDefaultColor': 'light',
    'contrastDarkColors': ['50', '100', '200', '300', '400', '500', 'A100'],
  });

  $mdThemingProvider.theme('default')
    .primaryPalette('strawberry')
    .accentPalette('calm', {
    'default': '500',
    });

  $stateProvider
  // setup an abstract state for the tabs directive
    .state('app', {
    url: "",
    abstract: true,
    // default.html is the file responsible for layout of
    // ionic or desktop views
    templateUrl: "app.html"
      // Later this state will implement a resolve for AuthService
      // So it is left in the app.js
  });

  $urlRouterProvider.otherwise('/entries');
})

.config(function($ionicConfigProvider) {
  $ionicConfigProvider.tabs.position("bottom");
});
