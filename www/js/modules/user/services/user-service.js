(function(){
  angular.module('memryApp')
    .service('UserService', UserService);

    UserService.$inject = ['$state'];
    function UserService($state){
      var Users=[{
      		id: 1,
      		email:"test@gmail.com",
      		firstName:"test",
      		lastName:"user1"
      	},{
      		id: 2,
      		email:"test1@gmail.com",
      		firstName:"test1",
      		lastName:"user2"
      	},{
      		id: 3,
      		email:"test2@gmail.com",
      		firstName:"test2",
      		lastName:"user3"
      	}
      ]
      return {
      	getUser:function(email){
      		var filterUser=Users.filter(function(elem){
      			return elem.email==email;
      		});
      		return filterUser
      	}
      }
    }
})();
