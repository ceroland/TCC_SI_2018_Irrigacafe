"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var Observable_1 = require("rxjs/Observable"); /**vai implementar o observatorio dos dados do graficos*/
// import 'rxjs/add/operator/map';
// import {map} from 'rxjs/operators';
var DadosService = /** @class */ (function () {
    function DadosService(_http) {
        this._http = _http;
        /**array bidimensional com os dados estaticos*/
        this.dados = [
            ['Dia 1', 70],
            ['Dia 2', 10],
            ['Dia 3', 20],
            ['Dia 4', 50],
            ['Dia 5', 30]
        ];
    }
    /**
     * Retorna um observable contendo os dados a serem exibidos no grafico
     * @return Observable<any>
     */
    DadosService.prototype.dadosMQTTChart = function () {
        return this._http.get('http://localhost:8080/mqtt')
            .map(function (result) { return result; });
    };
    DadosService.prototype.obterDados = function () {
        var _this = this;
        return new Observable_1.Observable(function (observable) {
            observable.next(_this.dados); /**comando para notificar todos os inscritos */
            observable.complete();
        });
    };
    DadosService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], DadosService);
    return DadosService;
}());
exports.DadosService = DadosService;
//# sourceMappingURL=dados.service.js.map