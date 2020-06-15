import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { map, filter, first } from 'rxjs/operators';
import { Usuario } from '../clases/usuario';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  listaOriginal:Observable<Usuario[]>;
  listaUsuarios:Subject<Usuario[]>;


  constructor(
    private db:AngularFirestore,
    private authService:AuthService,
  ) {
    
    //Inicializar las listas
    this.listaUsuarios = new Subject<Usuario[]>();

      //El pipe es para mapear los datos
      this.listaOriginal = this.db.collection('usuarios').snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...(data as any) } ;
          });
        })
      );
  }

  ///Devuelve el listado entero de usuarios
  devolverListado(){
    return this.listaOriginal;
  }

  filtrarListaPorPerfil(filtroPerfil:string){   
    let listaFiltrada;

    this.listaOriginal.subscribe(lista => {

      listaFiltrada = lista.filter(usuario => usuario.perfil == filtroPerfil);

      this.listaUsuarios.next(listaFiltrada);

    })
  }

  ///Actualiza el listado
  actualizarListado() {
    this.listaOriginal.subscribe( usuarios => {
      this.listaUsuarios.next(usuarios);
    });
  }

  getUsuarios() {
    return this.listaOriginal; 
  }

  getUsuario(uid:string):Observable<Usuario> {
    return this.listaOriginal.pipe(
      map( usuarios => usuarios.find(usuario => usuario.uid == uid))
    );
  }

  async getUsuarioActual(){
    let usuarioLogeado = await this.authService.getUsuarioLogeado();
    console.log(usuarioLogeado);
    let usuario = await this.getUsuario(usuarioLogeado.uid).pipe(first()).toPromise();

    console.log(usuario)

    return usuario;
  }

  createUsuario(usuario:Usuario): Promise<DocumentReference> {
    return this.db.collection('usuarios').add({...usuario});//Si se crea como clase usar ...
  }

  updateUsuario(usuario:Usuario) {
    this.db.doc('usuarios/' + usuario.id).update({...usuario});
  }

  deleteUsuario(usuario:Usuario) {
    this.db.doc('usuarios/' + usuario.id).delete();
  }
}
