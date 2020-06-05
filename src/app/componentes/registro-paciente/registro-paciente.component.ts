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
  archivoFoto:File[];
  urlFotoUno:string;
  urlFotoDos:string;
  nuevoUsuario;
  referenciaFotoUno:AngularFireStorageReference;
  referenciaFotoDos:AngularFireStorageReference;
  vistaPreviaImagenes;

  constructor(
    private usuarioService:UsuarioService,
    private fstorage:FstorageService,
    private authService: AuthService,
    private matDialog: MatDialog,
  ) {
    this.dniInput = new FormControl('', [Validators.pattern('^[0-9]*$')]); //controla el patrón del dni
    this.archivoFoto = [];
   }

  ngOnInit(): void {
  }

  cambioArchivo(event) {

    let archivos = event.target.files;
    this.vistaPreviaImagenes = [];
    console.log("hola");

    if (archivos) {
        
      for (let archivo of archivos) {
        this.archivoFoto.push(archivo);

        //Mostrar vista previa de la imagen
        let reader = new FileReader();
        
        reader.onload = (e) => { 
          this.vistaPreviaImagenes.push(e.target.result);
        }
        reader.readAsDataURL(archivo);            
      }
    }
  }

  // subirArchivo(archivoFoto):AngularFireStorageReference {
  //   let referencia:AngularFireStorageReference;

  //   referencia = this.fstorage.getReferencia(archivoFoto.name);
  //   this.referenciaStorage = this.fstorage.getReferencia(archivoFoto.name);

  //   this.fstorage.subirArchivo(archivoFoto.name, this.archivoFoto);

  //   return referencia;
  // }

  ///Valida que el dni solo acepte números
  getErrorMessage() {
    if(this.dniInput.hasError('pattern')) {

      return "No es un dni válido"

    }
  }

  ///Guarda al profesional en la base de datos
  registrarUsuario() {

    let pathFotoUno;
    let pathFotoDos;
    let referenciaFotoUno:AngularFireStorageReference;
    let referenciaFotoDos:AngularFireStorageReference;
    let tareaUno:AngularFireUploadTask;
    let tareaDos:AngularFireUploadTask;
      
    pathFotoUno= `pacientes/${Date.now()}_${this.archivoFoto[0].name}`;
    pathFotoDos= `pacientes/${Date.now()}_${this.archivoFoto[1].name}`;

    this.referenciaFotoUno = this.fstorage.getReferencia(pathFotoUno);
    this.referenciaFotoDos = this.fstorage.getReferencia(pathFotoDos);

    tareaUno = this.fstorage.subirArchivo(pathFotoUno, this.archivoFoto[0]);
    tareaDos = this.fstorage.subirArchivo(pathFotoDos, this.archivoFoto[1]);
    
    console.log('sube');
    
    tareaUno.snapshotChanges().pipe(
      finalize(() => this.referenciaFotoUno.getDownloadURL().subscribe( url => {
        this.urlFotoUno = url;
        this.referenciaFotoDos.getDownloadURL().subscribe( url => {
          this.urlFotoDos = url;
          this.guardarUsuario();
        })
      }))
    ).subscribe();
  }

  guardarUsuario() {
    
    let metadatos;

    this.authService.registrarUsuario(this.email, this.clave).then( respuesta => {
      
      //Crear paciente
      this.nuevoUsuario = new Paciente(respuesta.user.uid, this.nombre, this.apellido,
      this.dni, this.email, this.urlFotoUno, this.urlFotoDos);

      //Guardar metadatos del usuario en la foto
      metadatos = {
        customMetadata : {
          usuario: JSON.stringify(this.nuevoUsuario),
        }
      }

      //Subir los metadatos, suscribirse a uno y después hacer el otro sino error
      this.referenciaFotoUno.updateMetadata(metadatos).subscribe(metadatos => {
        
        this.referenciaFotoDos.updateMetadata(metadatos).subscribe();

      }, error => console.log("Error:" + error));
      

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
