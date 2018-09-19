import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class TarefaService {

  // URL da nossa API
  private url: string = 'http://localhost:8080/';

  constructor(private http: Http) { }

  // Pega as tarefas na API
  getTarefas() {
    return this.http
      .get(`${this.url}tarefas`)
      .map(res => res.json());
    //  console.log(getTarefas);
  }

  // Pega uma tarefa na API
  getTarefa(id_tarefa) {
    return this.http
      .get(this.url + 'tarefas/' + id_tarefa)
      .map(res => res.json());
  }

  // Adiciona uma tarefa na API
  addTarefa(tarefa) {
    return this.http
      .post(this.url + 'newTarefa', {'tarefa': tarefa})
      .map(res => res.json());
      // .map(res => console.log(res));
    // console.log(addTarefa);
  }

  // Atualiza uma tarefa na API
  updateTarefa(tarefa) {
    return this.http
      .put(this.url + 'updateTarefa/' + tarefa.id_tarefa, {'tarefa': tarefa})
      .map(res => res.json());
  }

  // finaliza uma tarefa na API
  updateFinalizada(tarefa) {
    return this.http
    .put(this.url + 'finalizaTarefa/' + tarefa.id_tarefa, {'tarefa': tarefa})
    .map(res => res.json());
  }

  // Deleta uma tarefa
  deleteTarefa(id_tarefa) {
    return this.http
      .delete(this.url + 'delTarefa/' + id_tarefa)
      .map(res => res.json());
  }

}
