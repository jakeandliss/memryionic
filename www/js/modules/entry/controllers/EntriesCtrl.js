(function() {
  'use strict';

  angular.module('memryApp')
    .controller('EntriesCtrl', EntriesCtrl);

  EntriesCtrl.$inject = ['$scope', 'Entries', '$ionicModal', '$mdBottomSheet'];

  function EntriesCtrl($scope, Entries, $ionicModal, $mdBottomSheet) {
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

    $scope.dropzoneConfig = {
      'options': {
        'previewTemplate': document.querySelector('#preview-template').innerHTML,
        'paramName': "resource[avatar]",
        'thumbnailHeight': 120,
        'thumbnailWidth': 120,
        'url': '/resources',
        'addRemoveLinks': true,
        'dictCancelUpload': "Cancel",
        'dictRemoveFile': "Remove",
      },
      'eventHandlers': {
        'sending': function(file, xhr, formData) {},
        'success': function(file, response) {},
        'error': function(file, response) {},
        'dragover': function(event){
          angular.element(document.querySelector('.dropzone')).addClass('dropzone-custom')
          angular.element(document.querySelector('.drag')).removeClass('hidden')
          angular.element(document.querySelector('.default-message')).addClass('hidden')
        },
        'drop': function(event){
          angular.element(document.querySelector('.drag')).addClass('hidden')
          angular.element(document.querySelector('.default-message')).removeClass('hidden')
          angular.element(document.querySelector('.dropzone')).removeClass('dropzone-custom')
        },
        'uploadprogress': function(file, progress){
          if (100 == progress){
            angular.element(document.querySelector('.dz-progress')).remove();
          }
        }
      }
    };

  }
})();
