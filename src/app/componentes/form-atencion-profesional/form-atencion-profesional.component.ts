import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Profesional, HorarioAtencion } from 'src/app/clases/profesional';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/clases/usuario';



@Component({
  selector: 'app-form-atencion-profesional',
  templateUrl: './form-atencion-profesional.component.html',
  styleUrls: ['./form-atencion-profesional.component.css']
})
export class FormAtencionProfesionalComponent implements OnInit {

  dia:string;
  horario:string;
  displayedColumns: string[] = ['Día', 'Horario', 'Eliminar'];
  diasDeAtencion:HorarioAtencion[];
  @Input() usuarioActual:Observable<Usuario>;
  profesional:Profesional;
  estaRepetido:boolean;

  constructor(
    private authService:AuthService,
    private usuarioService:UsuarioService,
  ) {

    this.diasDeAtencion = [];
   }

  ngOnInit(): void {

    this.cargarLista();
  }

  async cargarLista() {

    this.usuarioActual.subscribe(usuario => {

      this.profesional = <Profesional>usuario;

      if(this.profesional != null && this.profesional.diasAtencion) {
        this.diasDeAtencion = this.profesional.diasAtencion;
      }     
    });
  }

  ///Guarda el día y horario de atención indicados 
  cargarDiaHorario() {
    let horarioAtencion:HorarioAtencion;
    this.estaRepetido= false;

    if(this.dia != undefined && this.horario != undefined) {

      //Comprobar que no esté repetido
      if(this.profesional.diasAtencion.length > 0) {
        for(let horarioAux of this.profesional.diasAtencion) {
          if(horarioAux.horario == this.horario && horarioAux.dia == this.dia) {
            this.estaRepetido = true;
          }
        }
      }
      
      if(!this.estaRepetido) {

        horarioAtencion ={
          dia:this.dia,
          horario: this.horario,
        } 
        
        this.profesional.diasAtencion.push(horarioAtencion);
        this.usuarioService.updateUsuario(this.profesional);
  
        // //orderar array
      } else {
        console.log("Está repetido");
      }
    }
  }

  ///Borra el horario que recibe como parámetro
  borrarDia(horarioParaBorrar:HorarioAtencion) {
    let indice;

    for(let horario of this.profesional.diasAtencion) {
      if(horario.dia == horarioParaBorrar.dia && horario.horario == horarioParaBorrar.horario) {
        indice = this.profesional.diasAtencion.indexOf(horario, 0);

        if(indice > -1) {
          this.profesional.diasAtencion.splice(indice, 1);
        }

        break;
      }
    }

    this.usuarioService.updateUsuario(this.profesional);
  }




}
