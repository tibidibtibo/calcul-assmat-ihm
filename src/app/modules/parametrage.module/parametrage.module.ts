import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutesModule } from '../../app.routes.module';

import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { AccordionModule } from 'ngx-bootstrap/accordion';

import { ParametrageComponent } from './parametrage.component';
import { GestionParametrageComponent } from './gestion-parametrage.component/gestion-parametrage.component';

import { DateService } from './../../services/date.service';
import { HttpService } from '../../services/http.service';
import { ReferentielService } from './../../services/referentiel.service';

@NgModule({
  declarations: [
    ParametrageComponent,
    GestionParametrageComponent
  ],
  imports: [
    AppRoutesModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule.forRoot(),
    TimepickerModule.forRoot()
  ],
  providers: [
    HttpService,
    ReferentielService,
    DateService
  ],
  bootstrap: [ParametrageComponent]
})
export class ParametrageModule { }
