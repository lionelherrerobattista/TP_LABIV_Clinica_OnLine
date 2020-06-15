import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Usuario } from '../clases/usuario';
import { Turno } from '../clases/turno';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  listaTurnos:Observable<Turno[]>;
  
  constructor(private db:AngularFirestore) {
    
    //El pipe es para mapear los datos
    this.listaTurnos = this.db.collection('turnos').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const idTurno = a.payload.doc.id;
          return { idTurno, ...(data as any) } ;
        });
      })
    );
  }

  ///Devuelve el listado entero de usuarios
  getTurnos(){
    return this.listaTurnos;
  }

  getTurno(idTurno:string):Observable<Turno[]> {
    return this.listaTurnos.pipe(
      map( turnos => turnos.filter(turno => turno.idTurno == idTurno))
    );
  }

  createTurno(turno:Turno): Promise<DocumentReference> {
    return this.db.collection('turnos').add({...turno});//Si se crea como clase usar ...
  }

  updateTurno(turno:Turno) {
    this.db.doc('turnos/' + turno.idTurno).update(Turno);
  }

  deleteTurno(turno:Turno) {
    this.db.doc('turnos/' + turno.idTurno).delete();
  }
}
