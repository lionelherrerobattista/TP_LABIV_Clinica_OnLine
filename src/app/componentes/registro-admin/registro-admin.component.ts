import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, Form} from '@angular/forms';
import { FstorageService } from 'src/app/servicios/fstorage.service';
import { AngularFireStorageReference } from '@angular/fire/storage/ref';
import { AngularFireUploadTask } from '@angular/fire/storage/task';
import { finalize, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/servicios/auth.service';
import { Administrador } from 'src/app/clases/administrador';
import { MatDialog } from '@angular/material/dialog';
import { ModalRegistroComponent } from '../modal-registro/modal-registro.component';
import { UsuarioService } from 'src/app/servicios/usuario.service';



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
  nuevoAdministrador:Administrador;
  referenciaStorage;
  vistaPreviaImagenes;

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

  ///Guarda al usuario en la base de datos
  registrarUsuario() {

    let path;
    let referencia:AngularFireStorageReference;
    let tarea:AngularFireUploadTask;

    //Crear nombre del archivo
    path= `administradores/${Date.now()}_${this.archivoFoto.name}`;

    referencia = this.fstorage.getReferencia(path);
    this.referenciaStorage = this.fstorage.getReferencia(path);

    tarea = this.fstorage.subirArchivo(path, this.archivoFoto);

    //Guardar foto en firestorage
    tarea.snapshotChanges().pipe(
      finalize(() =>{

        referencia.getDownloadURL().subscribe( url => {
          this.urlFoto = url;
          this.guardarUsuario();
          
        });

        

      } )
    ).subscribe();
  }

  guardarUsuario() {

    let metadatos;
    
    this.authService.registrarUsuario(this.email, this.clave).then( respuesta => {
      
      //Crear administrador
      this.nuevoAdministrador = new Administrador(respuesta.user.uid, this.nombre, this.apellido,
      this.dni, this.email, this.urlFoto);

      //Guardar metadatos del usuario en la foto
      metadatos = {
        customMetadata : {
          usuario: JSON.stringify(this.nuevoAdministrador),
        }
      }

      this.referenciaStorage.updateMetadata(metadatos);

      //Guardar en la db
      this.usuarioService.createUsuario(this.nuevoAdministrador).then( respuesta => {

        this.abrirModalResultado();

      }, error => console.log('Error:' + error));
           
    }, error => console.log('Error: ' + error));
   
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
