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
            'tab-new': {
              templateUrl: function(){
                return 'js/modules/entry/views/'+ window.templateMode +'/new.html';
              },
              controller: 'EntryListCtrl'
            }
          }
        })
        // Entries index page
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

    };

})();
