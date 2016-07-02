(function() {
  'use strict';

  angular
    .module('s2it')
    .factory('walletService', ["localstorageService", walletService]);

  function walletService(lsService) {
    var wallet = {},
        op = lsService.getItem("operations");

    wallet.total = lsService.getItem("total") || 0;
    wallet.operations = op ? JSON.parse(op) : [];

    return {
        getTotal: function getTotal() {
            return wallet.total;
        },
        getOperations: function getOperations(op) {             
            if (op == "in") {
                return wallet.operations.filter(function(row) { return row.type == "in" })
            } else if (op == "out") {
                return wallet.operations.filter(function(row) { return row.type == "out" })
            } else return wallet.operations
        },
        setOperation: function setOperation() {

        }
    };
    
  }; 

})();
