"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// dependencias do angular
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var http_2 = require("@angular/common/http"); // import para o grafico
var router_1 = require("@angular/router");
var app_component_1 = require("./app.component");
// adiciona o arquivo das rotas
var app_routes_1 = require("./app.routes");
// inclui os componentes
var dados_service_1 = require("./dashboard/dados.service");
var home_component_1 = require("./home/home.component");
var header_component_1 = require("./header/header.component");
var login_component_1 = require("./login/login.component");
var usuario_component_1 = require("./login/usuario/usuario.component");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var auth_service_1 = require("./login/auth.service");
var tarefas_component_1 = require("./tarefas/tarefas.component");
var tarefa_form_component_1 = require("./tarefas/tarefa-form/tarefa-form.component");
var tarefa_service_1 = require("./tarefas/shared/tarefa.service");
var ng2_charts_1 = require("ng2-charts");
// Adicionamos em imports a contant routes e tambem nosso service em Providers
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                tarefas_component_1.TarefasComponent,
                tarefa_form_component_1.TarefaFormComponent,
                home_component_1.HomeComponent,
                header_component_1.HeaderComponent,
                login_component_1.LoginComponent,
                dashboard_component_1.DashboardComponent,
                usuario_component_1.UsuarioComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                http_2.HttpClientModule,
                ng2_charts_1.ChartsModule,
                router_1.RouterModule.forRoot(app_routes_1.ROUTES)
                // DashboardModule
                //  MaterializeModule
            ],
            providers: [
                auth_service_1.AuthService,
                dados_service_1.DadosService,
                tarefa_service_1.TarefaService
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map