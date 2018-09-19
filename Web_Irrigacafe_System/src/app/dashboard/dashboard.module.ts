import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DadosService } from './dados.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule

  ],
  declarations: [
    DashboardComponent
  ],
  exports: [
    DashboardComponent
  ],
  providers: [
    DadosService
  ]
})
export class DashboardModule { }
