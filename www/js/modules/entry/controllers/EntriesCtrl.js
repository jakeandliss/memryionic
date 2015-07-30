(function() {
  'use strict';

  angular.module('memryApp')
    .config(function($sceDelegateProvider) {
      $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
      ]);
    })
    .controller('EntriesCtrl', EntriesCtrl)

  EntriesCtrl.$inject = ['$scope', 'Entries', '$ionicModal', '$mdBottomSheet', '$sce', '$ionicPopover'];
  function EntriesCtrl($scope, Entries, $ionicModal, $mdBottomSheet, $sce, $ionicPopover) {
    $scope.entry = {};

    // Add Entry
    $scope.entry.add = function(entry) {
      $scope.entries.unshift($scope.entry);
      $scope.modal.hide(); // hide mobile form on submit
      $scope.entry = '';
    };

    // Edit Entry
    $scope.entries = Entries.all();
    var config = {
      sources: Entries.getVideos()
    };
    $scope.config = config;


    $scope.slickConfig = {
      initialSlide: 0,
      autoplay: false,
      slidesToShow: 1,
      centerPadding: "25%",
      focusOnSelect: true,
      arrows: false,
      centerMode: true,
      infinite: true,
      responsive: [{
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }, {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }]
    }

    $scope.edit = function(entry) {
      $scope.edit(entry);
    };

    // Update Entry
    $scope.update = function(entry) {
      Entries.update(entry);
    };

    // Remove Entry
    $scope.remove = function(entry) {
      $scope.remove(entry);
    };

    $scope.entry.date = new Date();

    if (window.templateMode == "mobile") {
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
      })
    };

    // This modal should only be used for mobile.
    $ionicModal.fromTemplateUrl('/js/modules/entry/views/mobile/new.html', function($ionicModal) {
      $scope.modal = $ionicModal;
    }, {
      // Use our scope for the scope of the modal to keep it simple
      scope: $scope,
      // The animation we want to use for the modal entrance
      animation: 'slide-in-up'
    });

    // items for bottom sheet
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
      })
    };

    // Dropzone
    var counter = 0;
    var insideDropzone = false;

    angular.element(document.querySelector('#entries')).on('dragenter', dragEventHandler)
    angular.element(document.querySelector('#entries')).on('dragleave', dragLeaveHandler)
    angular.element(document.querySelector('.dropzone')).on('dragenter', function(event) {
      counter++;
    })
    angular.element.bind({
      dragenter: function(event) {
        event.stopPropagation();
        event.preventDefault();
        insideDropzone = true;
      },
      dragleave: function(event) {
        event.stopPropagation();
        event.preventDefault();
        insideDropzone = false;
      }
    });

    function dragEventHandler() {
      angular.element(document.querySelectorAll('.dz-hide')).addClass('hidden')
      angular.element(document.querySelector('.dropzone')).addClass('dropzone-custom')
      angular.element(document.querySelector('.dropzone')).removeClass('hidden')
      angular.element(document.querySelector('.dz-drag')).removeClass('hidden').parent().parent().addClass('col-sm-12').removeClass('col-sm-8')
      angular.element(document.querySelector('.dz-message')).addClass('hidden')
      counter++;
    }

    function dragLeaveHandler() {
      counter--;
      if (counter == 0) {
        if (!insideDropzone) {
          angular.element(document.querySelectorAll('.dz-hide')).removeClass('hidden')
          angular.element(document.querySelector('.dropzone')).removeClass('dropzone-custom')
          angular.element(document.querySelector('.dz-drag')).addClass('hidden').parent().parent().removeClass('col-sm-12').addClass('col-sm-8')
          angular.element(document.querySelector('.dz-message')).removeClass('hidden')
        }
      }
    }
    var previewTemplate = null
    if(document.querySelector('#preview-template') != null){
      previewTemplate = document.querySelector('#preview-template').innerHTML
    }
    $scope.dropzoneConfig = {
      'options': {
        'previewTemplate': previewTemplate,
        'paramName': "resource[avatar]",
        'thumbnailHeight': 100,
        'thumbnailWidth': 100,
        'url': '/resources',
        'addRemoveLinks': true,
        'dictCancelUpload': "Cancel",
        'dictRemoveFile': "Remove",
      },
      'eventHandlers': {
        'sending': function(file, xhr, formData) {},
        'success': function(file, response) {},
        'error': function(file, response) {},
        'drop': function(event) {
          angular.element(document.querySelector('.dz-drag')).addClass('hidden').parent().parent().removeClass('col-sm-12').addClass('col-sm-8')
          angular.element(document.querySelector('.default-message')).removeClass('hidden')
          angular.element(document.querySelector('.dropzone')).removeClass('dropzone-custom')
          angular.element(document.querySelectorAll('.dz-hide')).removeClass('hidden')
        },
        'uploadprogress': function(file, progress) {
          angular.element(document.querySelector('.dz-progress')).addClass('progress-bar')
          if (100 == progress) {
            angular.element(document.querySelector('.dz-progress')).remove();
          }
        }
      }
    };

  }
})();
