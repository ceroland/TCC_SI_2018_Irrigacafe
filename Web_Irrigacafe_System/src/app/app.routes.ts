import { NgModule } from '@angular/core';
// importa o modulo de rotas do Angular
import { Routes, RouterModule } from '@angular/router';

// importa os componentes criados
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { UsuarioComponent } from './login/usuario/usuario.component';
import { TarefasComponent} from './tarefas/tarefas.component';
import { TarefaFormComponent } from './tarefas/tarefa-form/tarefa-form.component';
// import {Routes} from '@angular/router';
// import { TarefaRoutes } from './tarefas/';

// cria as rotas
export const ROUTES: Routes = [
  { path: '', component: HomeComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'login', component: LoginComponent},
  { path: 'usuario/new', component: UsuarioComponent},
  { path: 'tarefas', component: TarefasComponent},
  { path: 'tarefas/new', component: TarefaFormComponent},
  { path: 'tarefas/:id', component: TarefaFormComponent},
  { path: 'tarefas/edit/:id', component: TarefaFormComponent}

];

