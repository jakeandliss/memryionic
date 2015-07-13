(function(){
  'use strict';

  angular.module('memryApp')
    .controller('EntriesCtrl', EntriesCtrl);

    EntriesCtrl.$inject = ['$scope', 'EntriesUtil', '$ionicModal'];
    function EntriesCtrl($scope, EntriesUtil, $ionicModal){
      // viewModel acts as binding b/w views and ctrl
      // $scope should be left for events onlty slowly
      // shift all functions and vars to use vm
      var vm = this;

      $scope.entry = {};

      /* when user hits the cross icon in search bar
       * query should get cleared
       */
      vm.clearQuery = function(){
        vm.query = null;
      }

      vm.searchEntry = function(){
        // use vm.query to search
        // Firstly search for local entries
        // Call search entry api to get the matching entries.
      }

      // Add Entry
      $scope.entry.add = function(entry) {
        console.log('entries are ', $scope.entries);
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
