(function() {
  'use strict';

  angular
    .module('s2it')
    .factory('localstorageService', ["$rootScope", localstorageService]);

  function localstorageService($rootScope) {
    
    return {

      setItem: function setItem(key, val) {      
        try {
          console.log("ls",key, val);
          localStorage.setItem(key, val);
          return true;
        } catch(err) {
          return false
        }
      },

      getItem: function getItem(key) {
        return localStorage[key];
      },

      reset: function reset() {
        try {
          localStorage.setItem("wallet-total", 0);
          localStorage.setItem("wallet-operations", []);
          $rootScope.$broadcast("reset");
          return true;
        } catch(err) {
          return false;
        }
      }

    }    
    

  }

})();
