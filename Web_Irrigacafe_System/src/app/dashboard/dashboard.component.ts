import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/** Importar servicos  */
import { DadosService } from './dados.service';

/** Importar informações do pdf  */
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

/**varivel global pode ser acessada */
declare var google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  private dados: any;
  private dadosFormatados = [];


  constructor(private dadosService: DadosService) {}

    ngOnInit() {

    /* --------------- Procedimentos para mostrar os dados de temperatura e umidade ---------------  */
      let temperatura = []; // variavel para dados da temperatura
      let umidade = []; // variavel para dados da umidade

      this.dadosService.dadosMetereologia()
      .subscribe((data) => {
        data.forEach(element => {
          // cria atributo para atribuir em cada variavel o valor de temperatura/umidade
          if (element.topic === 'temperatura') {
            this.temperatura = (element.message);
            // element.temperatura = element.message;
          } else {
           this.umidade = (element.message);
           // console.log('umid', element.umidade);
          }
         });
      });

    /* ----------------- Procedimentos para plotar o grafico  ---------------  */
      // criacao de variaveis
      // const dadosFormatados = [];
      let dadosLeitura = [];
      let formatNumber;
      let formatData;
      let day;
      let month;
      let year;
      let newData;
      // pega os dados do service e atribui nas variaveis
        this.dadosService.dadosMQTTChart().subscribe(
          (data) => {
            data.forEach(element => {
              if (element.topic === 'tensiometro') {
                // tratando numeros
                formatNumber = parseFloat(element.message);
                // tratando data
                formatData = new Date(element.date);
                day = formatData.getDate();
                month = formatData.getMonth();
                year = formatData.getFullYear();
                newData = day+'/'+month+'/'+year;
                dadosLeitura.push(newData, formatNumber);
              }
              // Caso não esteja vazio atribui
              if(dadosLeitura.length > 0) {
                this.dadosFormatados.push(dadosLeitura);
              }
              // Reseta as variáveis
              dadosLeitura = [];
              formatData = '';
              day = '';
              month = '';
              year = '';
              newData = '';
            });
            // this.dados = dadosLeitura;
            // this.init();

            console.log(this.dadosFormatados);
        });
       // console.log(dadosLeitura);

        this.dadosService.obterDados().subscribe(dados => {
          this.dados = dados;
          this.init(); /**notificaçao para gerar os graficos*/
        });
    }

    /*** Inicializa a API de graficos com delay de 1 seg, permitindo a integracao da API com o Angular */
    init(): void {
       if (typeof(google) !== 'undefined') { /**verificacao se foi injetado corretamente */
         google.charts.load('current', {'packages': ['corechart']});
         setTimeout(() => {
           google.charts.setOnLoadCallback(this.exibirGraficos());
         }, 1000);
       }
    }

     /** Metodo chamado assim que a API de graficos é inicializada
      * responsavel por chamar os metodos geradores dos graficos */

      exibirGraficos(): void {
        this.exibirLineChart();
        // this.exibirDonutChart();
        // this.exibirPieChart();
      }

    /** ---------------  Exibir o grafico Line Chart  --------------- */
    exibirLineChart(): void {
      const el = document.getElementById('line_chart');
      const chart = new google.visualization.LineChart(el); /**passa como parametro a div que sera exibida */

      /** draw - comando que deseja o grafico */
      chart.draw(this.obterDataTable(), this.obterOpcoes());
    }

    /** Cria e retorna o obj DataTable da Api de graficos, responsavel por definir os dados do grafico  */
    obterDataTable(): any {
      const data = new google.visualization.DataTable();

      data.addColumn('string', 'Dias');
      data.addColumn('number', 'Tensiometro 1 - (Kpa)');
      data.addColumn('number', 'Tensiometro 2 - (Kpa)');
      data.addColumn('number', 'Tensiometro 3 - (Kpa)');
      data.addRows(this.dadosFormatados);
      // data.addRows(this.dados);

      return data;
    }

    /** Vai retornar as opçoes do grafico, incluindo o titulo e tamanho*/
    obterOpcoes(): any {
      return {
        'title': '',
        'width': 850,
        'height': 500,
        colors: ['#0CD321', '#1140EE', '#EE1128'],
        backgroundColor: 'transparent',
        is3D:true,
        'legend':'bottom'
      };
    }

  /**
   * *********   Impressao do PDF **************
  */
  generatePDF(): any {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const rel = {  content: [
      'RELATÓRIO DAS LEITURAS DOS TENSIÔMETROS',
      // 'PERÍODO:',
      {text: 'PERÍODO:', bold: true },
      {
        layout: 'lightHorizontalLines', // opcional
        table: {
          headerRows: 1,
          widths: [ 150, '25%', '25%', '20%' ],

          body: [
            // [ { text: 'PERÍODO', bold: true }, '01/07/2018', 'a', ' 31/07/2018' ],
            [ 'DATAS', 'T1 (cm)', 'T2 (cm)', 'T3 (cm)' ],
            [ '20/08/2018', '18', '20', '0' ],
            [ '21/08/2018', '20', '20', '0' ],
            [ '22/08/2018', '21', '15', '0' ],
            [ '23/08/2018', '25', '20', '0' ],
            [ '24/08/2018', '30', '16', '0' ],
            [ '25/08/2018', '55', '5', '0' ],
            [ '31/08/2018', '35', '13', '0' ]
          ]
        }
      }
    ]};
    pdfMake.createPdf(rel).open();
  }
}
