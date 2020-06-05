import { Component, OnInit } from '@angular/core';
import { Profesional } from 'src/app/clases/profesional';
import {FormControl, Validators, Form} from '@angular/forms';
import { FstorageService } from 'src/app/servicios/fstorage.service';
import { AngularFireStorageReference } from '@angular/fire/storage/ref';
import { AngularFireUploadTask } from '@angular/fire/storage/task';
import { finalize} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalRegistroComponent } from '../modal-registro/modal-registro.component';
import { UsuarioService } from 'src/app/servicios/usuario.service';

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
  nuevoUsuario;
  referenciaStorage;
  vistaPreviaImagenes;

  constructor(
    private usuarioService:UsuarioService,
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

    let archivos = event.target.files;
    this.vistaPreviaImagenes = [];
    console.log("hola");

    if (archivos) {
      
      
      for (let archivo of archivos) {
        this.archivoFoto = archivo;

        console.log(archivo)
        
        //Mostrar vista previa de la imagen
        let reader = new FileReader();
        
        reader.onload = (e) => { 
          this.vistaPreviaImagenes.push(e.target.result);
        }

        reader.readAsDataURL(archivo); 
        
        
      }

      console.log(this.vistaPreviaImagenes)

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
  registrarUsuario() {

    let profesional;
    let path;
    let referencia:AngularFireStorageReference;
    let tarea:AngularFireUploadTask;
    let urlFoto:Observable<string>;

    path= `profesionales/${Date.now()}_${this.archivoFoto.name}`;

    referencia = this.fstorage.getReferencia(path);
    this.referenciaStorage = this.fstorage.getReferencia(path);

    tarea = this.fstorage.subirArchivo(path, this.archivoFoto);

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
      this.nuevoUsuario = new Profesional(respuesta.user.uid, this.nombre, this.apellido,
      this.dni, this.email, this.urlFoto, this.especialidades);

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
