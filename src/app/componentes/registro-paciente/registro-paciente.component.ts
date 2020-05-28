import { Component, OnInit } from '@angular/core';
import { Profesional } from 'src/app/clases/profesional';
import { ProfesionalService } from 'src/app/servicios/profesional.service';
import {FormControl, Validators, Form} from '@angular/forms';
import { FstorageService } from 'src/app/servicios/fstorage.service';
import { AngularFireStorageReference } from '@angular/fire/storage/ref';
import { AngularFireUploadTask } from '@angular/fire/storage/task';
import { finalize, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { Paciente } from 'src/app/clases/paciente';
import { MatDialog } from '@angular/material/dialog';
import { ModalRegistroComponent } from '../modal-registro/modal-registro.component';


@Component({
  selector: 'app-registro-paciente',
  templateUrl: './registro-paciente.component.html',
  styleUrls: ['./registro-paciente.component.css']
})
export class RegistroPacienteComponent implements OnInit {

  dniInput:FormControl;
  nombre:string;
  apellido:string;
  email:string;
  dni:number;
  clave:string;
  archivoFoto:File;
  urlFoto:string;

  constructor(
    private pacienteService:PacienteService,
    private fstorage:FstorageService,
    private authService: AuthService,
    private matDialog: MatDialog,
  ) {
    this.dniInput = new FormControl('', [Validators.pattern('^[0-9]*$')]); //controla el patrón del dni
   }

  ngOnInit(): void {
  }

  cambioArchivo(event) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.archivoFoto = event.target.files[i];
      }
    }

  }

  subirArchivo():AngularFireStorageReference {
    let referencia:AngularFireStorageReference;

    referencia = this.fstorage.getReferencia(this.archivoFoto.name);

    this.fstorage.subirArchivo(this.archivoFoto.name, this.archivoFoto);

    return referencia;
  }

  ///Valida que el dni solo acepte números
  getErrorMessage() {
    if(this.dniInput.hasError('pattern')) {

      return "No es un dni válido"

    }
  }

  ///Guarda al profesional en la base de datos
  registrarPaciente() {

    let path;
    let referencia:AngularFireStorageReference;
    let tarea:AngularFireUploadTask;

    path= `profesionales/${Date.now()}_${this.archivoFoto.name}`;

    referencia = this.fstorage.getReferencia(path);

    tarea = this.fstorage.subirArchivo(path, this.archivoFoto);

    console.log('sube');

    tarea.snapshotChanges().pipe(
      finalize(() => referencia.getDownloadURL().subscribe( url => {
        this.urlFoto = url;
        this.guardarPaciente();
      }))
    ).subscribe();
  }

  guardarPaciente() {
    let paciente:Paciente;

    //Crear paciente
    paciente = new Paciente(this.nombre, this.apellido,
      this.dni, this.email, this.urlFoto, this.urlFoto);

    //Subir a la db
    this.pacienteService.createPaciente(paciente).then( respuesta => {

      this.authService.registrarUsuario(this.email, this.clave).then( respuesta => {
        this.abrirModalResultado();
      }, error => console.log('Error: ' + error));

    }, error => console.log('Error: ' + error));

  }

  abrirModalResultado() {

    //Abrir el modal de material
    this.matDialog.open(ModalRegistroComponent, {
      data: {
        resultado: 'Paciente cargado',
      },

    });

  }




}
