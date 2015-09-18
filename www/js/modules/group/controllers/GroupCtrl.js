(function(){
	 angular.module('memryApp')

      .controller('GroupCtrl', GroupCtrl);

      GroupCtrl.$inject=['$scope','$stateParams','GroupServices','$modal','UserService','$ionicHistory','$ionicListDelegate','$ionicPopup'];
      function GroupCtrl($scope,$stateParams,GroupServices,$modal,UserService,$ionicHistory,$ionicListDelegate,$ionicPopup){
      	$scope.GroupList=[];
      	$scope.GroupList=GroupServices.all();
      	$scope.showGroupDetail=false;
      	$scope.modalInstance={};
        $scope.group={};
      	$scope.user={};
        var newUserEmails=[];
        $scope.isNew=false;
        $scope.isEditing = false;
        $scope.selectedId=null;
        $scope.isNewUserMobile=false;
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
        $scope.newGroup=function(){
          var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: '/js/modules/group/views/desktop/new.html',
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
        $scope.AddMobileUser=function(){
          GroupServices.SaveUser($stateParams.id,$scope.user);
          $scope.user={};
          $scope.isNewUserMobile=false;
        }
      	$scope.fillUser=function(){
      		var returnUser=UserService.getUser($scope.user.email);
      		if(returnUser.length){
      			$scope.user=returnUser[0];
      		}else{
            newUserEmails.push($scope.user.email);
          }
      	}
        $scope.AddGroup=function(){
          $scope.group.users=[];
          GroupServices.add($scope.group);
          GroupServices.modalInstance.dismiss('cancel');
        }
        $scope.AddMobileGroup=function(){
           $scope.group.users=[];
          GroupServices.add($scope.group);
          $scope.isNew=false; 
          $scope.group={}
        }
        $scope.newMobileGroup=function(){
          $scope.isNew=true;    
        }
        $scope.cancelNewGroup=function(){
          $scope.isNew=false; 
          $scope.isNewUserMobile=false;
        }
        $scope.selectedGroup=GroupServices.selectedGroup;
        $scope.showEditgGroupPopUp=function(group){
          GroupServices.selectedGroup=angular.copy(group);
           var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: '/js/modules/group/views/desktop/edit.html',
            controller:'GroupCtrl',
            size: 'sm',
            animation: true
          })
          GroupServices.modalInstance=modalInstance;
        }
        $scope.updateGroup=function(){
          GroupServices.update($scope.selectedGroup);
          $scope.selectedGroup={};
          GroupServices.selectedGroup={};
          GroupServices.modalInstance.dismiss('cancel');
        }
        $scope.updateMobileGroup=function(){
          angular.element(document.querySelector("#group-list")).after(document.querySelector("#edit-group"));
          $scope.isEditing=false;
          GroupServices.update($scope.selectedGroup);
          $scope.selectedGroup={};
        }
        $scope.editMobile=function($event,group){
          $scope.selectedGroup=angular.copy(group);
          var selectedList= angular.element($event.target).parent().parent().parent();
          selectedList.after(document.querySelector("#edit-group"));
          $scope.selectedId=group.id;
          $ionicListDelegate.closeOptionButtons();
          $scope.isEditing = true;
        }
        $scope.cancel=function(){
          $scope.selectedId=null;
          $scope.selectedGroup={};
          $scope.isEditing = false;
        }
        $scope.showNewUserForm=function(){
          $scope.isNewUserMobile=true;
        }
        $scope.deleteMobile=function(group){
          var confirmPopup = $ionicPopup.confirm({
             title: 'Delete Group',
             template: 'Are you sure you want to Delete '+group.name+' Group?'
           });
           confirmPopup.then(function(result) {
             if(result) {
               GroupServices.delete(group);
             } else{
              $ionicListDelegate.closeOptionButtons();
             }
            });
         }
      }
})()