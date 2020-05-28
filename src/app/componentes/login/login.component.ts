import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string;
  clave:string;

  constructor(
    private authService: AuthService,
    private router:Router) { }

  ngOnInit(): void {

  }

  iniciarSesion(){
    console.log(this.email);
    console.log(this.clave);

    this.authService.iniciarSesion(this.email, this.clave).then( respuesta => {
      this.router.navigate(['/principal']);
    }, error => {
      console.log(error);
    })

  }

  ///Autocompleta el login segun el botón que toco
  completarLogin(usuario:string) {

    switch(usuario) {
      case 'admin':
        this.email = 'admin@admin.com';
        this.clave = 'admin1234';
        break;
    }
  }

}
