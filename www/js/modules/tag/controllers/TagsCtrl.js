(function(){
  angular.module('memryApp')
    .controller('TagsCtrl', TagsCtrl);

    TagsCtrl.$inject = ['$state', '$stateParams', '$scope', 'Tags'];
    function TagsCtrl($state, $stateParams, $scope, Tags){
      $scope.tags = Tags.all();
      $scope.selectedTab = 1;
      $scope.filteredTags;
      $scope.label = "Label";
      $scope.labelId = null;
      $scope.edit = false;

      $scope.filterTags = function(){

        if($stateParams.id)
        {  
          
          var filterResult = $scope.tags.filter(function(elem){
              return elem.id == $stateParams.id; 
            });
          $scope.filteredTags = filterResult[0].children;
          $scope.label = filterResult[0].name;
          $scope.labelId = filterResult[0].id;
        }
        else
        {
          $scope.filteredTags = $scope.tags;
        }
      };
      $scope.filterTags();


      $scope.remove = function(tag) {
        Tags.remove(tag);
      };

      $scope.edit = function(tag)
      {
          $scope.isEditing = true;
      };

      $scope.save = function()
      {
          
      };

      $scope.cancel = function()
      {
           $scope.isEditing = false;
      };

      $scope.editLabel =  function()
      {
        $scope.isEditing = true;
      }
      
      $scope.shouldShowDelete = false;
      $scope.listCanSwipe = true
      
      
    };
})();
