(function() {
  'use strict';

  angular
    .module('s2it')
    .factory('walletService', ["localstorageService", "$rootScope", walletService]);

  function walletService(lsService, $rootScope) {
    var wallet = {},
        op = lsService.getItem("wallet-operations");

    wallet.total = +lsService.getItem("wallet-total") || 0;
    wallet.operations = op ? JSON.parse(op) : [];

    return {
        getTotal: function getTotal() {
            return +wallet.total.toFixed(2);
        },
        getOperations: function getOperations(op) {             
            if (op == "in") {
                return wallet.operations.filter(function(row) { return row.type == "in" })
            } else if (op == "out") {
                return wallet.operations.filter(function(row) { return row.type == "out" })
            } else return wallet.operations
        },
        operate: function operate(val, type) {            
            type=="in" ? wallet.total += val : wallet.total -= val;
            wallet.operations.push({
                type: type,
                value: val
            });
            $rootScope.$broadcast("wallet.changed");
        },
        persist: function persist() {            
            lsService.setItem("wallet-total", wallet.total);
            lsService.setItem("wallet-operations", JSON.stringify(wallet.operations));
        }
    };
    
  }

})();