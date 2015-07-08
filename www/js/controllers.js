angular.module('memryApp.controllers', [])

.controller('EntriesCtrl', function($scope, Entries, $ionicModal, $mdBottomSheet) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.entry = {};

  // Add Entry
  $scope.entry.add = function(entry) {
    $scope.entries.push($scope.entry);
    $scope.entry = '';
  };

  // Edit Entry
  $scope.entries = Entries.all();
  $scope.edit = function(entry) {
    Entries.remove(entry);
  };

  // Update Entry
  $scope.update = function(entry) {
    Entries.update(entry);
  };

  // Remove Entry
  $scope.remove = function(entry) {
    Entries.remove(entry);
  };

  $scope.entry.date = new Date();

  // This modal should only be used for mobile.
  $ionicModal.fromTemplateUrl('/templates/entries/mobile/new.html', function($ionicModal) {
      $scope.modal = $ionicModal;
  }, {
      // Use our scope for the scope of the modal to keep it simple
      scope: $scope,
      // The animation we want to use for the modal entrance
      animation: 'slide-in-up'
    });

    $scope.showGridBottomSheet = function($event) {
    $scope.alert = '';
    $mdBottomSheet.show({
      templateUrl: '/templates/entries/desktop/bottom-sheet.html',
      controller: 'GridBottomSheetCtrl',
      targetEvent: $event
    }).then(function(clickedItem) {
      $scope.alert = clickedItem.name + ' clicked!';
    });
  };
})

.controller('GridBottomSheetCtrl', function($scope, $mdBottomSheet) {
  $scope.items = [
    { name: 'Hangout', icon: 'hangout' },
    { name: 'Mail', icon: 'mail' },
    { name: 'Message', icon: 'message' },
    { name: 'Copy', icon: 'copy2' },
    { name: 'Facebook', icon: 'facebook' },
    { name: 'Twitter', icon: 'twitter' },
  ];
  $scope.listItemClick = function($index) {
    var clickedItem = $scope.items[$index];
    $mdBottomSheet.hide(clickedItem);
  };
})

.controller('EditCtrl', function($scope, $ionicModal) {

    // Load the modal from the given template URL
    $ionicModal.fromTemplateUrl('/templates/entries/mobile/edit.html', function($ionicModal) {
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
    $ionicModal.fromTemplateUrl('/templates/entries/mobile/share.html', function($ionicModal) {
        $scope.modal = $ionicModal;
    }, {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope,
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
      });
})

.controller('TagsCtrl', function($scope, Tags) {
  $scope.tags = Tags.all();
  $scope.remove = function(tag) {
    Tags.remove(tag);
  };
})

.controller('UserCtrl', function($scope) {
  $scope.user = {
    first_name: "Jake",
    last_name: "Thompson",
    email: "test@gmail.com"
  }
  // $scope.user.addUser
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
