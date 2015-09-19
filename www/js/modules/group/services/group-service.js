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
			add:function(group){
				if(groupList.length){
					var lastId=groupList[groupList.length-1].id;
					group.id=lastId+1;
				}else{
					group.id=1;
				}
				groupList.push(group);
			},
			update:function(group){
				var index=groupList.map(function(elem){return elem.id}).indexOf(group.id);
				groupList[index]=group;
			},
			delete:function(group){
				groupList.splice(groupList.indexOf(group),1);
			},
			removeUser:function(id,user){
				var Index=groupList.map(function(elem) {return elem.id}).indexOf(id);
				groupList[Index].users.splice(groupList[Index].users.indexOf(user),1);
			},
			SaveUser:function(id,user){
				angular.forEach(groupList,function(item){
					if(item.id==id){
						var findUser=item.users.filter(function(elem){
							return elem.email==user.email;
						})
						if(findUser.length<=0){
							item.users.push(user);
						}
					}
				})
			},
			modalInstance:{}
		}
	};
})()