(function(){
  'use strict';

  angular.module('memryApp')
    .controller('EntryListCtrl', EntryListCtrl);

    EntryListCtrl.$inject = ['$state'];
    function EntryListCtrl($state){
      console.log('In entry list controller');
    }
})();
