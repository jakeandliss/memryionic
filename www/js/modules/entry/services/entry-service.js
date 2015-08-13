(function () {
    angular.module('memryApp.services', [])
    .directive('dropzone', function () {
        return function (scope, element, attrs) {
            var config, dropzone;
            config = scope[attrs.dropzone];
            dropzone = new Dropzone(element[0], config.options);
            dropzone.autoDiscover = false;
            angular.forEach(config.eventHandlers, function (handler, event) {
                dropzone.on(event, handler);
            });
        };
    })
    /* This will be called in the run method to check if we have to serve ionic
     * templates or simple angular templates
     */
    // Clean the below factories later

    .factory('Entries', function ($sce) {
        // Might use a resource here that returns a JSON array

    // Some fake testing data
    var entries = [{
      id: 0,
      tagID:0,
      title: 'When I was on my way home today this happened. And I wasn\'t expecting it...',
      content: 'You on your way? Because there is a really cool party and I want to go to it really really bad. There is only one way to go. With a #friend. You on your way? Because there is a really cool party and I want to go to it really really bad. There is only one way to go. With a #friend. You on your way? Because there is a really cool party and I want to go to it really really bad. There is only one way to go. With a #friend. There is only one way to go. With a #friend. You on your way? Because there is a really cool party and I want to go to it really really bad. There is only one way to go. With a #friend. You on your way? Because there is a really cool party and I want to go to it really really bad.',
      resources: [{
        attachment: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png',
        attachment_content_type: "image",
        attachment_file_name: "image-1"
      },{
        attachment: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460',
        attachment_content_type: "image",
        attachment_file_name: "image-2"
      }, {
        attachment: 'http://www.urartuuniversity.com/content_images/pdf-sample.pdf',
        attachment_content_type: "pdf",
        attachment_file_name: "pdf-sample"
      }, {
        attachment: 'http://www.urartuuniversity.com/content_images/pdf-sample.pdf',
        attachment_content_type: "pdf",
        attachment_file_name: "pdf sample file number 2"
      }, {
        attachment: 'http://www.stephaniequinn.com/Music/Canon.mp3',
        attachment_content_type: "audio",
        attachment_file_name: "canon.mp3"
      }, {
        attachment: 'http://p48.ve.vc/data/48/35093/275475/Dil_De_Ramp_Te_-_Preet_Harpal_-_48Kbps_-_www.DjPunjab.Com.mp3',
        attachment_content_type: "audio",
        attachment_file_name: "Dil de Ramp te.mp3"
      }, {
        attachment: 'http://techslides.com/demos/sample-videos/small.mp4',
        attachment_content_type: "video",
        attachment_thumbnail: "https://xenforo.com/community/data/xengallery/111/111665-2c14996ac0401ed7ab0dfc762064120e.jpg",
        attachment_file_name: "video-1"
      }],
      date: "2012-04-23",
      tags: [{
        id:0,
        name: 'test 0'
      }]
    }, {
      id: 1,
      tagID:0,
      title: 'Max Lynx',
      content: 'Hey, it\'s me',
      image: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460',
      date: "1929-01-05",
       tags: [{
        id:0,
        name: 'test 0'
      }]
    }, {
      id: 2,
      tagID:1,
      title: 'Adam Bradleyson',
      content: 'I should buy a boat',
      image: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg',
      date: "1989-01-05",
       tags: [{
        id:1,
        name: 'test 1'
      }]
    }, {
      id: 3,
      tagID:1,
      title: 'Perry Governor',
      content: 'Look at my mukluks!',
      image: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png',
      date: "1995-12-05",
       tags: [{
        id:1,
        name: 'test 1'
      }]
    }, {
      id: 4,
      tagID:2,
      title: 'Mike Harrington',
      content: 'This is wicked good ice cream.',
      image: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png',
      date: "1992-11-05",
       tags: [{
        id:2,
        name: 'test 2'
      }]
    }];

        return {
            all: function () {
                return entries;
            },
            remove: function (entry) {
                entries.splice(entries.indexOf(entry), 1);
            },
            get: function (EntryId) {
                for (var i = 0; i < entries.length; i++) {
                    if (entries[i].id === parseInt(entryId)) {
                        return entries[i];
                    }
                }
                return null;
            },
            getVideos: function () {
                var resources = entries[0].resources;
                var video_sources = [];
                angular.forEach(resources, function (value, key) {
                    if (value.attachment_content_type == 'video') {
                        video_sources.push({
                            src: $sce.trustAsResourceUrl(value.attachment),
                            type: "video/mp4"
                        })
                    }
                });
                return video_sources;
            },
            selectedEntry: {},
            modalInstance: {}
        };
    })
})();
