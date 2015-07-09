angular.module('memryApp.controllers', [])

.controller('EditCtrl', function($scope, $ionicModal) {

    // Load the modal from the given template URL
    $ionicModal.fromTemplateUrl('/js/modules/entry/views/mobile/edit.html', function($ionicModal) {
        $scope.modal = $ionicModal;
    }, {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope,
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
      });
})

// popover to edit and delete entries
.controller('PopoverCtrl', function($scope, $ionicPopover) {

  // .fromTemplateUrl() method
  $ionicPopover.fromTemplateUrl('my-popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });


  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });

})

.controller('ShareCtrl', function($scope, $ionicModal) {

    // Load the modal from the given template URL
    $ionicModal.fromTemplateUrl('/js/modules/entry/views/mobile/share.html', function($ionicModal) {
        $scope.modal = $ionicModal;
    }, {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope,
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
      });
})

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
