(function() {
  'use strict';

  angular.module('memryApp')

    .controller('EntriesCtrl', EntriesCtrl)

  EntriesCtrl.$inject = ['$scope', '$stateParams', 'Entries', '$ionicModal', '$mdBottomSheet', '$sce', '$ionicPopover', '$modal', 'Lightbox', 'ngAudio', 'timeAgo','$ionicScrollDelegate','Tags'];
  function EntriesCtrl($scope, $stateParams, Entries, $ionicModal, $mdBottomSheet, $sce, $ionicPopover, $modal, Lightbox, ngAudio, timeAgo,$ionicScrollDelegate,Tags) {
    $scope.entry = {};
    $scope.tags = [];

    // Add Entry
    $scope.MobileEntryAdd=function(entry){
      if($scope.entry.title)
      {
        $scope.entry.tags=[];
        
        angular.forEach($scope.tags,function(obj){
          if(obj.id){
            $scope.entry.tagID=obj.id;
            $scope.entry.tags.push({id:obj.id,'name':obj.text});
          }else{
            var newTag={}
            var globalTags=Tags.all();
            if($stateParams.id){
              if(globalTags[$stateParams.id].children){
                    var length=globalTags[$stateParams.id].children.length;
                    if(length==0){
                      var newId=$stateParams.id+1;
                    }else{
                      var lastID=globalTags[$stateParams.id].children[length-1].id;
                      var newId=parseInt(lastID)+1;
                    }
                    
                    //$scope.entry.tagID=newId;
                    $scope.entry.tagID=$stateParams.id;
                    newTag={id:newId,name:obj.text,ancestry:$stateParams.id,children:[]}
              }else{
                  //$scope.entry.tagID=$stateParams.id+1;
                  $scope.entry.tagID=$stateParams.id;
                  newTag={id:$stateParams.id+1,name:obj.text,ancestry:$stateParams.id,children:[]}
              }
              Tags.add(newTag);
            }else{
              var length=globalTags.length;
              var lastID=globalTags[length-1].id;
              var newId=parseInt(lastID)+1;
              $scope.entry.tagID=newId;
              newTag={id:newId,name:obj.text,ancestry:"",children:[]}
              Tags.add(newTag);
            }
            $scope.entry.tags.push(newTag);
          }
       });
        $scope.entries.unshift($scope.entry);
        $scope.entry = {};
        $scope.modal.hide(); // hide mobile form on submit
        $scope.entry.date = new Date();
        $scope.tags = [];
        $ionicScrollDelegate.scrollTop();
        $scope.entryForm.$setPristine();
        
      }
    }
     $scope.selectVisuals = function(resource){
       return resource.attachment_content_type == 'video' || resource.attachment_content_type == 'image';

      };
    $scope.entryAdd = function(entry) {
      $scope.entry.tags=[];
      $scope.entry.tagID="";
       angular.forEach($scope.tags,function(obj){
          if(obj.id){
            $scope.entry.tagID=obj.id;
            $scope.entry.tags.push({id:obj.id,'name':obj.text});
          }else{
            var newTag={}
            var globalTags=Tags.all();
            if($stateParams.id){
              if(globalTags[$stateParams.id].children){
                    var length=globalTags[$stateParams.id].children.length;
                    console.log(length);
                    if(length==0){
                      var newId=$stateParams.id+1;
                    }else{
                      var lastID=globalTags[$stateParams.id].children[length-1].id;
                      var newId=parseInt(lastID)+1;
                    }
                    
                    //$scope.entry.tagID=newId;
                    $scope.entry.tagID=$stateParams.id;
                    newTag={id:newId,name:obj.text,ancestry:$stateParams.id,children:[]}
              }else{
                  //$scope.entry.tagID=$stateParams.id+1;
                  $scope.entry.tagID=$stateParams.id;
                  newTag={id:$stateParams.id+1,name:obj.text,ancestry:$stateParams.id,children:[]}
              }
              Tags.add(newTag);
            }else{
              var length=globalTags.length;
              var lastID=globalTags[length-1].id;
              var newId=parseInt(lastID)+1;
              $scope.entry.tagID=newId;
              newTag={id:newId,name:obj.text,ancestry:"",children:[]}
              Tags.add(newTag);
            }
            $scope.entry.tags.push(newTag);
          }
       }); 
      if(fileDropzone.files){
        fileDropzone.processQueue();
      };
      $scope.entries.unshift($scope.entry);
      $scope.entry = {};
      $scope.tags=[];
      $scope.entryForm.$setPristine();
      $scope.entry.date = new Date();
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
      if (confirm('Are you sure you want to delete this?')){
        Entries.remove(Entries.selectedEntry);
        $mdBottomSheet.cancel();
        $scope.popover.hide();
      }
    };

    $scope.entry.date = new Date();

    //$scope.audio = ngAudio.load("http://www.stephaniequinn.com/Music/Canon.mp3");
     $scope.audioPlay=function(index,src){
      var x = document.querySelectorAll(".play");
      angular.forEach(x,function(obj){
          obj.innerHTML="Play";
      })
      if($scope.audio)
      {
        if($scope.audio.src==src){

          if($scope.audio.paused){
                $scope.audio.play();
                document.querySelector("#playButton"+index).innerHTML="Pause";
                }
                else{
                  $scope.audio.pause();
                  document.querySelector("#playButton"+index).innerHTML="Play";
                }
              }else{
                $scope.audio.restart();
                $scope.audio=ngAudio.load(src); 
                $scope.audio.play();
                document.querySelector("#playButton"+index).innerHTML="Pause";
               
              }
      }else{

        $scope.audio=ngAudio.load(src);
        $scope.audio.play();
        document.querySelector("#playButton"+index).innerHTML="Pause";
      }
    }
    $scope.removeFile=function(resource,entry){
      //entry.resources.slice(entry.resources.indexOf(resource),1);
      Entries.removeResource(entry,resource);
    }
    $scope.audioStop=function(index,src){
      
      if($scope.audio.src==src){
        document.querySelector("#playButton"+index).innerHTML="Play";
        $scope.audio.restart();
      }
      else{
        
        if($scope.audio.paused){
          $scope.audio.pause();
        }else{
          $scope.audio.play();
        }
      }
    }


    if (window.templateMode == "mobile") {
      $ionicPopover.fromTemplateUrl('my-popover.html', {
        scope: $scope
      }).then(function(popover) {
        $scope.popover = popover;
      });

      $scope.openPopover = function($event,entry) {
        Entries.selectedEntry=entry;
        
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
    $ionicModal.fromTemplateUrl('/js/modules/entry/views/mobile/edit.html', function($ionicModal) {
      $scope.editModal = $ionicModal;
    }, {
      // Use our scope for the scope of the modal to keep it simple
      scope: $scope,
      // The animation we want to use for the modal entrance
      animation: 'slide-in-up'
    });
    $ionicModal.fromTemplateUrl('/js/modules/entry/views/mobile/share.html', function($ionicModal) {
      $scope.shareModal = $ionicModal;
    }, {
      // Use our scope for the scope of the modal to keep it simple
      scope: $scope,
      // The animation we want to use for the modal entrance
      animation: 'slide-in-up'
    });
    $scope.openEdit=function(){
      $scope.editModal.show();
      $scope.popover.hide();
      $scope.selectedTags=angular.copy(Entries.selectedEntry);
        $scope.selectedTags.date=new Date(Entries.selectedEntry.date);
    }
    $scope.openModal = function () {
      $mdBottomSheet.cancel();
      
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: '/js/modules/entry/views/desktop/edit.html',
        controller: 'EntriesCtrl',
        size: 'lg',
        animation: true
      });
      Entries.modalInstance=modalInstance;
    };

    $scope.closeEditModal = function () {
      Entries.modalInstance.dismiss('cancel');
    };

      $scope.selectedEntry=angular.copy(Entries.selectedEntry);
      //$scope.selectedTags=$scope.selectedEntry.tags;
      $scope.selectedTags=[];
      var selectTags=$scope.selectedEntry.tags;
      angular.forEach(selectTags,function(obj){
        $scope.selectedTags.push({id:obj.id,text:obj.name});
      })
    $scope.showBottomSheet = function(entry) {
      Entries.selectedEntry=entry;
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
    //  counter++;
      angular.element(document.querySelectorAll('.dz-hide')).addClass('hidden')
      angular.element(document.querySelector('.dropzone')).addClass('dropzone-custom')
      angular.element(document.querySelector('.dropzone')).removeClass('hidden')
      angular.element(document.querySelector('.dz-drag')).removeClass('hidden').parent().parent().addClass('col-sm-12').removeClass('col-sm-8')
      angular.element(document.querySelector('.dz-message')).addClass('hidden')
    })
    angular.element(document.querySelector('.dropzone')).on('dragleave', function(event) {
      angular.element(document.querySelectorAll('.dz-hide')).removeClass('hidden')
      angular.element(document.querySelector('.dropzone')).removeClass('dropzone-custom')
      angular.element(document.querySelector('.dz-drag')).addClass('hidden').parent().parent().removeClass('col-sm-12').addClass('col-sm-8')
      angular.element(document.querySelector('.dz-message')).removeClass('hidden')
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
      // angular.element(document.querySelectorAll('.dz-hide')).addClass('hidden')
      // angular.element(document.querySelector('.dropzone')).addClass('dropzone-custom')
      // angular.element(document.querySelector('.dropzone')).removeClass('hidden')
      // angular.element(document.querySelector('.dz-drag')).removeClass('hidden').parent().parent().addClass('col-sm-12').removeClass('col-sm-8')
      // angular.element(document.querySelector('.dz-message')).addClass('hidden')
      counter++;

     
    }

    function dragLeaveHandler() {
      counter--;
       if (counter == 0) {
        if (!insideDropzone) {
          // angular.element(document.querySelectorAll('.dz-hide')).removeClass('hidden')
          // angular.element(document.querySelector('.dropzone')).removeClass('dropzone-custom')
          // angular.element(document.querySelector('.dz-drag')).addClass('hidden').parent().parent().removeClass('col-sm-12').addClass('col-sm-8')
          // angular.element(document.querySelector('.dz-message')).removeClass('hidden')
         }
      }

    }
    var previewTemplate = null
    if(document.querySelector('#preview-template') != null){
      previewTemplate = document.querySelector('#preview-template').innerHTML
    }
    var fileDropzone=[];
    $scope.dropzoneConfig = {
      'options': {
        'previewTemplate': previewTemplate,
        'paramName': "resource[avatar]",
        'thumbnailHeight': 100,
        'thumbnailWidth': 100,
        'url': '/resources',
        'addRemoveLinks': true,
        "autoProcessQueue": true,
        'dictCancelUpload': "Cancel",
        'dictRemoveFile': "Remove",
        'init':function(){
            fileDropzone=this;
        },
      },
      'eventHandlers': {
        'sending': function(file, xhr, formData) {},
        'success': function(file, response) {},
        'error': function(file, response) {},
        'addedfile': function(file){
          var removeLink = $(file.previewElement).find('.dz-remove').first();
          var $a = $("<a>",{text:"Rename",class:"dz-remove rename"});
          $a.click(function(){
           var element = $(file.previewElement).find('.fileName').first();
           var spanText = element.prev();
           var rename=$(file.previewElement).find('.rename').first();
           rename.hide();
           var Ok=$(file.previewElement).find('.ok').first();
           Ok.show();
           Ok.click(function(){
              file.Name=element.val()+fileExtention;
              spanText.text(element.val()+fileExtention);
               element.hide();
               spanText.show();
               rename.show();
               Ok.hide();
               cancel.hide();
           });
           var cancel=$(file.previewElement).find('.cancel').first();
           cancel.show();
           cancel.click(function(){
               element.hide();
               spanText.show();
               rename.show();
               Ok.hide();
               cancel.hide();
           });
           var fileName=spanText.text();
           var fileExtention=fileName.slice(fileName.lastIndexOf("."));
           fileName=fileName.slice(0,fileName.lastIndexOf("."));
           element.val(fileName).show();
           spanText.hide();
         });
        $a.insertBefore(removeLink);

        },
        'drop': function(event) {
          angular.element(document.querySelector('.dz-drag')).addClass('hidden').parent().parent().removeClass('col-sm-12').addClass('col-sm-8')
          angular.element(document.querySelector('.default-message')).removeClass('hidden')
          angular.element(document.querySelector('.dropzone')).removeClass('dropzone-custom')
          angular.element(document.querySelectorAll('.dz-hide')).removeClass('hidden')
        },
        'uploadprogress': function(file, progress) {
          console.log(file);
          angular.element(document.querySelector('.dz-progress')).addClass('progress-bar')
          if (100 == progress) {
            angular.element(document.querySelector('.dz-progress')).remove();
          }
        }
      }
    };

    $scope.images=[];
    $scope.openLightboxModal = function (index,resource) {
     // var images =""; // images variable should contain the array of images and videos associated with the entry where it is triggered
      if(resource.length>0)
      {
      var filterResultImages=resource.filter(function(elem){
          return elem.attachment_content_type=="image";
      });
      if(filterResultImages.length>0){
          angular.forEach(filterResultImages,function(obj){
          $scope.images.push({'url':obj.attachment});
        })
      }
    }
      Lightbox.openModal($scope.images, index);
    };

    $scope.track = {
      url: 'http://www.stephaniequinn.com/Music/Canon.mp3',
    };


    $scope.play = function(src) {
       var media = new Media(src, null, null, mediaStatusCallback);
       $cordovaMedia.play(media);
    }

    var mediaStatusCallback = function(status) {
       if(status == 1) {
           $ionicLoading.show({template: 'Loading...'});
       } else {
           $ionicLoading.hide();
       }
    }

    $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.opened = true;
    };
     $scope.openBeginning = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.openedBeginning = true;
    };
    $scope.openEnd = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.openedEnd = true;
    };
    // Date Options
    $scope.dateOptions = {
    };

    $scope.formats = ['longDate'];
    $scope.format = $scope.formats[0];
    timeAgo.settings.allowFuture = true;

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
      $scope.filterEntites=function(){
         if($stateParams.id){
          var filterResult=$scope.entries.filter(function(elem){
              return elem.tagID==$stateParams.id;
          });
          $scope.entries=filterResult;
          $scope.showBackButton=true;
      }
      else{

      }
    };
      $scope.filterEntites=function(){
         if($stateParams.id){
          var filterResult=$scope.entries.filter(function(elem){
              return elem.tagID==$stateParams.id;
          });
          $scope.entries=filterResult;
          $scope.showBackButton=true;
      }
      else{

      }
    }
    $scope.filterEntites();
    $scope.Lightbox=Lightbox;
    $scope.images=[];
    $scope.openLightBoxModel=function(index,resource){
      var filterImagesResult=resource.filter(function(elem){
           return elem.attachment_content_type== "image"||elem.attachment_content_type=="video";
      });
      angular.forEach(filterImagesResult,function(obj){
          if(obj.attachment_content_type=="video")
          {
              $scope.images.push({'url':obj.attachment,'type':obj.attachment_content_type});
         }
         else{
          $scope.images.push({'url':obj.attachment,'type':obj.attachment_content_type});
         }
      });
      Lightbox.openModal($scope.images,index);
    };
    $scope.searchToggle=false;
    $scope.closeSearch=function(){
      $scope.SearchText=null;
      $scope.SearchBeginningDate=null;
      $scope.SearchEndDate=null;
      $scope.searchToggle=false;
    }


    $scope.mobileImageSlide=[];
    $scope.showModal = function(index,resource) {
      $scope.currentIndex=index;
       if(resource.length>0)
      {
      var filterResultImages=resource.filter(function(elem){
          return elem.attachment_content_type=="image" || elem.attachment_content_type=="video";
      });
    }
      $scope.mobileImageSlide=filterResultImages;
      $ionicModal.fromTemplateUrl("js/modules/entry/views/mobile/video-popover.html", {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
       $scope.modal.show();
      });
    }

     // Close the modal
     $scope.closeModal = function() {
        $scope.modal.hide();
        $scope.modal.remove()
     };
      $scope.mobileEntryCancel=function(){
        $scope.entry = {};
        $scope.tags=[];
        $scope.modal.hide(); // hide mobile form on submit
        $scope.entry.date = new Date();
     }
     $scope.focusInputText=function($event){
          angular.element($event.target).find("input").focus();
     };

  }
})();
