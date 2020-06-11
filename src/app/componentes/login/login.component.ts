import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string;
  clave:string;
  reactiveForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      recaptchaReactive: new FormControl(null, Validators.required),
      emailReactive: new FormControl('', Validators.required),
      passReactive: new FormControl('', Validators.required),
    });
  }

  ngOnDestroy() {
    //unsuscribe
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
      case 'admin2':
        this.email = 'admin@clinicaonline.com';
        this.clave = 'admin4321';
        break;
      case 'paciente1':
        this.email = 'mariagonzales@clinicaonline.com';
        this.clave = 'maria4321';
        break;
      case 'paciente2':
        this.email = 'alfredogonzales@lalala.com';
        this.clave = 'alfredo1234';
        break;
      case 'médico1':
        this.email = 'prueba@prueba.com';
        this.clave = 'prueba1234';
        break;
      case 'médico2':
        this.email = 'jperez@clinicaonline.com';
        this.clave = 'profesional1234';
        break;
    }
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

}
