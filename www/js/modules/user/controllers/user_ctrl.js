(function() {
  angular.module('memryApp')
    .controller('UserCtrl', UserCtrl);

    UserCtrl.$inject = ['$state', '$scope'];
    function UserCtrl($state, $scope){
      console.log('in user controller');
      $scope.user = {
        first_name: "Jake",
        last_name: "Thompson",
        email: "test@gmail.com"
      };
    };
})();
