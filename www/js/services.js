angular.module('starter.services', [])

.factory('Entries', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var entries = [{
    id: 0,
    title: 'When I was on my way home today this happened...',
    content: 'You on your way? Because there is a really cool party and I want to go to it really really bad. There is only one way to go. With a friend.',
    attachments: [
    { file: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'},
    { file: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'},
    {
      file: 'http://techslides.com/demos/sample-videos/small.mp4',
      avatar_content_type: "video"
    }

    ],
    date: 12/13/1985,
    tags: [
      {name: 'tag'},
      {name: 'important'}
    ],
  }, {
    id: 1,
    title: 'Max Lynx',
    content: 'Hey, it\'s me',
    image: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460',
    date: 12/13/1985
  },{
    id: 2,
    title: 'Adam Bradleyson',
    content: 'I should buy a boat',
    image: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg',
    date: 12/13/1985
  }, {
    id: 3,
    title: 'Perry Governor',
    content: 'Look at my mukluks!',
    image: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png',
    date: 12/13/1985
  }, {
    id: 4,
    title: 'Mike Harrington',
    content: 'This is wicked good ice cream.',
    image: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png',
    date: 12/13/1985
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
