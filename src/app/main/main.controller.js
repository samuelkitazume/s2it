(function() {
  'use strict';

  angular
    .module('s2it')
    .controller('MainController', ["walletService", "localstorageService", MainController]);

  /** @ngInject */
  function MainController(walletService, lsService) {
    var vm = this;

    vm.balance = walletService.getTotal();
    vm.operations = walletService.getOperations();
    
  }
})();
