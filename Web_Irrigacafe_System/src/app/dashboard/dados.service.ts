import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'; /**vai implementar o observatorio dos dados do graficos*/
// import 'rxjs/add/operator/map';
// import {map} from 'rxjs/operators';

@Injectable()
export class DadosService {

  /**array bidimensional com os dados estaticos*/

  readonly dados = [
    /*['Dia 1', 70],
    ['Dia 2', 10],
    ['Dia 3', 20],
    ['Dia 4', 50],
    ['Dia 5', 30]*/
    ['20/8/2018', 18, 20, 0],
    ['21/8/2018', 20, 20, 0],
    ['22/8/2018', 21, 15, 0],
    ['23/8/2018', 25, 20, 0],
    ['24/8/2018', 30, 16, 0],
    ['25/8/2018', 55, 5, 0],
    ['31/8/2018', 35, 13, 0]
  ];

  constructor(private _http: HttpClient) {}

  /** Retorna um observable com o array dos dados de temperatura e umidades */
  dadosMetereologia() {
    return this._http.get('http://localhost:8080/metereologia')
    .map(result => result);
  }

  /** Retorna um observable contendo os dados a serem exibidos no grafico */
  dadosMQTTChart() {
    return this._http.get('http://localhost:8080/tensiometro')
    .map(result => result);
  }

  obterDados(): Observable<any> {
    return new Observable(observable => {
      observable.next(this.dados); /**comando para notificar todos os inscritos*/
      observable.complete();
    });
  }
}
