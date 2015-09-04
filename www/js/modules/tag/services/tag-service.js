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
              id: "1000",
              ancestry: "0",
              children: [
                {
                  name: "test 0 child child",
                  id: "2000",
                  ancestry: "1000",
                  children: [
                    {
                      name: "test 0 child child child",
                      id: "3000",
                      ancestry: "2000"
                    },
                    {
                      name: "test 0 child child child",
                      id: "3001",
                      ancestry: "2000"
                    },
                    {
                      name: "test 0 child child child",
                      id: "3002",
                      ancestry: "2000"
                    },
                    {
                      name: "test 0 child child child",
                      id: "3003",
                      ancestry: "2000"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          name: "test 1",
          id: "1",
          ancestry: "",
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
          ancestry: "",
          children: [
            {
              name: "test 2 child",
              id: "21",
              ancestry: "2",
            }
          ]
        },
        {
          name: "test 3",
          id: "3",
          ancestry: "",
          children: [
            {
              name: "test 3 child",
              id: "31",
              ancestry: "3",
            }
          ]
        },
        {
          name: "test 4",
          id: "4",
          ancestry: "",
          children: [
            {
              name: "test 4 child",
              id: "41",
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
              id: "51",
              ancestry: "5",
            }
          ]
        },
        {
          name: "test 6",
          id: "6",
          ancestry: "",
          children: [
            {
              name: "test 6 child",
              id: "61",
              ancestry: "6",
            }
          ]
        },
        {
          name: "test 7",
          id: "7",
          ancestry: "",
          children: [
            {
              name: "test 7 child",
              id: "71",
              ancestry: "7",
            }
          ]
        },
        {
          name: "test 8",
          id: "8",
          ancestry: "",
          children: [
            {
              name: "test 8 child",
              id: "81",
              ancestry: "8",
            }
          ]
        },
        {
          name: "test 9",
          id: "9",
          ancestry: "",
          children: [
            {
              name: "test 9 child",
              id: "91",
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
        },
        add:function(tag){
          if(tag.ancestry){
            if(tags[tag.ancestry].children){
              tags[tag.ancestry].children.push(tag);
            }else{
              tags[tag.ancestry].children=[];
              tags[tag.ancestry].children.push(tag);
            }
          }else{
            tags.push(tag);
          }
          
        },
        update:function(tag){
          console.log(tag);
          if(tag.ancestry){
            var childTags=tags[tag.ancestry].children;
            var index=childTags.map(function(e) {return e.id}).indexOf(tag.id);
            childTags[index]=tag
          }else{
            var index=tags.map(function(e){ return e.id}).indexOf(tag.id)
            tags[index]=tag;
          }
        }
      };
    }
})();
