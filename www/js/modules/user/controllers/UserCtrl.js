(function() {
  angular.module('memryApp')
    .controller('UserCtrl', UserCtrl);

    UserCtrl.$inject = ['$state', '$scope', '$mdDialog'];
    function UserCtrl($state, $scope, $mdDialog){
      $scope.user = {
        first_name: "Jake",
        last_name: "Thompson",
        email: "test@gmail.com"
      };

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
    };
})();
