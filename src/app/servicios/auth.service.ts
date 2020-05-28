import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private auth: AngularFireAuth) { }

  ///Registra al usuario con el email y la pass enviadas en Firebase
  registrarUsuario(email:string, password:string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  ///Inicia sesión con un usuario registrado en Firebase
  iniciarSesion(email:string, password:string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  cerrarSesion() {
    this.auth.signOut().then( () => {

      window.location.reload();
    } );
  }


}
