(function() {
  'use strict';

  angular
    .module('s2it')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
