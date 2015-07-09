(function(){
  angular.module('memryApp')
    .controller('TagsCtrl', TagsCtrl);

    TagsCtrl.$inject = ['$state', '$scope', 'Tags'];
    function TagsCtrl($state, $scope, Tags){

      $scope.tags = Tags.all();
      $scope.remove = function(tag) {
        Tags.remove(tag);
      };
    };
})();
