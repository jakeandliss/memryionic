(function(){
	 angular.module('memryApp')

      .controller('GroupCtrl', GroupCtrl);

      GroupCtrl.$inject=['$scope','$stateParams','GroupServices','$modal','UserService'];
      function GroupCtrl($scope,$stateParams,GroupServices,$modal,UserService){
      	$scope.GroupList=[];
      	$scope.GroupList=GroupServices.all();
      	$scope.showGroupDetail=false;
      	$scope.modalInstance={};
      	$scope.user={};
      	if($stateParams.id){
      		$scope.showGroupDetail=true;
      		var selectGroup=GroupServices.getGroup($stateParams.id);
      		if(selectGroup.length){
      			$scope.selectGroup=selectGroup[0]
      		}
      	}else{
      		$scope.showGroupDetail=false;
      	}
      	$scope.removeUser=function(id,user){
      		GroupServices.removeUser(id,user);
      	}
      	$scope.addMember=function(){
      		var modalInstance = $modal.open({
	          animation: $scope.animationsEnabled,
	          templateUrl: '/js/modules/group/views/desktop/addUser.html',
	          controller:'GroupCtrl',
	          size: 'md',
	          animation: true
	        })
	        GroupServices.modalInstance=modalInstance;
      	}
      	$scope.closeModal=function(){
      		GroupServices.modalInstance.dismiss('cancel');
      	}
      	$scope.AddUser=function(){
      		GroupServices.SaveUser($stateParams.id,$scope.user);
      		GroupServices.modalInstance.dismiss('cancel');
      	}
      	$scope.fillUser=function(){
      		var returnUser=UserService.getUser($scope.user.email);
      		if(returnUser.length){
      			$scope.user=returnUser[0];
      		}
      	}
      }
})()