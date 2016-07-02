(function() {
  'use strict';

  angular
    .module('s2it')
    .factory('localstorageService', localstorageService);

  function localstorageService() {
    
    return {

      setItem: function setItem(key, val) {      
        try {
          localStorage.setItem(key, val);
          return true;
        } catch(err) {
          return false
        }
      },

      getItem: function getItem(key) {
        return localStorage[key];
      }

    }    
    

  }

})();
