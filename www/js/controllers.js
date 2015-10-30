// controllers not part of any module go in this file
angular.module('memryApp.controllers', [])

.controller('ProfilePanelCtrl', ProfilePanelCtrl);
ProfilePanelCtrl.$inject = ['$scope'];
function ProfilePanelCtrl($scope) {
  $scope.tab = 1;
  this.selectTab = function(setTab) {
    $scope.tab = setTab;
  }
  this.isSelected = function(checkTab) {
    return $scope.tab === checkTab;
  }
};
