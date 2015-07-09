// controllers not part of any module go in this file
angular.module('memryApp.controllers', [])

// Controller for switching between tabs
.controller('PanelCtrl', function($scope) {
  $scope.tab = 1;

  this.selectTab = function(setTab) {
    $scope.tab = setTab;
  }

  this.isSelected = function(checkTab) {
    return $scope.tab === checkTab;
  }
})
