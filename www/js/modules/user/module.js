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
    };
})();
