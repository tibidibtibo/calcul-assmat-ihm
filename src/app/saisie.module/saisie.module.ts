import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AppRoutesModule } from './../app.routes.module';
import { HttpService } from './../services/http.service';
import { GestionSaisieComponent } from './gestion-saisie.component/gestion-saisie.component';
import { NouvelleSaisieComponent } from './nouvelle-saisie.component/nouvelle-saisie.component';
import { SaisieComponent } from './saisie.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

@NgModule({
  declarations: [
    SaisieComponent,
    NouvelleSaisieComponent,
    GestionSaisieComponent
  ],
  imports: [
    AppRoutesModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot()
  ],
  providers: [
    HttpService
  ],
  bootstrap: [SaisieComponent]
})
export class SaisieModule { }
