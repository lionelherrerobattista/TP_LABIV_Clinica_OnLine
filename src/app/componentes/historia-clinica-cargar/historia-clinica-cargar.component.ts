import { Component, OnInit, Input } from '@angular/core';
import { Paciente } from 'src/app/clases/paciente';
import { datoExtra, HistoriaClinica } from 'src/app/clases/historia-clinica';
import { Profesional } from 'src/app/clases/profesional';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-historia-clinica-cargar',
  templateUrl: './historia-clinica-cargar.component.html',
  styleUrls: ['./historia-clinica-cargar.component.css']
})
export class HistoriaClinicaCargarComponent implements OnInit {

  @Input()pacienteActual:Observable<Paciente>;
  paciente:Paciente;
  @Input() profesionalActual:Observable<Profesional>;
  profesional:Profesional;
  agregarCampos:boolean;
  completarHistoriaClinica:boolean;
  actualizarHistoria:boolean;
  edad:number;
  temperaturaCorporal:number;
  presion:number;
  datoAdicional:datoExtra;
  reactiveForm:FormGroup;

  constructor(
    private usuarioService:UsuarioService,
  ) { 
    this.agregarCampos = false;
    this.completarHistoriaClinica = false;
    this.actualizarHistoria = false;
    this.datoAdicional = {
      nombreCampo: '',
      valor:'',
    }
  }

  ngOnInit(): void {
    //Para que se actualice el paciente
    this.pacienteActual.subscribe(usuario => {
      this.paciente = <Paciente>usuario;
      console.log(this.paciente);
    });

    this.profesionalActual.subscribe(usuario => {
      this.profesional = <Profesional>usuario;
      console.log(this.profesional);
    });

    this.reactiveForm = new FormGroup({
      // recaptchaReactive: new FormControl(null, Validators.required),
      edadReactive: new FormControl('', Validators.required),
      temperaturaCorporalReactive: new FormControl('', Validators.required),
      presionReactive: new FormControl('', Validators.required),
    });
  }

  crearHistoriaClinica(){
    this.agregarCampos = true;
    this.completarHistoriaClinica= true;
    this.paciente.historiaClinica = new HistoriaClinica(this.paciente.uid, this.profesional.uid, 0, 0, 0);
    

  }

  actualizarHistoriaClinica(){
    this.completarHistoriaClinica = true;
    this.agregarCampos = true;
    
  }

  agregarDatoExtra(){
    this.paciente.historiaClinica.datosExtra.push(this.datoAdicional);
  }

  guardarDatos(){
    this.paciente.historiaClinica = Object.assign({}, this.paciente.historiaClinica)
    this.usuarioService.updateUsuario(this.paciente);
  }

}
