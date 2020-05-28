import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Profesional } from '../clases/profesional';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Paciente } from '../clases/paciente';


@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  listaOriginal:Observable<Profesional[]>;
  listaPacientes:Subject<Profesional[]>;

  constructor(private db:AngularFirestore) {
    this.listaPacientes = new Subject<Profesional[]>();

      //Guardo el documento de las fotos, el pipe es para tener el id
      this.listaOriginal = this.db.collection('pacientes').snapshotChanges().pipe(
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
    return this.listaPacientes;
  }

  actualizarListado() {
    this.listaOriginal.subscribe( pacientes => {
      this.listaPacientes.next(pacientes);
    });
  }

  getPacientes() {
    return this.listaOriginal;
  }

  createPaciente(paciente:Paciente): Promise<DocumentReference> {
    return this.db.collection('pacientes').add({...paciente});//Si se crea como clase usar ...
  }

  updatePaciente(paciente:Paciente) {
    delete paciente.id;
    this.db.doc('pacientes/' + paciente.id).update(paciente);
  }

  deletePaciente(paciente:Paciente) {
    this.db.doc('pacientes/' + paciente.id).delete();
  }
}
