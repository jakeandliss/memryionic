(function(){
	angular.module('memryApp')
    .config(Config);

    Config.$inject=['$stateProvider']
    function Config($stateProvider){
    	$stateProvider
      .state('app.group',{
    		url:"/group",
    		views: {
            'group': {
              templateUrl: function(){
                return 'js/modules/group/views/'+ window.templateMode +'/index.html';
              },
              controller: 'GroupCtrl'
            }
          }
    	})
      .state('app.selectGroup',{
        url:"/group/:id",
        views: {
            'group': {
              templateUrl: function(){
                return 'js/modules/group/views/'+ window.templateMode +'/index.html';
              },
              controller: 'GroupCtrl'
            }
          }
      })
      .state('app.selectMobileGroup',{
        url:"/group/:id",
        views: {
            'group': {
              templateUrl: function(){
                return 'js/modules/group/views/'+ window.templateMode +'/new.html';
              },
              controller: 'GroupCtrl'
            }
          }
      })
    }
})()