(function(){
  angular.module('memryApp')
    .service('TagService', TagService);

    TagService.$inject = ['$state'];
    function TagService($state){
      console.log('In tag service');
      this.demoMethod = function(){
        console.log('In demo method');
      };
    }
})();
