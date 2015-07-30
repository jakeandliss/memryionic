(function(){
  angular.module('memryApp')
    .controller('PanelCtrl', PanelCtrl);

    PanelCtrl.$inject = ['$scope'];
    function PanelCtrl($scope) {
      $scope.tab = 1;

      this.selectTab = function(setTab) {
        $scope.tab = setTab;
      }

      this.isSelected = function(checkTab) {
        return $scope.tab === checkTab;
      }
    };
})();
