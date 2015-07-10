(function () {
  angular.module('memryApp')
    .config(Config);

    Config.$inject = ['$stateProvider'];
    function Config($stateProvider){
      $stateProvider
        .state('tab.tags', {
          url: '/tags',
          views: {
            'tags': {
              templateUrl: function() {
                return 'js/modules/tag/views/' + window.templateMode + '/tags.html';
              },
              controller: 'TagsCtrl'
            }
          }
        })
    }
})();
