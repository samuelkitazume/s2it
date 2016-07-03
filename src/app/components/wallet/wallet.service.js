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

    var walletChanged = function walletChanged() {
        $rootScope.$broadcast("wallet.changed");
    }

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
            walletChanged()
        },
        persist: function persist() {            
            lsService.setItem("wallet-total", wallet.total);
            lsService.setItem("wallet-operations", JSON.stringify(wallet.operations));
        },
        reverseOperation: function reverseOperation(index) {
            var operation = wallet.operations.splice(index, 1);            
            console.log(wallet.total, operation, operation.value, operation.type);
            operation = operation[0];
            if (operation.type == "in") {
                wallet.total -= operation.value;
            } else {
                wallet.total += operation.value;
            }
            walletChanged();
        }
    };
    
  }

})();