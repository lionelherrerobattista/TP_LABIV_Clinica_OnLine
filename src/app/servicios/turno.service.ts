import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Usuario } from '../clases/usuario';
import { Turno } from '../clases/turno';
import { TurnoPedirComponent } from '../componentes/turno-pedir/turno-pedir.component';

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

  getTurno(idTurno:string):Observable<Turno> {
    return this.listaTurnos.pipe(
      map( turnos => turnos.find(usuario => usuario.idTurno == idTurno))
    );
  }

  createTurno(turno:Turno): Promise<DocumentReference> {
    delete turno.paciente.turnos
    delete turno.profesional.turnos

    return this.db.collection('turnos').add({...turno});//Si se crea como clase usar ...
  }

  updateTurno(turno:Turno) {
    this.db.doc('turnos/' + turno.idTurno).update(turno);
  }

  deleteTurno(turno:Turno) {
    this.db.doc('turnos/' + turno.idTurno).delete();
  }

  ///Filtra la lista por el string que se le pasa y el tipo de filtro
  getTurnosFiltrados(filtro, tipoFiltro:string){
    return this.listaTurnos.pipe(
      map( turnos => turnos.filter( turno => {
        
        let incluirEnLista = false;

        switch(tipoFiltro) {
          case "nombrePaciente":
            if(turno.paciente.apellido.indexOf(filtro) > -1)// > -1 si encuentra la string que le paso
            {
              incluirEnLista = true;
            }
            break;

          case "nombreProfesional":
            if(turno.profesional.apellido.indexOf(filtro) > -1)
            {
              incluirEnLista = true;
            }
            break;
          //historiaClinica puede ser undefined
          case "temperaturaCorporal":
            if( turno.paciente.historiaClinica != undefined &&
              turno.paciente.historiaClinica.temperaturaCorporal.indexOf(filtro) > -1)
            {
              incluirEnLista = true;
            }
            break;
          case "especialidad":
            if( turno.paciente.historiaClinica != undefined &&
              turno.especialidad.indexOf(filtro) > -1)
            {
              incluirEnLista = true;
            }
            break;
          case "dia":
            console.log(turno.diaHora.toDate().setHours(0,0,0,0));
            if( turno.diaHora.toDate().setHours(0,0,0,0) == filtro.setHours(0,0,0,0))
            {
              incluirEnLista = true;
            }
            break;
            
        }
        
        return incluirEnLista;})
      )
    )

  }
}
