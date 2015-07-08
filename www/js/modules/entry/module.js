(function(){
  angular.module('memryApp')
    .config(Config);

    Config.$inject = ['$stateProvider'];
    function Config($stateProvider){
      $stateProvider
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
    };

})();
