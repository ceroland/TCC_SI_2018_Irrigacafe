import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarefasComponent } from './tarefas.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TarefasComponent
  ],
  exports: [
    TarefasComponent
  ],
  providers: [
    //DadosService,
    //TarefaService
  ]
})
export class TarefasModule { }
