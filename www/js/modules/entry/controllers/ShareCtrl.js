(function(){
  angular.module('memryApp')
    .controller('ShareCtrl', ShareCtrl);

    ShareCtrl.$inject = ['$scope'];
    function ShareCtrl($scope){
      // Load the modal from the given template URL
      // $ionicModal.fromTemplateUrl('/js/modules/entry/views/mobile/share.html', function($ionicModal) {
      //     $scope.modal = $ionicModal;
      // }, {
      //     // Use our scope for the scope of the modal to keep it simple
      //     scope: $scope,
      //     // The animation we want to use for the modal entrance
      //     animation: 'slide-in-up'
      // });
    }
})();
