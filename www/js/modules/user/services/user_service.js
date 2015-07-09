(function(){
  angular.module('memryApp')
    .service('UserService', UserService);

    UserService.$inject = ['$state'];
    function UserService($state){
      console.log('In user service');
      this.demoMethod = function(){
        console.log('In demo method of demo user service');
      };
    }
})();
