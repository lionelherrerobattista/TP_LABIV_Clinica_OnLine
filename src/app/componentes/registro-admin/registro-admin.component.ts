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
import { AdministradorService } from 'src/app/servicios/administrador.service';
import { Administrador } from 'src/app/clases/administrador';
import { MatDialog } from '@angular/material/dialog';
import { ModalRegistroComponent } from '../modal-registro/modal-registro.component';

@Component({
  selector: 'app-registro-admin',
  templateUrl: './registro-admin.component.html',
  styleUrls: ['./registro-admin.component.css']
})
export class RegistroAdminComponent implements OnInit {

  dniInput:FormControl;
  nombre:string;
  apellido:string;
  email:string;
  dni:number;
  clave:string;
  archivoFoto:File;
  urlFoto:string;

  constructor(
    private adminService:AdministradorService,
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
  registrarProfesional() {

    let path;
    let referencia:AngularFireStorageReference;
    let tarea:AngularFireUploadTask;


    path= `administradores/${Date.now()}_${this.archivoFoto.name}`;

    referencia = this.fstorage.getReferencia(path);

    tarea = this.fstorage.subirArchivo(path, this.archivoFoto);

    console.log('sube');

    tarea.snapshotChanges().pipe(
      finalize(() => referencia.getDownloadURL().subscribe( url => {
        this.urlFoto = url;
        this.guardarAdministrador();
      }))
    ).subscribe();
  }

  guardarAdministrador() {
    let administrador:Administrador;

    //Crear administrador
    administrador = new Administrador(this.nombre, this.apellido,
      this.dni, this.email, this.urlFoto);

    //Subir a la db
    this.adminService.createAdministrador(administrador).then( respuesta => {
      console.log('Cargado');
      this.abrirModalResultado();
    }, error => {
      console.log('Error: ' + error);
    });

  }

  abrirModalResultado() {

    //Abrir el modal de material
    this.matDialog.open(ModalRegistroComponent, {
      data: {
        resultado: 'Administrador cargado',
      },

    });

  }


}
