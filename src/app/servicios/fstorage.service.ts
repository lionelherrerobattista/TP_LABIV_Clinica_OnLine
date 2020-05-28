import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FstorageService {

  constructor(private storage:AngularFireStorage) {

  }

  subirArchivo(nombreArchivo:string, datos:any) {
    return this.storage.upload(nombreArchivo, datos);
  }

  getReferencia(nombreArchivo:string) {
    return this.storage.ref(nombreArchivo);
  }
}
