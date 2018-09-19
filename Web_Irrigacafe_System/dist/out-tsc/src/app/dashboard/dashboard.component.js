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
// import 'rxjs/add/operator/map';
// import {map} from 'rxjs/operators';
/** Importar servicos  */
var dados_service_1 = require("./dados.service");
/** Importar informações do grafico chart.js  */
// import { Chart } from 'chart.js';
/** Importar informações do pdf  */
var pdfMake = require("pdfmake/build/pdfmake");
var pdfFonts = require("pdfmake/build/vfs_fonts");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(dadosService) {
        this.dadosService = dadosService;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        var eixoX = [];
        var eixoY = [];
        this.dadosService.obterDados().subscribe(function (dados) {
            _this.dados = dados;
            _this.init(); /**notificaçao para gerar os graficos */
        });
        this.dadosService.dadosMQTTChart()
            .subscribe(function (res) {
            res.forEach(function (element) {
                //  console.log(element);
                eixoX.push(element.date + element.hour);
                eixoY.push(element.message);
            });
        });
        console.log(eixoX, eixoY);
    };
    /**
     * Inicializa a API de graficos com delay de 1 seg, permitindo a integracao da API com o Angular
     * @return void
     */
    DashboardComponent.prototype.init = function () {
        var _this = this;
        if (typeof (google) !== 'undefined') {
            google.charts.load('current', { 'packages': ['corechart'] });
            setTimeout(function () {
                google.charts.setOnLoadCallback(_this.exibirGraficos());
            }, 1000);
        }
    };
    /**
     * Metodo chamado assim que a API de graficos é inicializada
     * responsavel por chamar os metodos geradores dos graficos
     * @return void
     */
    DashboardComponent.prototype.exibirGraficos = function () {
        this.exibirLineChart();
        // this.exibirPieChart();
    };
    /**
   * Exibir o grafico Line Chart
   * @return void
   */
    DashboardComponent.prototype.exibirLineChart = function () {
        var el = document.getElementById('line_chart');
        var chart = new google.visualization.LineChart(el); /**passa como parametro a div que sera exibida */
        /** draw - comando que deseja o grafico */
        chart.draw(this.obterDataTable(), this.obterOpcoes());
    };
    /**
     * Cria e retorna o obj DataTable da Api de graficos, responsavel por definir os dados do grafico
     * @return any
     */
    DashboardComponent.prototype.obterDataTable = function () {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Dias');
        data.addColumn('number', 'Medidas');
        data.addRows(this.dados);
        return data;
    };
    /**
    * Vai retornar as opçoes do grafico, incluindo o titulo e tamanho
    * @return any
    */
    DashboardComponent.prototype.obterOpcoes = function () {
        return {
            'title': '',
            'width': 850,
            'height': 500
        };
    };
    /**
     * *********   Impressao do PDF **************
    */
    DashboardComponent.prototype.generatePDF = function () {
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        var rel = { content: [
                'RELATÓRIO DAS LEITURAS DOS TENSIÔMETROS',
                // 'PERÍODO:',
                { text: 'PERÍODO:', bold: true },
                {
                    layout: 'lightHorizontalLines',
                    table: {
                        // headers are automatically repeated if the table spans over multiple pages
                        // you can declare how many rows should be treated as headers
                        headerRows: 1,
                        widths: [100, '30%', '30%', '30%'],
                        body: [
                            // [ { text: 'PERÍODO', bold: true }, '01/07/2018', 'a', ' 31/07/2018' ],
                            ['DIA', 'T1 (cm)', 'T2 (cm)', 'T3 (cm)'],
                            ['1', '60', '80', '0'],
                            ['2', '40', '50', '10']
                        ]
                    }
                }
            ] };
        pdfMake.createPdf(rel).open();
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'app-dashboard',
            templateUrl: './dashboard.component.html',
            styleUrls: ['./dashboard.component.css']
        }),
        __metadata("design:paramtypes", [dados_service_1.DadosService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map