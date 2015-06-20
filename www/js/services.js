angular.module('starter.services', [])

.factory('Entries', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var entries = [{
    id: 0,
    title: 'Ben Sparrow',
    content: 'You on your way?',
    images: [
    { image: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'},
    { image: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'}
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
});
