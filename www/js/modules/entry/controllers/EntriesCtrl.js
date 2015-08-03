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

  EntriesCtrl.$inject = ['$scope','$window','$stateParams', 'Entries', '$ionicModal', '$mdBottomSheet', '$sce'];

  function EntriesCtrl($scope,$window,$stateParams, Entries, $ionicModal, $mdBottomSheet, $sce) {
    $scope.entry = {};

    // Add Entry
    $scope.entry.add = function(entry) {
      $scope.entries.unshift($scope.entry);
      $scope.entry = '';
    };

    // Edit Entry
    $scope.entries = Entries.all();
    var config = {
      sources: Entries.getVideos(),
      theme: {url: "http://www.videogular.com/styles/themes/default/latest/videogular.css" }
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
    }

    $scope.edit = function(entry) {
      Entries.remove(entry);
    };

    // Update Entry
    $scope.update = function(entry) {
      Entries.update(entry);
    };

    // Remove Entry
    $scope.remove = function(entry) {
      if (confirm('Are you sure you want to delete this?')){
        Entries.remove(entry);
      }
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
   
      $scope.filterEntites=function(){
         if($stateParams.id){
          var filterResult=$scope.entries.filter(function(elem){
              return elem.tagID==$stateParams.id;
          });
          $scope.entries=filterResult;
          console.log($scope.entries.length);
          $scope.showBackButton=true;
      }
      else{
        
      }
    }
    $scope.filterEntites();
    $scope.goBack=function(){
      $scope.showBackButton=false;
       $window.history.back();
    };


    $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  // Datepicker
  $scope.dateOptions = {

  };

  $scope.formats = ['longDate'];
  $scope.format = $scope.formats[0];

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 2);
  $scope.events =
    [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];

    $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  // Datepicker
  $scope.dateOptions = {

  };

  $scope.formats = ['longDate'];
  $scope.format = $scope.formats[0];

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 2);
  $scope.events =
    [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];
  }
})();
 
