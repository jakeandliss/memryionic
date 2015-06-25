angular.module('starter.controllers', [])

.controller('EntriesCtrl', function($scope, Entries) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.entries = Entries.all();
  $scope.remove = function(entry) {
    Entries.remove(entry);
  };
})

.controller('NewCtrl', function($scope) {
  $scope.entry = {};

  $scope.add = function(entry) {
    $scope.entries.push($scope.entry);
    $scope.entry = '';
  }
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

.controller('TagsCtrl', function($scope, Tags) {
  $scope.tags = Tags.all();
  $scope.remove = function(tag) {
    Tags.remove(tag);
  };
})

.controller('UserCtrl', function($scope) {})
//   $scope.user =  {
//     id: "",
//     first_name: "Jake",
//     last_name: "Thompson",
//     email = [
//       { email: "jaketest@gmail.com" },
//       { email: "jaketest@gmail.com" }
//     ],
//     password: "",
//     password_confirmation: "",
//     avatar: "img/ionic.png"
// })

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
