import { Component, OnInit, Input } from '@angular/core';
import { Paciente } from 'src/app/clases/paciente';
import { datoExtra, HistoriaClinica } from 'src/app/clases/historia-clinica';
import { Profesional } from 'src/app/clases/profesional';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Router } from '@angular/router';
import { Turno } from 'src/app/clases/turno';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-historia-clinica-cargar',
  templateUrl: './historia-clinica-cargar.component.html',
  styleUrls: ['./historia-clinica-cargar.component.css']
})
export class HistoriaClinicaCargarComponent implements OnInit {

  @Input()pacienteActual:Observable<Paciente>;
  @Input()turnoSeleccionado:Turno;
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
    private router:Router,
    private snackBar: MatSnackBar,
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
      
    });

    this.profesionalActual.subscribe(usuario => {
      this.profesional = <Profesional>usuario;
      
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
    this.paciente.historiaClinica = new HistoriaClinica(this.paciente.uid, this.profesional.uid, 0, 0, '0');
    

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
    this.openSnackBar('Datos Guardados');
  }

  finalizarAtencion() {
    this.router.navigate(['encuestas/profesional', this.turnoSeleccionado.idTurno]);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Confirmar', {
      duration: 2000,
    });
  }

}
