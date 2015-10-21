(function(){
  angular.module('memryApp')
    .controller('PanelCtrl', PanelCtrl);

    PanelCtrl.$inject = ['$scope'];
    function PanelCtrl($scope) {

      $scope.tab = 1;
      $scope.selectTab = function(setTab) {
        $scope.tab = setTab;
      };
      $scope.isSelected = function(checkTab) {
        return $scope.tab === checkTab;
      };
      $scope.ResourceList=[];
      $scope.CreateResourceTypeList=function (resources){
        angular.forEach(resources,function(obj){
            if(obj.attachment_content_type=="image"||obj.attachment_content_type=="video"){
              $scope.ResourceList.push({type:"Visual"});
            }else if(obj.attachment_content_type=="pdf"){
              $scope.ResourceList.push({type:"Files"});
            }else{
               $scope.ResourceList.push({type:"Audio"});
            }
          })
        $scope.ResourceList=removeDuplicate($scope.ResourceList);
      }
      function removeDuplicate(list){
        var newList = [], 
        b = 0; 
        id=1;
        for ( i = 0; i < list.length; i++ ) {
        var current = list[i]; 
        current.id=id;
        for ( j = 0; j < newList.length; j++ ) { 
          if ( current.type != newList[j].type ) {
                b++; 
            }
        }
        if ( b == newList.length ) {
            newList.push(current); 
            id++;
        }
        b = 0;
        }
        list.length = 0; 
        for ( i = 0; i < newList.length; i++ ) {
            list.push( newList[i] ); 
        }
        return list;
      }
    };
})();
