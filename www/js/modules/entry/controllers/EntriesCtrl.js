(function(){
  'use strict';

  angular.module('memryApp')
    .controller('EntriesCtrl', EntriesCtrl);

    EntriesCtrl.$inject = ['$scope', 'Entries', '$ionicModal'];
    function EntriesCtrl($scope, Entries, $ionicModal){
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

      // Add Entry
      $scope.entry.add = function(entry) {
        $scope.entries.push($scope.entry);
        $scope.entry = '';
      };

      // Edit Entry
      $scope.entries = Entries.all();
      $scope.edit = function(entry) {
        Entries.remove(entry);
      };

      // Update Entry
      $scope.update = function(entry) {
        Entries.update(entry);
      };

      // Remove Entry
      $scope.remove = function(entry) {
        Entries.remove(entry);
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
