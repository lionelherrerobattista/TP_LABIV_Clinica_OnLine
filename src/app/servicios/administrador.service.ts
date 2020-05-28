import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Profesional } from '../clases/profesional';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Administrador } from '../clases/administrador';


@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  listaOriginal:Observable<Profesional[]>;
  listaAdministradores:Subject<Profesional[]>;

  constructor(private db:AngularFirestore) {
    this.listaAdministradores = new Subject<Profesional[]>();

      //Guardo el documento de las fotos, el pipe es para tener el id
      this.listaOriginal = this.db.collection('administradores').snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...(data as Profesional) } ;
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
