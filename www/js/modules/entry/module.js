(function(){
  angular.module('memryApp')
    .config(Config);

    Config.$inject = ['$stateProvider'];
    function Config($stateProvider){
      $stateProvider
        // Create new entry
        .state('tab.new', {
          url: '/new',
          views: {
            'new': {
              templateUrl: function(){
                return 'js/modules/entry/views/'+ window.templateMode +'/new.html';
              },
              controller: 'EntriesCtrl'
            }
          }
        })
        // Entries index page
        .state('tab.entries', {
            url: '/entries',
            views: {
              'entries': {
                templateUrl: function(){
                  return 'js/modules/entry/views/' + window.templateMode + '/index.html';
                },
                controller: 'EntriesCtrl as entries'
              }
            }
          })
    };

})();
