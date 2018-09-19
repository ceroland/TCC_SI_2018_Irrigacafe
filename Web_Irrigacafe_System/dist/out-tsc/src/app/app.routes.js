"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// importa os componentes criados
var home_component_1 = require("./home/home.component");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var login_component_1 = require("./login/login.component");
var usuario_component_1 = require("./login/usuario/usuario.component");
var tarefas_component_1 = require("./tarefas/tarefas.component");
var tarefa_form_component_1 = require("./tarefas/tarefa-form/tarefa-form.component");
// import {Routes} from '@angular/router';
// import { TarefaRoutes } from './tarefas/';
// cria as rotas
exports.ROUTES = [
    { path: '', component: home_component_1.HomeComponent },
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'usuario', component: usuario_component_1.UsuarioComponent },
    { path: 'tarefas', component: tarefas_component_1.TarefasComponent },
    { path: 'tarefas/new', component: tarefa_form_component_1.TarefaFormComponent },
    { path: 'tarefas/:id', component: tarefa_form_component_1.TarefaFormComponent },
    { path: 'tarefas/:id/edit', component: tarefa_form_component_1.TarefaFormComponent }
];
//# sourceMappingURL=app.routes.js.map