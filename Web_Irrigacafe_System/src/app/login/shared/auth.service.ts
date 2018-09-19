import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class AuthService {

  private usuarioAutenticado: boolean = false;

   // URL da nossa API
   private url: string = 'http://localhost:8080/';


  constructor(private http: Http) { }

   // Pega os usuarios na API
   getUsers() {
    return this.http
      .get(`${this.url}users`)
      .map(res => res.json());
  }

   // Adiciona um novo usuario na API
  addUser(usuario) {
    return this.http
      .post(this.url + 'newUser', {'usuario': usuario})
      .map(res => res.json());
      // .map(res => console.log(res));
  }

  // validacao de usuarios
  validUser(usuario) {
    return this.http
      .post(this.url + 'autenticaLogin', {'usuario': usuario})
      .map(res => res.json());
      console.log('aqui', usuario);
  }


  // valida usuario
  // validUser(user: Usuario){

  //  if (user.nome === 'evelyn' && user.senha === '1234') {
  //    this.usuarioAutenticado = true;
      // this.mostrarMenuEmitter.emit(true);

   //   this.router.navigate(['/']); /**direciona o usuario para a tela principal */
  //  } else {
  //    this.usuarioAutenticado = false;
     // this.mostrarMenuEmitter.emit(false);
  //  }
  //}
}
