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
          }
        })
        // user new state
        .state('user.new', {
          url: '/new',
          templateUrl: function(){
            return 'js/modules/user/views/' + window.templateMode + '/new.html';
          },
          controller: 'UserCtrl'
        })
        // user profile
        .state('tab.profile', {
          url: '/profile',
          views: {
            'tab-profile': {
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

    };
})();
