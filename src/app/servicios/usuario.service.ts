import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Profesional } from '../clases/profesional';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Administrador } from '../clases/administrador';
import { Paciente } from '../clases/paciente';
import { Usuario } from '../clases/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  listaOriginal:Observable<Usuario[]>;
  listaUsuarios:Subject<Usuario[]>;


  constructor(private db:AngularFirestore) {
    
    //Inicializar las listas
    this.listaUsuarios = new Subject<Usuario[]>();

      //Guardo el documento de las fotos, el pipe es para tener el id
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
    return this.listaUsuarios;
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

  createUsuario(usuario:Usuario): Promise<DocumentReference> {
    return this.db.collection('usuarios').add({...usuario});//Si se crea como clase usar ...
  }

  updateUsuario(usuario:Usuario) {
    delete usuario.id;
    this.db.doc('usuarios/' + usuario.id).update(usuario);
  }

  deleteUsuario(usuario:Usuario) {
    this.db.doc('usuarios/' + usuario.id).delete();
  }
}
