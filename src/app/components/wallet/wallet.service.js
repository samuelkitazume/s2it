(function() {
  'use strict';

  angular
    .module('s2it')
    .factory('walletService', ["localstorageService", "$rootScope", walletService]);

  function walletService(lsService, $rootScope) {
    var wallet = {},
        op = lsService.getItem("operations");

    wallet.total = +lsService.getItem("total") || 0;
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
        operate: function operate(val) {
            var positive = val>=0;
            wallet.total += val;
            wallet.operations.push({
                type: positive ? "in" : "out",
                value: val
            });
            $rootScope.$broadcast("wallet.changed");
        },
        persist: function persist() {
            lsService.setItem("total", wallet.total);
            lsService.setItem("operations", JSON.stringify(wallet.operations));
        }
    };
    
  }

})();
