(function() {
  'use strict';

  angular
    .module('s2it')
    .controller('MainController', ["walletService", "localstorageService", "$rootScope", MainController]);

  /** @ngInject */
  function MainController(walletService, lsService, $rootScope) {
    var vm = this;

    vm.operationFieldValue = 0;
    vm.operationType="in";

    vm.reset = function reset() {
        lsService.reset();                
    };

    var update = function update() {
      vm.balance = walletService.getTotal();
      vm.operations = walletService.getOperations();      
    };

    update();

    vm.save = function save() {
      if (vm.operationFieldValue != undefined) {        
        walletService.operate(+(+vm.operationFieldValue).toFixed(2), vm.operationType);
      }
    };

    vm.persist = function persist() {
      walletService.persist();
    };

    var onWalletChangedEvent = $rootScope.$on("wallet.changed", update);

    var onResetEvent = $rootScope.$on("reset", update);

    //Expondo o método reset para ser utilizado no console
    (function(){
      window.resetS2ITApp = vm.reset;
    })()

    
  } 
})();
