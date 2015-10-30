(function() {
  angular.module('memryApp')
    .controller('UserCtrl', UserCtrl);

    UserCtrl.$inject = ['$state', '$scope', '$mdDialog','UserService','$cookieStore'];
    function UserCtrl($state, $scope, $mdDialog,UserService,$cookieStore){
      $scope.user = {
        first_name: "Jake",
        last_name: "Thompson",
        email: "test@gmail.com",
        avatar: "https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png"
      };
      $scope.newUser={}
      $scope.loginUser={};
      $scope.isSubmit=false;
      $scope.messages=[];
      $scope.showErrorMessage=false;
      $scope.showSuccessMessage=false;
      //check user detail on client matchine is user is already login
      var _user=$cookieStore.get('memryionic');
      if(_user){
        $scope.user=_user;
      }

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
      };
      //for register new user
      $scope.createAccount=function(){
        $scope.messages=[];
        $scope.showErrorMessage=false;
        $scope.showSuccessMessage=false;
          UserService.createAccount($scope.newUser).success(function(response){
            $scope.showSuccessMessage=true;
            $scope.newUser={}
            console.log(response)
          }).error(function(response){
            alert(response)
            if(response){
              $scope.showErrorMessage=true;
              $scope.messages=response.message.errors;
            }
          })
      };
      //for login
      $scope.login=function(){
        UserService.login($scope.loginUser).success(function(response){
          $scope.user=response;
          $cookieStore.put('memryionic',response)
          $state.go('app.entries');
        }).error(function(response){
            alert(response);
        })
      };
      //for logout
      $scope.logout=function(){
        $cookieStore.remove('memryionic');
        $state.go('user.login');
      }
    };
})();
