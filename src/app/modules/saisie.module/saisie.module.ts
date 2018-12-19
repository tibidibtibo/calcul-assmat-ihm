import { ImportSaisieComponent } from './import-saisie.component/import-saisie.component';
import { ReferentielService } from './../../services/referentiel.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { GestionSaisieComponent } from './gestion-saisie.component/gestion-saisie.component';
import { NouvelleSaisieComponent } from './nouvelle-saisie.component/nouvelle-saisie.component';
import { SaisieComponent } from './saisie.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { AppRoutesModule } from '../../app.routes.module';

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
