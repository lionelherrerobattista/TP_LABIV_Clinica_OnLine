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
import { MatDialog } from '@angular/material/dialog';
import { ModalRegistroComponent } from '../modal-registro/modal-registro.component';

@Component({
  selector: 'app-registro-profesional',
  templateUrl: './registro-profesional.component.html',
  styleUrls: ['./registro-profesional.component.css']
})
export class RegistroProfesionalComponent implements OnInit {

  dniInput:FormControl;
  nombre:string;
  apellido:string;
  email:string;
  dni:number;
  especialidades:string[];
  especialidad:string;
  clave:string;
  archivoFoto:File;
  urlFoto:string;

  constructor(
    private profesionalService:ProfesionalService,
    private fstorage:FstorageService,
    private authService: AuthService,
    private matDialog: MatDialog,


  ) {
      this.especialidades = [];
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
  registrarProfesional() {

    let profesional;
    let path;
    let referencia:AngularFireStorageReference;
    let tarea:AngularFireUploadTask;
    let urlFoto:Observable<string>;

    path= `profesionales/${Date.now()}_${this.archivoFoto.name}`;

    referencia = this.fstorage.getReferencia(path);

    tarea = this.fstorage.subirArchivo(path, this.archivoFoto);

    console.log('sube');

    tarea.snapshotChanges().pipe(
      finalize(() => referencia.getDownloadURL().subscribe( url => {
        this.urlFoto = url;
        this.guardarProfesional();
      }))
    ).subscribe();
  }

  guardarProfesional() {
    let profesional:Profesional;

    //Crear profesional
    profesional = new Profesional(this.nombre, this.apellido,
      this.dni, this.email, this.urlFoto, this.especialidades);

    //Subir a la db
    this.profesionalService.createProfesional(profesional).then( respuesta => {
      this.abrirModalResultado();
    }, error => {
      console.log('Error: ' + error);
    });

  }

  ///Agrega una especialidad al array de especialidades
  agregarEspecialidad(){
    if(this.especialidad != undefined && this.especialidad != "") {
      this.especialidades.push(this.especialidad);
      this.especialidad = "";
    }
  }

  abrirModalResultado() {

    //Abrir el modal de material
    this.matDialog.open(ModalRegistroComponent, {
      data: {
        resultado: 'Profesional cargado',
      },

    });

  }


}
