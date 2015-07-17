// User module config file

(function(){
  angular.module('memryApp')
    .config(Config);

    Config.$inject = ['$stateProvider'];
    function Config($stateProvider){
      $stateProvider
        .state('user', {
          url: '/user',
          abstract: true,
          templateUrl: function(){
            return 'js/modules/user/views/' + window.templateMode + '/user.html';
          },
          controller: 'UserCtrl'
        })
        // user new state
        .state('user.new', {
          url: '/new',
          views: {
            'user-new': {
              templateUrl: function(){
                return 'js/modules/user/views/' + window.templateMode + '/new.html';
              },
              controller: 'UserCtrl'
            }
          }
        })

        .state('user.login', {
          url: '/login',
          views: {
            'user-login': {
              templateUrl: function() {
                return 'js/modules/user/views/' + window.templateMode + '/login.html';
              },
              controller: 'UserCtrl'
            }
          }
        })

        .state('user.forgot-password', {
          url: '/forgot-password',
          views: {
            'forgot-password': {
              templateUrl: function(){
                return 'js/modules/user/views/' + window.templateMode + '/new_password.html';
              },
              controller: 'UserCtrl'
            }
          }
        })

        // user profile
        .state('tab.profile', {
          url: '/profile',
          views: {
            'profile': {
              templateUrl: function(){
                return 'js/modules/user/views/' + window.templateMode + '/profile.html';
              },
              controller: 'UserCtrl'
            }
          }
        })
        // edit a user profile
        .state('userEdit', {
          url: '/user/edit',

          templateUrl: function(){
            return 'js/modules/user/views/' + window.templateMode + '/edit.html';
          },
          controller: 'UserCtrl'
        })
        // update password
        .state('user.update-password', {
          url: '/update-password',
          views: {
            'update-password': {
              templateUrl: function(){
                return 'js/modules/user/views/' + window.templateMode + '/update_password.html';
              },
              controller: 'UserCtrl'
            }
          }
        })
    };
})();
