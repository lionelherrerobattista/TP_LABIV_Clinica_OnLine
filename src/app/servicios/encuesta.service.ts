import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Encuesta } from '../clases/encuesta';

@Injectable({
  providedIn: 'root'
})

export class EncuestaService {

  listaEncuestas:Observable<Encuesta[]>;
  
  constructor(private db:AngularFirestore) {
    
    //El pipe es para mapear los datos
    this.listaEncuestas = this.db.collection('encuestas').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const idEncuesta = a.payload.doc.id;
          return { idEncuesta, ...(data as any) } ;
        });
      })
    );
  }

  ///Devuelve el listado entero de usuarios
  getEncuestas(){
    return this.listaEncuestas;
  }

  getEncuesta(idEncuesta:string):Observable<Encuesta[]> {
    return this.listaEncuestas.pipe(
      map( encuestas => encuestas.filter(encuesta => encuesta.idEncuesta == idEncuesta))
    );
  }

  createEncuesta(encuesta:Encuesta): Promise<DocumentReference> {
    return this.db.collection('encuestas').add({...encuesta});//Si se crea como clase usar ...
  }

  updateEncuesta(encuesta:Encuesta) {
    this.db.doc('encuestas/' + encuesta.idEncuesta).update(encuesta);
  }

  deleteEncuesta(encuesta:Encuesta) {
    this.db.doc('encuestas/' + encuesta.idEncuesta).delete();
  }
}
