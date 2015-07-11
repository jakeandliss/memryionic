(function(){
  'use strict';

  angular.module('memryApp')
    .factory('Tags', Tags);

    Tags.$inject = [];
    function Tags(){
      var tags = [
        {
          name: "test 0",
          id: 0,
          parent_id: ""
        },
        {
          name: "test 1",
          id: 1,
          parent_id: "0"
        },
        {
          name: "test 2",
          id: 2,
          parent_id: "0"
        },
        {
          name: "test 3",
          id: 3,
          parent_id: "0"
        },
        {
          name: "test 4",
          id: 4,
          parent_id: "1"
        }
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
    }
})();
