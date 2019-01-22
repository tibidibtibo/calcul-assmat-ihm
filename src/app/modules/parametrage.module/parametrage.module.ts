import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutesModule } from '../../app.routes.module';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { AccordionModule } from 'ngx-bootstrap/accordion';

import { ParametrageComponent } from './parametrage.component';
import { GestionParametrageComponent } from './gestion-parametrage.component/gestion-parametrage.component';
import { ParametrageEnfantComponent } from './gestion-parametrage.component/parametrage-enfant.component/parametrage-enfant.component';
import { ParametrageEmployeComponent } from './gestion-parametrage.component/parametrage-employe.component/parametrage-employe.component';

import { DateService } from './../../services/date.service';
import { HttpService } from '../../services/http.service';
import { ReferentielService } from './../../services/referentiel.service';

@NgModule({
  declarations: [
    ParametrageComponent,
    GestionParametrageComponent,
    ParametrageEmployeComponent,
    ParametrageEnfantComponent
  ],
  imports: [
    AppRoutesModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule.forRoot(),
    TimepickerModule.forRoot(),
    TabsModule.forRoot()
  ],
  providers: [
    HttpService,
    ReferentielService,
    DateService
  ],
  bootstrap: [ParametrageComponent]
})
export class ParametrageModule { }
