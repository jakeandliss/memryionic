(function () {
  angular.module('memryApp')
    .config(Config);

    Config.$inject = ['$stateProvider'];
    function Config($stateProvider){
      $stateProvider
        .state('app.tags', {
          url: '/tags/:id',
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
