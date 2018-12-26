import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutesModule } from '../../app.routes.module';

import { HttpService } from '../../services/http.service';
import { ReferentielService } from './../../services/referentiel.service';

import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { GestionSaisieComponent } from './gestion-saisie.component/gestion-saisie.component';
import { NouvelleSaisieComponent } from './nouvelle-saisie.component/nouvelle-saisie.component';
import { SaisieComponent } from './saisie.component';
import { ImportSaisieComponent } from './import-saisie.component/import-saisie.component';

@NgModule({
  declarations: [
    SaisieComponent,
    NouvelleSaisieComponent,
    GestionSaisieComponent,
    ImportSaisieComponent
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
    HttpService,
    ReferentielService
  ],
  bootstrap: [SaisieComponent]
})
export class SaisieModule { }
