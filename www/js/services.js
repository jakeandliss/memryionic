angular.module('starter.services', [])

/* This will be called in the run method to check if we have to serve ionic
 * templates or simple angular templates
 */

.service('Init', function(Layout){
  var layout = null;

  this.getLayout = function(){
    // return layout if already set
    if(layout){
      return layout;
    }

    // else use window width
    var width = $(window).width();
    return layout = width > 10 && width < 480 ? 'mobile' : 'desktop';
  };

  // this will set the layout preference for user
  this.setLayout = function(layoutPref){
    // layout pref can be 'mobile' & 'desktop'
    if(layoutPref == 'desktop'){
      var layout = Layout.desktop();
      // Removing layout for ionic and adding ui-router's default placeholder
      $("#ion_nav").remove();
      $("#ion_nav_view").remove();
      $("#body").append(layout);
    } else {
      // Do nothing as of now we will later need it for automating the
      // resizing of window
      // var layout = Layout.mobile();
      // $("#body").append(layout);
    }
  };
})

// Factory will store the layouts for ionic and desktop views
.factory('Layout', function () {

  var service = {
    mobile: mobile,
    desktop: desktop
  }

  return service;

  //////////////////////////////////////////////////////////////////////////////
  // returns ionic navbar and ion-nav-view
  function mobile(){
    return "<ion-nav-bar id='ion_nav' class='bar-dark'> \
              <ion-nav-back-button> \
              </ion-nav-back-button> \
            </ion-nav-bar> \
            <!-- The views will be rendered in the <ion-nav-view> directive below \
            Templates are in the /templates folder --> \
            <ion-nav-view id='ion_nav'></ion-nav-view>";
  };

  // returns div to render partials in ui-view
  function desktop(){
    return "<div ui-view></div>";
  };
})


// Clean the below factories later

.factory('Entries', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var entries = [{
    id: 0,
    title: 'When I was on my way home today this happened. And I wasn\'t expecting it...',
    content: 'You on your way? Because there is a really cool party and I want to go to it really really bad. There is only one way to go. With a friend.',
    resources: [
    {
      attachment: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png',
      attachment_content_type: "image"
    },
    {
      attachment: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460',
      attachment_content_type: "image"
    },
    {
      attachment: 'http://www.urartuuniversity.com/content_images/pdf-sample.pdf',
      attachment_content_type: "pdf",
      attachment_file_name: "pdf-sample"
    },
    {
      attachment: 'http://www.urartuuniversity.com/content_images/pdf-sample.pdf',
      attachment_content_type: "pdf",
      attachment_file_name: "pdf-sample"
    },
    {
      attachment: 'http://www.stephaniequinn.com/Music/Canon.mp3',
      attachment_content_type: "audio",
      attachment_file_name: "canon.mp3"
    },
    {
      attachment: 'http://www.stephaniequinn.com/Music/Canon.mp3',
      attachment_content_type: "audio",
      attachment_file_name: "canon.mp3"
    },
    {
      attachment: 'http://techslides.com/demos/sample-videos/small.mp4',
      attachment_content_type: "video"
    }],
    date: "2012-04-23",
    tags: [
      {name: 'tag'},
      {name: 'important'}
    ],
  }, {
    id: 1,
    title: 'Max Lynx',
    content: 'Hey, it\'s me',
    image: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460',
    date: "1929-01-05"
  },{
    id: 2,
    title: 'Adam Bradleyson',
    content: 'I should buy a boat',
    image: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg',
    date: "1989-01-05"
  }, {
    id: 3,
    title: 'Perry Governor',
    content: 'Look at my mukluks!',
    image: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png',
    date: "1995-12-05"
  }, {
    id: 4,
    title: 'Mike Harrington',
    content: 'This is wicked good ice cream.',
    image: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png',
    date: "1992-11-05"
  }];

  return {
    all: function() {
      return entries;
    },
    remove: function(entry) {
      entries.splice(entries.indexOf(entry), 1);
    },
    get: function(EntryId) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].id === parseInt(entryId)) {
          return entries[i];
        }
      }
      return null;
    }
  };
})

.factory('Tags', function() {

  var tags = [
    {name: "test 0"},
    {name: "test 1"},
    {name: "test 2"},
    {name: "test 3"},
    {name: "test 4"}
  ];

  return {
    all: function() {
      return tags;
    },
    remove: function(tag) {
      tags.splice(entries.indexOf(tag), 1);
    },
    get: function(TagId) {
      for (var i = 0; i < entries.length; i++) {
        if (tags[i].id === parseInt(tagId)) {
          return tags[i];
        }
      }
      return null;
    }
  };
})
