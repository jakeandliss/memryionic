(function(){
  'use strict';

  angular.module('memryApp')
    .controller('EntriesCtrl', EntriesCtrl);

    EntriesCtrl.$inject = ['$scope', 'EntriesUtil', '$ionicModal', 'Entries'];
    function EntriesCtrl($scope, EntriesUtil, $ionicModal, Entries){
      // viewModel acts as binding b/w views and ctrl
      // $scope should be left for events onlty slowly
      // shift all functions and vars to use vm
      var vm = this;

      $scope.entry = {};

      /* when user hits the cross icon in search bar
       * query should get cleared
       */
      vm.clearQuery = function(){
        vm.query = '';
        vm.entries = EntriesUtil.all();
      }

      vm.searchEntry = function(){
        if(vm.query && vm.query.length > 0) {
          console.log('search term is', vm.query);
          Entries.search({query: vm.query})
            .$promise
            .then(function(response){
              console.log('response', response);
              vm.entries = response.entries;
            })
        } else{
          vm.entries = EntriesUtil.all();
        }
      }

      // Add Entry
      $scope.entry.add = function(entry) {
        vm.entries.push($scope.entry);
        $scope.entry = '';
      };

      // Edit Entry
      vm.entries = EntriesUtil.all();
      
      $scope.edit = function(entry) {
        EntriesUtil.remove(entry);
      };

      // Update Entry
      $scope.update = function(entry) {
        EntriesUtil.update(entry);
      };

      // Remove Entry
      $scope.remove = function(entry) {
        EntriesUtil.remove(entry);
      };

      $scope.entry.date = new Date();

      // This modal should only be used for mobile.
      $ionicModal.fromTemplateUrl('/js/modules/entry/views/mobile/new.html', function($ionicModal) {
          $scope.modal = $ionicModal;
      }, {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope,
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
      });
    }
})();
