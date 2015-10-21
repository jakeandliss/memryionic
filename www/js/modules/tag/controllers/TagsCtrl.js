(function(){
  var fadeToggleDirective = function() {
    return {
      link: function(scope, element, attrs) {
        scope.$watch(attrs.uiFadeToggle, function(val, oldVal) {
          if(val === oldVal) return; 

          $(element).fadeOut(500, function(){ $(element).fadeIn(500)});
        });
      }
    }
  }

  angular.module('memryApp')
  .directive('uiFadeToggle', fadeToggleDirective)
  .controller('TagsCtrl', TagsCtrl);

  TagsCtrl.$inject = ['$state', '$stateParams','$ionicHistory','$ionicListDelegate', '$scope', '$timeout', '$modal', 'Tags'];
  function TagsCtrl($state, $stateParams,$ionicHistory,$ionicListDelegate, $scope,$timeout, $modal, Tags){
    $scope.tags = Tags.all();
    $scope.selectedTab = 1;
    $scope.filteredTags;
    $scope.selectedId=null;
    $scope.label = "Label";
    $scope.labelId = null;
    $scope.edit = false;
    $scope.showIt=false;
    $scope.selectedTag={};
    $scope.hasParentTag = false;
    $scope.parentTag={};
    $scope.showMenu = true;
    $scope.childLabel="";
    $scope.newTag={};
    $scope.isNew=false;
    $scope.filterTags = function(){

      if($stateParams.id)
      { 
        var filterResult = $scope.tags.filter(function(elem){
          return elem.id == $stateParams.id; 
        });
        if(filterResult.length){
          $scope.parentTag = filterResult[0];
          //$scope.selectedTag = filterResult[0];
          $scope.filteredTags = filterResult[0].children;
          $scope.childLabel = filterResult[0].name;
          $scope.label = "";
          $scope.labelId = filterResult[0].id;
          $scope.showBackButton=true;
        }else{
          $scope.childLabel="Go Back"
        }
      }
      else
      {

        $scope.filteredTags = $scope.tags;
      }
    };
    if ($stateParams.id){

      $scope.showIt=true;
    };
    $scope.filterTags();
     $scope.loadTags=function(query){
      var inputtags=[]
      var filterForInputTags=$scope.filteredTags.filter(function(elem){
        return elem.name.indexOf(query) > -1;
      })
      angular.forEach(filterForInputTags,function(obj){
        inputtags.push({text:obj.name,id:obj.id});
      })
      return inputtags;
    };

    $scope.getChildTags = function(id){
     $scope.showMenu = !$scope.showMenu;
     $timeout(function(){
      if(id>=0)
      {  
        $scope.hasParentTag = true;
        var filterResult = $scope.tags.filter(function(elem){
          return elem.id == id; 
        });
        $scope.filteredTags = filterResult[0].children;


      }
      else
      {
        $scope.hasParentTag = false;
        $scope.filteredTags = $scope.tags;


      }
    }, 500);
   };


   $scope.remove = function(tag) {
    Tags.remove(tag);
  };

  $scope.edit = function($event,tag)
  {
    $scope.selectedTag = {};
    $scope.selectedTag=angular.copy(tag);
    var test= angular.element($event.target).parent().parent().parent();
    $scope.selectedId=tag.id;
    $ionicListDelegate.closeOptionButtons();
    test.after(document.querySelector("#edit-tag"));
    $scope.isEditing = true;
  };

  $scope.save = function()
  {
    if($scope.selectedTag.name){
      angular.element(document.getElementsByClassName("checklist")).after(document.querySelector("#edit-tag"));
      Tags.update($scope.selectedTag);
      $scope.selectedTag={};
      $scope.selectedId=null;
    }
    $scope.isEditing = false;
  };

  $scope.cancel = function()
  {
    $scope.selectedId=null;
    $scope.isEditing = false;
 };

 $scope.editLabel =  function()
 {
    $scope.selectedTag = {};
    $scope.selectedTag=angular.copy($scope.parentTag);
    $scope.selectedId="";
    $scope.isEditing = true;
}

$scope.shouldShowDelete = false;    
$scope.listCanSwipe = true;   


$scope.showEditLabelPopUp = function(tag){
  $scope.selectedTag = {};
  $scope.selectedTag=angular.copy(tag);
  $scope.modalInstance = $modal.open({
    templateUrl: '/js/modules/tag/views/desktop/edit-tag.html',
    size:'sm',
    scope: $scope,

  });
};

$scope.closeModal = function(){
  $scope.modalInstance.dismiss('cancel');
};

$scope.saveTag = function(){
  //Todo :: add code for saving the data

  $scope.modalInstance.dismiss('cancel');
};
$scope.updateTag=function(){
  console.log($scope.selectedTag);
  Tags.update($scope.selectedTag);
  $scope.modalInstance.dismiss('cancel');
}
$scope.goBack=function(){
    $scope.showBackButton=false;
     window.history.back();
  };
$scope.addTag=function(){
  if($stateParams.id){
    $scope.newTag.ancestry=$stateParams.id;
  }
 $scope.modalInstance=$modal.open({
    templateUrl:'js/modules/tag/views/desktop/new-tag.html',
    size:'sm',
    scope:$scope,
  });
};
$scope.saveNewTag=function(){
  
  $scope.newTag.children=[];
  if($scope.newTag.ancestry){
    var filterForNewTags=$scope.tags.filter(function(elem){
      return elem.id==$scope.newTag.ancestry;
    });
    if(filterForNewTags[0].children){
      var length=filterForNewTags[0].children.length;
      if(length==0){
          $scope.newTag.id=$stateParams.id+1;
      }else{
          var lastID=filterForNewTags[0].children[length-1].id;
          $scope.newTag.id=lastID+1;
      }
    }else{
      filterForNewTags[0].children=[];
      $scope.newTag.id=$scope.newTag.ancestry+1;
      
    }
    // filterForNewTags[0].children.push($scope.newTag);
  }else{
      var length=$scope.tags.length;
      var lastID=$scope.tags[length-1].id;
      $scope.newTag.id=parseInt(lastID)+1;
      // $scope.tags.push($scope.newTag);
    }
    Tags.add($scope.newTag);
    $scope.modalInstance.dismiss('cancel');
    $scope.newTag={};
};
$scope.saveNewTagMobile=function(){
  if($scope.newTag.name){
    if($scope.newTag.ancestry){
    var filterForNewTags=$scope.tags.filter(function(elem){
      return elem.id==$scope.newTag.ancestry;
    });
    if(filterForNewTags[0].children){
      var length=filterForNewTags[0].children.length;
      if(length==0){
          $scope.newTag.id=$stateParams.id+1;
      }else{
          var lastID=filterForNewTags[0].children[length-1].id;
          $scope.newTag.id=lastID+1;
      }
    }else{
      filterForNewTags[0].children=[];
      $scope.newTag.id=$scope.newTag.ancestry+1;
      
    }
    // filterForNewTags[0].children.push($scope.newTag);
  }else{
      var length=$scope.tags.length;
      var lastID=$scope.tags[length-1].id;
      $scope.newTag.id=parseInt(lastID)+1;
      // $scope.tags.push($scope.newTag);
    }
    Tags.add($scope.newTag);
    $scope.newTag={};
    $scope.filterTags();
  }
  $scope.isNew=false;

};
$scope.newLabel=function(){
  if($stateParams.id){
    $scope.newTag.ancestry=$stateParams.id;
  }
  $scope.isNew = true;
};

$scope.cancelnewTag=function(){
  $scope.isNew=false;
};
};
})();


