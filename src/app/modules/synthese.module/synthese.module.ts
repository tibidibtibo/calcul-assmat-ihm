import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutesModule } from '../../app.routes.module';

import { HttpService } from '../../services/http.service';

import { VisualisationSyntheseComponent } from './visualisation-synthese.component/visualisation-synthese.component';
import { SyntheseComponent } from './synthese.component';

@NgModule({
  declarations: [
    SyntheseComponent,
    VisualisationSyntheseComponent
  ],
  imports: [
    AppRoutesModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    HttpService,
  ],
  bootstrap: [SyntheseComponent]
})
export class SyntheseModule { }
