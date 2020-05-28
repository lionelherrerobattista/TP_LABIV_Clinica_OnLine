import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Profesional } from '../clases/profesional';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ProfesionalService {

  listaOriginal:Observable<Profesional[]>;
  listaProfesionales:Subject<Profesional[]>;

  constructor(private db:AngularFirestore) {

    this.listaProfesionales = new Subject<Profesional[]>();

      //Guardo el documento de las fotos, el pipe es para tener el id
      this.listaOriginal = this.db.collection('profesionales').snapshotChanges().pipe(
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
    return this.listaProfesionales;
  }

  actualizarListado() {
    this.listaOriginal.subscribe( profesionales => {
      this.listaProfesionales.next(profesionales);
    });
  }

  getProfesionales() {
    return this.listaOriginal;
  }

  createProfesional(profesional:Profesional): Promise<DocumentReference> {
    return this.db.collection('profesionales').add({...profesional});//Si se crea como clase usar ...
  }

  updateProfesional(profesional:Profesional) {
    delete profesional.id;
    this.db.doc('profesionales/' + profesional.id).update(profesional);
  }

  deleteProfesional(profesional:Profesional) {
    this.db.doc('profesionales/' + profesional.id).delete();
  }
}
