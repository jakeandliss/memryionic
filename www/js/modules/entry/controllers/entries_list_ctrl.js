(function(){
  'use strict';

  angular.module('memryApp')
    .controller('EntryListCtrl', EntryListCtrl);

    EntryListCtrl.$inject = ['$scope', 'Entries', '$ionicModal', '$mdBottomSheet'];
    function EntryListCtrl($scope, Entries, $ionicModal, $mdBottomSheet ){
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
      $ionicModal.fromTemplateUrl('/js/modules/entry/views/mobile/new.html', function($ionicModal) {
          $scope.modal = $ionicModal;
      }, {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope,
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
      });


      $scope.items = [
      { name: 'Edit', icon: 'edit' },
      { name: 'Share', icon: 'share' },
      { name: 'Delete', icon: 'delete' },
    ];

      $scope.showBottomSheet = function() {
      $scope.alert = '';
      $mdBottomSheet.show({
        templateUrl: '/js/modules/entry/views/desktop/bottom-sheet.html',

        // parent:
      }).then(function(clickedItem) {
        $scope.alert = clickedItem.name + ' clicked!';
      })
      };

  }
})();
