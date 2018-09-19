import { Component, OnInit } from '@angular/core';

// importa o service para comunicar com a API
import { TarefaService } from './../shared/tarefa.service';

// importa o model
import { Tarefa} from './../shared/tarefa';

// importa o Router para pegar o parametro id
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tarefa-form',
  templateUrl: './tarefa-form.component.html',
  styleUrls: ['./tarefa-form.component.css']
})
export class TarefaFormComponent implements OnInit {

  // cria uma varivel string para saber se é uma edicao ou inclusao de tarefa
  title: string;

  // pega o model e coloca na varivel tarefa
  tarefa: Tarefa = new Tarefa();
  // id: Number;

  constructor(
    // declara as dependencias
    private tarefaService: TarefaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  // Esse metodo executa enquanto a pagina é carregada para preencher a tarefa caso seja uma edicao
  ngOnInit() {
    this.route.params.subscribe(async (params) => {
      this.title = params['id'] ? 'Editar Tarefa' : 'Criar Nova Tarefa';
      this.id = params['id'];


      this.tarefaService.getTarefa(params['id'])
      .subscribe(tarefa => {
        this.tarefa = tarefa;
      });
    }); // retorna objeto
  }

  //*------------- chama esta metodo no form quando estiver pronto para criar uma tarefa ou editar  --------------- *
  save() {
    const result = null;
    console.log(result);
    if (this.tarefa.id) {
      result = this.tarefaService.updateTarefa(this.tarefa);
       console.log(this.tarefa);
    } else {
      result = this.tarefaService.addTarefa(this.tarefa);
      // console.log(this.tarefa);
    }
    result.subscribe(data => this.router.navigate(['/tarefas']));
    // result.subscribe(data => console.log(data));
  }
}

