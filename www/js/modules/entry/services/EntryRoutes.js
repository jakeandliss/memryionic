(function(){
  'use strict';

  angular.module('memryApp')
    .factory('Entry', Entry)
    .factory('Entries', Entries);

    // Collection routes
    Entries.$inject = ['$resource', 'Environment'];
    function Entries($resource, Environment) {
      return $resource(Environment.api_url + '/api/v1/entries', {}, {
        search: {
          method: 'GET',
          url: Environment.api_url + '/api/v1/entries/search'
        }
      });
    };

    // Member routes
    Entry.$inject = ['$resource', Environment];
    function Entry($resource, Environment){
      return $resource(Environment.api_url + '/api/v1/entries', {}, {});
    };
})();