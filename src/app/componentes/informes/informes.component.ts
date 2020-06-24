import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Usuario } from 'src/app/clases/usuario';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {

  listaIngresos;

  constructor(
    private usarioService:UsuarioService
  ) {
    this.listaIngresos = [];
  
  }

  ngOnInit(): void {
    this.mostrarIngresos();
  }

  ///Muestra los ingresos de todos los usuarios con prefil "profesional"
  mostrarIngresos(){
    let ingreso;

    this.usarioService.getUsuarios().subscribe(listaUsuarios =>{
      let listaProfesionales = listaUsuarios.filter(usuario => usuario.perfil == "profesional");
      
      //Cargar los ingresos
      for(let profesional of listaProfesionales){
        for(let dia of profesional.ingresos) {
          ingreso = {
            usuario: profesional.apellido + ", " + profesional.nombre,
            dia: dia,
          }

          this.listaIngresos.push(ingreso);
        }
      }

      //Guardar lista en archivo
      //Ordenar lista por segundos UNIX
      console.log(this.listaIngresos);
    })


  }

}
