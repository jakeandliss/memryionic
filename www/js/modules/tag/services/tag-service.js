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
          ancestry: "",
          children: [
            {
              name: "test 0 child",
              id: "10",
              ancestry: "0",
              children: [
                {
                  name: "test 0 child child",
                  id: "18",
                  ancestry: "10"
                }
              ]
            }
          ]
        },
        {
          name: "test 1",
          id: "1",
          ancestry: "0",
          children: [
            {
              name: "test 1 child",
              id: "11",
              ancestry: "1",
            }
          ]
        },
        {
          name: "test 2",
          id: "2",
          ancestry: "0",
          children: [
            {
              name: "test 2 child",
              id: "12",
              ancestry: "2",
            }
          ]
        },
        {
          name: "test 3",
          id: "3",
          ancestry: "0",
          children: [
            {
              name: "test 3 child",
              id: "13",
              ancestry: "3",
            }
          ]
        },
        {
          name: "test 4",
          id: "4",
          ancestry: "1",
          children: [
            {
              name: "test 4 child",
              id: "14",
              ancestry: "4",
            }
          ]
        },
        {
          name: "test 5",
          id: "5",
          ancestry: "",
          children: [
            {
              name: "test 5 child",
              id: "15",
              ancestry: "5",
            }
          ]
        },
        {
          name: "test 6",
          id: "6",
          ancestry: "5",
          children: [
            {
              name: "test 6 child",
              id: "16",
              ancestry: "6",
            }
          ]
        },
        {
          name: "test 7",
          id: "7",
          ancestry: "5",
          children: [
            {
              name: "test 7 child",
              id: "17",
              ancestry: "7",
            }
          ]
        },
        {
          name: "test 8",
          id: "8",
          ancestry: "4",
          children: [
            {
              name: "test 8 child",
              id: "18",
              ancestry: "8",
            }
          ]
        },
        {
          name: "test 9",
          id: "9",
          ancestry: "8",
          children: [
            {
              name: "test 9 child",
              id: "19",
              ancestry: "9"
            }
          ]
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
