(function() {
  'use strict';

  angular.module('memryApp')
    .config(function($sceDelegateProvider) {
      $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from assets domain.  Notice the difference between * and **.
        'http://static.videogular.com/**'
      ]);
    })
    .controller('EntriesCtrl', EntriesCtrl)

  EntriesCtrl.$inject = ['$scope', 'Entries', '$ionicModal', '$mdBottomSheet', '$sce'];

  function EntriesCtrl($scope, Entries, $ionicModal, $mdBottomSheet, $sce) {
    $scope.entry = {};

    // Add Entry
    $scope.entry.add = function(entry) {
      $scope.entries.push($scope.entry);
      $scope.entry = '';
    };

    // Edit Entry
    $scope.entries = Entries.all();
    var config = {
      sources: Entries.getVideos(),
      theme: {url: "http://www.videogular.com/styles/themes/default/latest/videogular.css" }
    };
    $scope.config = config;

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


    $scope.items = [{
      name: 'Edit',
      icon: 'edit'
    }, {
      name: 'Share',
      icon: 'share'
    }, {
      name: 'Delete',
      icon: 'delete'
    }, ];

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
