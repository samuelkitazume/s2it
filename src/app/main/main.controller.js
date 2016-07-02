(function() {
  'use strict';

  angular
    .module('s2it')
    .controller('MainController', ["walletService", "localstorageService", "$rootScope", MainController]);

  /** @ngInject */
  function MainController(walletService, lsService, $rootScope) {
    var vm = this;

    vm.operationFieldValue = 0;

    var update = function update() {
      vm.balance = walletService.getTotal();
      vm.operations = walletService.getOperations();      
    };

    update();

    vm.save = function save() {
      if (vm.operationFieldValue != undefined) {
        walletService.operate(+vm.operationFieldValue);
      }
    };

    vm.persist = function persist() {
      walletService.persist();
    };

    var walletChangedEvent = $rootScope.$on("wallet.changed", update);
    
  }
})();
