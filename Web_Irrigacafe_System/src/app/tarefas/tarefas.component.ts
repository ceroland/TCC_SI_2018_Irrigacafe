import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// importa o service / model
import { TarefaService } from './shared/tarefa.service';
import { Tarefa} from './shared/tarefa';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css']
})
export class TarefasComponent implements OnInit {
  private tarefas: Tarefa;
  constructor(private tarefaService: TarefaService) { }
// pega a listagem de tarefas ao iniciar
  ngOnInit() {
    this.tarefaService.getTarefas()
    .subscribe((data) => {
      data.forEach(element => {
       // cria atributo para mudar o filtro de finalizadas
       if (element.finalizada) {
         element.finalizadaFormat = 'Sim';
       } else {
        element.finalizadaFormat = 'Não';
       }
      });
      this.tarefas = data
      // console.log(data);
    });
  }

// apaga uma tarefa
  deleteTarefa(tarefas) {
    if (confirm(' Você deseja deletar a tarefa: ' + tarefas.desc_tarefa + '?')) {
      var index = this.tarefas.indexOf(tarefas);
      this.tarefas.splice(index, 1);

      this.tarefaService.deleteTarefa(tarefas.id_tarefa)
      .subscribe(null);
    }
    // console.log(tarefas);
  }

// finalizar uma tarefa
  finalizaTarefa(tarefas) {
    // verifica se a tarefa esta finalizada
    console.log(tarefas.finalizada);
    if (tarefas.finalizada === false) {
      (confirm(' Você deseja finalizar a tarefa: ' + tarefas.desc_tarefa + '?'));
      this.tarefaService.updateFinalizada(tarefas)
      .subscribe(null);
      console.log(tarefas.id_tarefa);
      window.location.reload(1000);
    } else {
      (confirm(' A tarefa: ' + tarefas.desc_tarefa + ' já está finalizada!'));
    }
  }
}
