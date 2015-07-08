(function(){
  angular.module('memryApp')
    .controller('TagsCtrl', TagsCtrl);

    TagsCtrl.$inject = ['$state', '$scope', 'Tags'];
    function TagsCtrl($state, $scope, Tags){
      console.log('in tags ctrl');
      $scope.tags = Tags.all();
      $scope.remove = function(tag) {
        Tags.remove(tag);
      };
    };
})();
