import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, Form} from '@angular/forms';
import { FstorageService } from 'src/app/servicios/fstorage.service';
import { AngularFireStorageReference } from '@angular/fire/storage/ref';
import { AngularFireUploadTask } from '@angular/fire/storage/task';
import { finalize, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/servicios/auth.service';
import { Paciente } from 'src/app/clases/paciente';
import { MatDialog } from '@angular/material/dialog';
import { ModalRegistroComponent } from '../modal-registro/modal-registro.component';
import { UsuarioService } from 'src/app/servicios/usuario.service';


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
  nuevoUsuario;
  referenciaStorage;

  constructor(
    private usuarioService:UsuarioService,
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
    this.referenciaStorage = this.fstorage.getReferencia(this.archivoFoto.name);

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
  registrarUsuario() {

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
        this.guardarUsuario();
      }))
    ).subscribe();
  }

  guardarUsuario() {
    
    let metadatos;

    this.authService.registrarUsuario(this.email, this.clave).then( respuesta => {
      
      //Crear paciente
      this.nuevoUsuario = new Paciente(respuesta.user.uid, this.nombre, this.apellido,
      this.dni, this.email, this.urlFoto, this.urlFoto);

      //Guardar metadatos del usuario en la foto
      metadatos = {
        customMetadata : {
          usuario: JSON.stringify(this.nuevoUsuario),
        }
      }

      this.referenciaStorage.updateMetadata(metadatos);

      //Guardar en la db
      this.usuarioService.createUsuario(this.nuevoUsuario).then( respuesta => {

        this.abrirModalResultado();

      }, error => console.log('Error:' + error));
           
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
