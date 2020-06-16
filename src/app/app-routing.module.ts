import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroProfesionalComponent } from './componentes/registro-profesional/registro-profesional.component';
import { RegistroAdminComponent } from './componentes/registro-admin/registro-admin.component';
import { RegistroPacienteComponent } from './componentes/registro-paciente/registro-paciente.component';
import { ListaProfesionalesComponent } from './componentes/lista-profesionales/lista-profesionales.component';
import { ListaAdminsComponent } from './componentes/lista-admins/lista-admins.component';
import { ListaPacientesComponent } from './componentes/lista-pacientes/lista-pacientes.component';
import { TurnoPedirComponent } from './componentes/turno-pedir/turno-pedir.component';
import { TurnoCargarComponent } from './componentes/turno-cargar/turno-cargar.component';
import { EncuestaPacienteComponent } from './componentes/encuesta-paciente/encuesta-paciente.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {path: '', component: PrincipalComponent},
  {path: 'registro/administrador', component: RegistroAdminComponent, ...canActivate(redirectUnauthorizedToLogin)},
  {path: 'registro/paciente', component: RegistroPacienteComponent, ...canActivate(redirectUnauthorizedToLogin)},
  {path: 'registro/profesional', component: RegistroProfesionalComponent, ...canActivate(redirectUnauthorizedToLogin)},
  {path: 'lista/administrador', component: ListaAdminsComponent, ...canActivate(redirectUnauthorizedToLogin)},
  {path: 'lista/paciente', component: ListaPacientesComponent, ...canActivate(redirectUnauthorizedToLogin)},
  {path: 'lista/profesional', component: ListaProfesionalesComponent, ...canActivate(redirectUnauthorizedToLogin)},
  {path: 'turno/cargar', component: TurnoCargarComponent, ...canActivate(redirectUnauthorizedToLogin)},
  {path: 'turno/pedir', component: TurnoPedirComponent, ...canActivate(redirectUnauthorizedToLogin)},
  {path: 'login', component: LoginComponent},
  {path: 'principal', component: PrincipalComponent},
  {path: 'encuesta/paciente', component: EncuestaPacienteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
