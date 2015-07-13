(function(){
	'use strict';

	angular.module('memryApp')
		.factory('Entry', Entry)
		.factory('Entries', Entries);

		// Collection routes
		Entries.$inject = ['$resource'];
		function Entries($resource) {
			return $resource('http://localhost:3000/api/v1/entries/search.json', {}, {
				search: { 
          method: 'GET',
          url: 'http://localhost:3000/api/v1/entries/search.json'
        }
			});
		};

		// Member routes
		Entry.$inject = ['$resource'];
		function Entry($resource){
			return $resource('http://localhost:3000/api/v1/entries.json', {}, {});
		};
})();