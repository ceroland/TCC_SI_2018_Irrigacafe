"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var dados_service_1 = require("./dados.service");
describe('DadosService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [dados_service_1.DadosService]
        });
    });
    it('should be created', testing_1.inject([dados_service_1.DadosService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=dados.service.spec.js.map