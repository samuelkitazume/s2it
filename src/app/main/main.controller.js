(function() {
  'use strict';

  angular
    .module('s2it')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr) {
    var vm = this;

    vm.value = 100;
    vm.operations = [{
      operation: "in",
      value: 100
    }, {
      operation: "out",
      value: 50
    }, {
      operation: "in",
      value: 200
    }];

    vm.balance = vm.value;
    
  }
})();
