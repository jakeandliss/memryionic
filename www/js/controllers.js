angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

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

.controller('EntryDetailCtrl', function($scope, $stateParams, Entries) {
  $scope.entry = Entries.get($stateParams.EntryId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
