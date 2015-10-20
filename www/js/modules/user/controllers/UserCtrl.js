(function() {
  angular.module('memryApp')
    .controller('UserCtrl', UserCtrl);

    UserCtrl.$inject = ['$state', '$scope', '$mdDialog','UserService'];
    function UserCtrl($state, $scope, $mdDialog,UserService){
      $scope.user = {
        first_name: "Jake",
        last_name: "Thompson",
        email: "test@gmail.com",
        avatar: "https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png"
      };
      $scope.newUser={}
      $scope.isSubmit=false;
      $scope.messages=[];
      $scope.showErrorMessage=false;
      $scope.showSuccessMessage=false;
      $scope.showDialog = function(ev) {
        $mdDialog.show({
          templateUrl: 'forgot-password-dialog.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          controller: 'UserCtrl'
        })
      };

      $scope.closeDialog = function() {
          $mdDialog.hide();
      }
      $scope.createAccount=function(){
        $scope.message="";
          UserService.createAccount($scope.newUser).success(function(responce){
            $scope.showSuccessMessage=true;
            console.log(responce)
          }).error(function(responce){
            $scope.showErrorMessage=true;
            console.log(responce.message.errors)
            $scope.messages=responce.message.errors;
          })
      }
    };
})();
