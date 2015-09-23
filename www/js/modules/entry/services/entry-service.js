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
    var entries=[];
    var oldEntries = [{
      id: 0,
      tagID:0,
      shared:false,
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
      tagsList:[{userid:1,tags:[{id:0,name:"test 0"},{id:2,name:"test 2"},{id:4,name:"test 4"}]},
                {userid:2,tags:[{id:1,name:"test 1"},{id:5,name:"test 5"}]}]
    }, {
      id: 1,
      tagID:0,
      shared:true,
      title: 'Max Lynx',
      content: 'Hey, it\'s me',
      image: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460',
      date: "1929-01-05",
      resources: [{
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
      }],
      tagsList:[{userid:2,tags:[{id:2,name:"test 2"},{id:4,name:"test 4"}]},
                {userid:1,tags:[{id:3,name:"test 3"},{id:5,name:"test 5"}]}]
    }, {
      id: 2,
      tagID:1,
      shared:false,
      title: 'Adam Bradleyson',
      content: 'I should buy a boat',
      image: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg',
      date: "1989-01-05",
      resources: [{
        attachment: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png',
        attachment_content_type: "image",
        attachment_file_name: "image-1"
      },{
        attachment: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460',
        attachment_content_type: "image",
        attachment_file_name: "image-2"
      }, {
        attachment: 'http://techslides.com/demos/sample-videos/small.mp4',
        attachment_content_type: "video",
        attachment_thumbnail: "https://xenforo.com/community/data/xengallery/111/111665-2c14996ac0401ed7ab0dfc762064120e.jpg",
        attachment_file_name: "video-1"
      }],
      tagsList:[{userid:2,tags:[{id:4,name:"test 4"},{id:3,name:"test 3"}]},
                {userid:1,tags:[{id:1,name:"test 1"},{id:5,name:"test 5"}]}]
    }, {
      id: 3,
      tagID:1,
      shared:false,
      title: 'Perry Governor',
      content: 'Look at my mukluks!',
      image: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png',
      date: "1995-12-05",
      resources: [{
        attachment: 'http://www.urartuuniversity.com/content_images/pdf-sample.pdf',
        attachment_content_type: "pdf",
        attachment_file_name: "pdf-sample"
      }, {
        attachment: 'http://www.urartuuniversity.com/content_images/pdf-sample.pdf',
        attachment_content_type: "pdf",
        attachment_file_name: "pdf sample file number 2"
      }],
      tagsList:[{userid:2,tags:[{id:4,name:"test 4"},{id:6,name:"test 6"}]},
                {userid:1,tags:[{id:1,name:"test 1"},{id:3,name:"test 3"},{id:5,name:"test 5"}]}]
    }, {
      id: 4,
      tagID:2,
      shared:true,
      title: 'Mike Harrington',
      content: 'This is wicked good ice cream.',
      image: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png',
      date: "1992-11-05",
      tagsList:[{userid:2,tags:[{id:0,name:"test 0"},{id:7,name:"test 7"}]},
                {userid:1,tags:[{id:1,name:"test 1"},{id:8,name:"test 8"},{id:5,name:"test 5"}]}]
    },{
      id: 5,
      tagID:2,
      shared:false,
      title: 'test id: 5',
      content: 'You on your way? Because there is a really cool party and I want to go to it really really bad. There is only one way to go. With a #friend. You on your way? Because there is a really cool party and I want to go to it really really bad. There is only one way to go. With a #friend. You on your way? Because there is a really cool party and I want to go to it really really bad. There is only one way to go. With a #friend. There is only one way to go. With a #friend. You on your way? Because there is a really cool party and I want to go to it really really bad. There is only one way to go. With a #friend. You on your way? Because there is a really cool party and I want to go to it really really bad.',
      date: "2012-04-23",
     tagsList:[{userid:2,tags:[{id:9,name:"test 9"},{id:4,name:"test 4"}]},
                {userid:1,tags:[{id:1,name:"test 1"},{id:3,name:"test 3"},{id:5,name:"test 5"}]}]
    }, {
      id: 6,
      tagID:3,
      shared:true,
      title: 'test id: 6',
      content: 'Hey, it\'s me',
      image: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460',
      date: "1929-01-05",
      tagsList:[{userid:2,tags:[{id:2,name:"test 2"},{id:3,name:"test 3"}]},
                {userid:1,tags:[{id:1,name:"test 1"},{id:3,name:"test 3"}]}]
    }, {
      id: 7,
      tagID:4,
      shared:true,
      title: 'test id: 7',
      content: 'I should buy a boat',
      image: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg',
      date: "1989-01-05",
      resources: [{
        attachment: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png',
        attachment_content_type: "image",
        attachment_file_name: "image-1"
      },{
        attachment: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460',
        attachment_content_type: "image",
        attachment_file_name: "image-2"
      }, {
        attachment: 'http://techslides.com/demos/sample-videos/small.mp4',
        attachment_content_type: "video",
        attachment_thumbnail: "https://xenforo.com/community/data/xengallery/111/111665-2c14996ac0401ed7ab0dfc762064120e.jpg",
        attachment_file_name: "video-1"
      }],
     tagsList:[{userid:2,tags:[{id:0,name:"test 0"},{id:4,name:"test 4"}]},
                {userid:1,tags:[{id:1,name:"test 1"},{id:5,name:"test 5"}]}]
    }, {
      id: 8,
      tagID:5,
      shared:false,
      title: 'test id: 8',
      content: 'Look at my mukluks!',
      image: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png',
      date: "1995-12-05",
      resources: [{
        attachment: 'http://www.urartuuniversity.com/content_images/pdf-sample.pdf',
        attachment_content_type: "pdf",
        attachment_file_name: "pdf-sample"
      }, {
        attachment: 'http://www.urartuuniversity.com/content_images/pdf-sample.pdf',
        attachment_content_type: "pdf",
        attachment_file_name: "pdf sample file number 2"
      }],
      tagsList:[{userid:2,tags:[{id:0,name:"test 0"},{id:4,name:"test 4"}]},
                {userid:1,tags:[{id:1,name:"test 1"},{id:5,name:"test 5"}]}]
    }, {
      id: 9,
      tagID:5,
      shared:false,
      title: 'test id: 9',
      content: 'This is wicked good ice cream.',
      image: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png',
      date: "1992-11-05",
      tagsList:[{userid:1,tags:[{id:0,name:"test 0"},{id:4,name:"test 4"}]},
                {userid:2,tags:[{id:1,name:"test 1"},{id:5,name:"test 5"}]}]
    },{
      id:10,
      tagID:5,
      shared:false,
      date: "1992-11-05",
      title:"test id 10",
      tagsList:[{userid:2,tags:[{id:2,name:"test 2"},{id:4,name:"test 4"}]},
                {userid:1,tags:[{id:3,name:"test 3"},{id:5,name:"test 5"}]}]
    }];
      function getNextRecords(after,id){
        if(id>=0){
          var filterResult=oldEntries.filter(function(elem){
              return elem.tagID==id;
          });
          var lastIndex=filterResult.map(function(e){return e.id}).indexOf(after);
          lastIndex++;
          var loopUpto=filterResult.length - lastIndex;
            if(loopUpto>10){
              loopUpto=10;
            }else if(loopUpto<=0){
              loopUpto=0;
            }else{
              loopUpto=loopUpto+after;
            }
            for(i=lastIndex;i<loopUpto;i++){
              entries.push(filterResult[lastIndex]);
            };
        }else{
          var lastIndex=oldEntries.map(function(e){return e.id}).indexOf(after);
          lastIndex++;
          var loopUpto=oldEntries.length - lastIndex;
            if(loopUpto>10){
              loopUpto=10;
            }else if(loopUpto<=0){
              loopUpto=0;
            }else{
              loopUpto=loopUpto+lastIndex;
            }
            for(i=lastIndex;i<loopUpto;i++){
              entries.push(oldEntries[i]);
            };
        }
          return null;
      }
        return {
            all: function () {
                return oldEntries;
            },
            getEntries:function(id){
              
                entries.length=0;
               
                if(id>=0){
                  var filterResult=oldEntries.filter(function(elem){
                    return elem.tagID==id;
                  });
                  var loopUpto=filterResult.length;
                  if(loopUpto>5){
                    loopUpto=5;
                  }else if(loopUpto<0){
                    loopUpto=0;
                  }else{
                    loopUpto=filterResult.length;
                  }
                  i=0;
                   while(i<loopUpto){
                    entries.push(filterResult[i]);
                    i++;
                   } 
                }else{
                  for(i=0;i<5;i++){
                    entries.push(oldEntries[i]);
                  }
                }
                return entries;
            },
            remove: function (entry) {
                
                entries.splice(entries.indexOf(entry), 1);
                oldEntries.splice(oldEntries.indexOf(entry),1);
            },
            hide: function (entry) {
                
                entries.splice(entries.indexOf(entry), 1);
                oldEntries.splice(oldEntries.indexOf(entry),1);
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
              var video_sources = [];
              if(entries.length){
                var resources = entries[0].resources;
                
                angular.forEach(resources, function (value, key) {
                    if (value.attachment_content_type == 'video') {
                        video_sources.push({
                            src: $sce.trustAsResourceUrl(value.attachment),
                            type: "video/mp4"
                        })
                    }
                });
              };
                return video_sources;
            },
            removeResource:function(entry,resource){
              var resources =entries[entries.indexOf(entry)].resources;
              resources.splice(resources.indexOf(resource),1);
            },
            addEntry:function(entry){
              oldEntries.unshift(entry);
              entries.unshift(entry);
            },
            addSharedTag:function(id,tag,userid){
              var index=entries.map(function(e){return e.id}).indexOf(id);
              var userIndex=entries[index].tagsList.map(function(e){return e.userid}).indexOf(userid);
              var checkSharedTag=entries[index].tagsList[userIndex].tags.filter(function(elem){
                return elem.id==tag.id;
              })
              if(checkSharedTag.length<=0){
                entries[index].tagID=tag.id;
                if(entries[index].tagsList){
                  var tagIndex= entries[index].tagsList.map(function(e) {return e.userid}).indexOf(userid);
                  entries[index].tagsList[tagIndex].tags.push(tag)
                }
              }
              var oldFileIndex=oldEntries.map(function(e){return e.id}).indexOf(id);
              var oldUserIndex=oldEntries[oldFileIndex].tagsList.map(function(e){return e.userid}).indexOf(userid);
              var checkSharedTagEntries=oldEntries[oldFileIndex].tagsList[userIndex].tags.filter(function(elem){
                return elem.id==tag.id;
              })
              if(checkSharedTagEntries.length<=0){
                oldEntries[oldFileIndex].tagID=tag.id;
                if(oldEntries[oldFileIndex].tagsList){
                  var tagIndex= entries[index].tagsList.map(function(e) {return e.userid}).indexOf(userid);
                  oldEntries[oldFileIndex].tagsList[tagIndex].tags.push(tag);
                }
              }
            },
            update:function(entry){
              var index=entries.map(function(e){return e.id}).indexOf(entry.id);
              entries[index]=entry;
              var oldFileIndex=oldEntries.map(function(e){return e.id}).indexOf(entry.id);
              oldEntries[oldFileIndex]=entry;
            },
            updateShare:function(id,tags,userid){
              var index=entries.map(function(e){return e.id}).indexOf(id);
              var userIndex=entries[index].tagsList.map(function(e){return e.userid}).indexOf(userid)
              entries[index].tagsList[userIndex].tags=tags
              var oldFileIndex=oldEntries.map(function(e){return e.id}).indexOf(id);
              var oldUserIndex=oldEntries[oldFileIndex].tagsList.map(function(e){return e.userid}).indexOf(userid);
              oldEntries[oldFileIndex].tagsList[oldUserIndex].tags=tags;
            },
            resource:{},
            selectedEntry: {},
            modalInstance: {},
            getNextRecords:getNextRecords
        };
    })
})();
