import { Component, OnInit, Input } from '@angular/core';
// importa o Router para pegar o parametro id
import { Router, ActivatedRoute } from '@angular/router';

// importa o service para comunicar com a API
import { AuthService } from './../shared/auth.service';

// importa o model
import { Usuario } from './../shared/auth';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

   // pega o model e coloca na varivel usuario
   usuario: Usuario = new Usuario();

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  ngOnInit() {
  }

  // chama esta metodo no form quando estiver pronto para criar um usuario
  newUsers() {
    var result = null;
    result = this.authService.addUser(this.usuario);
    // console.log(this.usuario);

    result.subscribe(data => this.router.navigate(['/login']));

  }

}
