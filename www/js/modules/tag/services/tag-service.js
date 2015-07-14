(function(){
  'use strict';

  angular.module('memryApp')
    .factory('Tags', Tags);

    Tags.$inject = [];
    function Tags(){
      var tags = [
        {
          name: "test 0",
          id: "0",
          parent_id: ""
        },
        {
          name: "test 1",
          id: "1",
          parent_id: "0"
        },
        {
          name: "test 2",
          id: "2",
          parent_id: "0"
        },
        {
          name: "test 3",
          id: "3",
          parent_id: "0"
        },
        {
          name: "test 4",
          id: "4",
          parent_id: "1"
        },
        {
          name: "test 5",
          id: "5",
          parent_id: ""
        },
        {
          name: "test 6",
          id: "6",
          parent_id: "5"
        },
        {
          name: "test 7",
          id: "7",
          parent_id: "5"
        },
        {
          name: "test 8",
          id: "8",
          parent_id: "4"
        },
        {
          name: "test 9",
          id: "9",
          parent_id: "8"
        }
      ];

      return {
        all: function() {
          return tags;
        },
        remove: function(tag) {
          tags.splice(tags.indexOf(tag), 1);
        },
        get: function(TagId) {
          for (var i = 0; i < tags.length; i++) {
            if (tags[i].id === parseInt(tagId)) {
              return tags[i];
            }
          }
          return null;
        }
      };
    }
})();
