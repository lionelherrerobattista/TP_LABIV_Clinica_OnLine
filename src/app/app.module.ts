import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

//Material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PrincipalComponent } from './componentes/principal/principal.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule  } from '@angular/fire/storage';
import { environment } from '../environments/environment';


import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroProfesionalComponent } from './componentes/registro-profesional/registro-profesional.component';
import { RegistroPacienteComponent } from './componentes/registro-paciente/registro-paciente.component';
import { RegistroAdminComponent } from './componentes/registro-admin/registro-admin.component';
import { ListaProfesionalesComponent } from './componentes/lista-profesionales/lista-profesionales.component';
import { ListaAdminsComponent } from './componentes/lista-admins/lista-admins.component';
import { ListaPacientesComponent } from './componentes/lista-pacientes/lista-pacientes.component';
import { ModalRegistroComponent } from './componentes/modal-registro/modal-registro.component';

import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings, RecaptchaFormsModule } from 'ng-recaptcha';
import { TurnoPedirComponent } from './componentes/turno-pedir/turno-pedir.component';
import { TurnoCargarComponent } from './componentes/turno-cargar/turno-cargar.component';
import { FormAtencionProfesionalComponent } from './componentes/form-atencion-profesional/form-atencion-profesional.component';
import { TurnoProfesionalComponent } from './componentes/turno-profesional/turno-profesional.component';
import { TurnoAtenderComponent } from './componentes/turno-atender/turno-atender.component';
import { EncuestaPacienteComponent } from './componentes/encuesta-paciente/encuesta-paciente.component';
import { PacienteDetalleComponent } from './componentes/paciente-detalle/paciente-detalle.component';
import { CalendarioTurnoComponent } from './componentes/calendario-turno/calendario-turno.component';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    MenuComponent,
    RegistroComponent,
    LoginComponent,
    RegistroProfesionalComponent,
    RegistroPacienteComponent,
    RegistroAdminComponent,
    ListaProfesionalesComponent,
    ListaAdminsComponent,
    ListaPacientesComponent,
    ModalRegistroComponent,
    TurnoPedirComponent,
    TurnoCargarComponent,
    FormAtencionProfesionalComponent,
    TurnoProfesionalComponent,
    TurnoAtenderComponent,
    EncuestaPacienteComponent,
    PacienteDetalleComponent,
    CalendarioTurnoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatListModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    MatDialogModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
  ],
  providers: [{
    provide: RECAPTCHA_SETTINGS,
    useValue: {
      siteKey: '6LezX6MZAAAAAHD6dEgAmVl8ECAJUzmB3jOMzkjd',
    } as RecaptchaSettings,   
  },
  {
    provide: MAT_DATE_LOCALE,
    useValue: 'es-AR',
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
