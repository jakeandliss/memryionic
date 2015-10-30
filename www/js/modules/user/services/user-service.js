(function(){
  angular.module('memryApp')
    .service('UserService', UserService);
 
    UserService.$inject = ['$state','$http'];
    function UserService($state,$http){
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
      var baseAddress="http://104.236.57.97:8085/";
      return {
      	getUser:function(email){
      		var filterUser=Users.filter(function(elem){
      			return elem.email==email;
      		});
      		return filterUser
      	},
        createAccount:function(user){
          var _userRegistration={"userRegistration":user};
          return $http({method:"POST",url:baseAddress+"api/v1/users.json",data:_userRegistration})
        },
        login:function(user){
          var _user={"user":user}
          return $http.post(baseAddress+"api/v1/sessions.json",_user)
          //return $http({method:"POST",url:baseAddress+"api/v1/sessions.json",data:_user})
        }
      }
    }
})();
