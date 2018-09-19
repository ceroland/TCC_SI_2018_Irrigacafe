import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { Observable } from 'rxjs/Observable';

// importa o service / model
import { Usuario } from './usuario';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private usuario: Usuario = new Usuario();

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  /* chama esta metodo no form quando estiver pronto para criar um usuario
  validaLogin(usuario) {
    const count = this.authService.validUser(this.usuario);
    if(count === 0) {
      (confirm('Usuário e/ou senha inválidos!!'));
     }
    else {
      (confirm('Login efetuado com sucesso!!'));
    }
    result.subscribe(data => this.router.navigate(['/dashboard']));
  } */
}
