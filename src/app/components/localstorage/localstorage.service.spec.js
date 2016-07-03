(function() {
  'use strict';

  describe('localstorage service', function() {

    var lsService;

    beforeEach(module('s2it'));


    beforeEach(inject(function(localstorageService) {      
      lsService = localstorageService;
      lsService.setItem("teste", "teste");
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

    it('precisa resetar a localStorage', function() {
        expect(lsService.reset()).toEqual(true);
        expect(lsService.getItem("teste")).not.toEqual("teste");
    });

  });

})();
