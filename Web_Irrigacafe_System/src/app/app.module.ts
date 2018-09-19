
// dependencias do angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { HttpClientModule} from '@angular/common/http'; // import para o grafico
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

// adiciona o arquivo das rotas
import { ROUTES } from './app.routes';

// inclui os componentes
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';

import { LoginComponent } from './login/login.component';
import { UsuarioComponent } from './login/usuario/usuario.component';
import { AuthService } from './login/shared/auth.service';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DadosService } from './dashboard/dados.service';

import { TarefasComponent } from './tarefas/tarefas.component';
import { TarefaFormComponent } from './tarefas/tarefa-form/tarefa-form.component';
import { TarefaService } from './tarefas/shared/tarefa.service';

// inclui grafico
import { Chart } from 'chart.js';
import { ChartsModule } from 'ng2-charts';


// Adicionamos em imports a contant routes e tambem nosso service em Providers
@NgModule({
  declarations: [
    AppComponent,
    TarefasComponent,
    TarefaFormComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    UsuarioComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ChartsModule,
    RouterModule.forRoot(ROUTES)
  // DashboardModule
  //  MaterializeModule
  ],
  providers: [
    AuthService,
    DadosService,
    TarefaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
