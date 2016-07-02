(function() {
  'use strict';

  describe('localstorage service', function() {

    var lsService;

    beforeEach(module('s2it'));

    beforeEach(function() {
      localStorage.setItem("teste", "teste");      
    });

    beforeEach(inject(function(localstorageService) {      
      lsService = localstorageService;
    }));

    afterEach(function() {
      localStorage.removeItem("teste");
    });

    it('precisa persistir na teste2.valor=1 na localStorage', function() {            
      expect(lsService.setItem("teste2", "teste2")).toEqual(true);
    });

    it('precisa retornar teste2 = teste2 && teste = teste', function() {       
      expect(lsService.getItem("teste")).toEqual("teste");
      expect(lsService.getItem("teste2")).toEqual("teste2");      
    });

  });

})();
