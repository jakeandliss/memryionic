(function(){
  angular.module('memryApp')
    .service('EntryService', EntryService);

    EntryService.$inject = ['$state'];
    function EntryService($state){
      console.log('Entry service');
      this.dummyMethod = function(){
        console.log('called dummyMethod');
      }
    };
})();
