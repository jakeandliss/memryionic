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
  'ui.bootstrap',
  'yaru22.angular-timeago',
  'bootstrapLightbox',
  'ngAudio',
  'readMore',
  'ngTagsInput',
  'infinite-scroll',
  'ngCookies'
])

.run(function ($ionicPlatform, $rootScope, deviceDetector,$cookieStore,$state) {
    $ionicPlatform.ready(function () {
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
    // $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams){
    //   var isLoggedin=false;
    //   var Token=$cookieStore.get('memryionic');
    //   console.log(Token)
    //   if(Token){
    //     isLoggedin=true;
    //   }
    //   var name=toState.name.substr(toState.name.indexOf('.')+1);
    //   var checkCredential=true;
    //   if(name=='login'||name=='new'||name=="forgot-password"){
    //     checkCredential=false;
    //   }
    //   if(!isLoggedin&&checkCredential){
    //     event.preventDefault();
    //     $state.go('user.login')
    //   }
    //   // else if(isLoggedin==true&&!checkCredential){
    //   //   event.preventDefault();
    //   //   $state.go('app.entries')
    //   // }
    // })
})

.config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider) {
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js


  $mdThemingProvider.theme('default')
    .primaryPalette('grey')
    .accentPalette('grey')



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
.config(function ( LightboxProvider) {
    LightboxProvider.isVideo = function (image) {
        if (image.type === 'video') {
            return true;
        }
        return false;
    };
    LightboxProvider.templateUrl = 'js/modules/entry/views/desktop/lightBox-image.html';
    LightboxProvider.getImageUrl = function (image) {
        return image.url;
    };


})
.config(function($sceDelegateProvider) {
      $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain.  Notice the difference between * and **.
        'http://techslides.com/**'
      ]);
    })
.config(function ($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position("bottom");
})
.filter('hashtags',['$filter', '$sce',
    function($filter, $sce) {
        return function(text, target) {
            if (!text) return text;

            var replacedText = $filter('linky')(text, target);
            var targetAttr = "";
            if (angular.isDefined(target)) {
                targetAttr = ' target="' + target + '"';
            }
            // replace #hashtags and send them to twitter
            var replacePattern1 = /(^|\s)#(\w*[a-zA-Z_]+\w*)/gim;
            replacedText = text.replace(replacePattern1, '$1<a href="/entries/search?q=%23$2"' + targetAttr + '>#$2</a>');
            // replace @mentions but keep them to our site
            // var replacePattern2 = /(^|\s)\@(\w*[a-zA-Z_]+\w*)/gim;
            // replacedText = replacedText.replace(replacePattern2, '$1<a href="/entries/$2"' + targetAttr + '>@$2</a>');
            $sce.trustAsHtml(replacedText);
            return replacedText;
        };
    }
]);
