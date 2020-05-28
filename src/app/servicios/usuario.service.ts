import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Profesional } from '../clases/profesional';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Administrador } from '../clases/administrador';
import { Paciente } from '../clases/paciente';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  listaOriginal:Observable<any[]>;
  listaAdministradores:Subject<Administrador[]>;
  listaProfesionales:Subject<Profesional[]>;
  listaPacientes:Subject<Paciente[]>;

  constructor(private db:AngularFirestore) {
    this.listaAdministradores = new Subject<any[]>();

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

  devolverListado(){
    return this.listaAdministradores;
  }

  actualizarListado() {
    this.listaOriginal.subscribe( administradores => {
      this.listaAdministradores.next(administradores);
    });
  }

  getAdministradores() {
    return this.listaOriginal;
  }

  createAdministrador(administrador:Administrador): Promise<DocumentReference> {
    return this.db.collection('administradores').add({...administrador});//Si se crea como clase usar ...
  }

  updateAdministrador(administrador:Administrador) {
    delete administrador.id;
    this.db.doc('administradores/' + administrador.id).update(administrador);
  }

  deleteAdministrador(administrador:Administrador) {
    this.db.doc('administradores/' + administrador.id).delete();
  }
}
