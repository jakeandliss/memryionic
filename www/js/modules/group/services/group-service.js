(function(){
	angular.module('memryApp')
	.factory("GroupServices",GroupServices) 
	GroupServices.$inject=['$sce']
		function GroupServices($sce){
		var groupList=[
			{id: 1,name: "testGroup1",users:[]},
			{id: 2,name: "testGroup2",users:[]}
		];
		return {
			all:function(){
				return groupList;
			},
			getGroup:function(id){
				var filterGroup=groupList.filter(function(elem){
					return elem.id==id;
				})
				return filterGroup;
			},
			removeUser:function(id,user){
				var Index=groupList.map(function(elem) {return elem.id}).indexOf(id);
				groupList[Index].users.splice(groupList[Index].users.indexOf(user),1);
			},
			SaveUser:function(id,user){
				// console.log(id);
				// var Index=groupList.map(function(e) {
				// 	console.log(e.id)
				// 	return e.id}).indexOf(id);
				// console.log(Index);
				// groupList[Index].users.push(user);
				angular.forEach(groupList,function(item){
					if(item.id==id){
						item.users.push(user);
					}
				})
			},
			modalInstance:{}
		}
	};
})()