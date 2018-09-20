import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'; /**vai implementar o observatorio dos dados do graficos*/
// import 'rxjs/add/operator/map';
// import {map} from 'rxjs/operators';

@Injectable()
export class DadosService {

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
