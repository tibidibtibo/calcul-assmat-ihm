import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutesModule } from './app.routes.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { HeaderComponent } from './header.component/header.component';
import { AppComponent } from './app.component';
import { SaisieComponent } from './saisie.component/saisie.component';
import { SyntheseComponent } from './synthese.component/synthese.component';
import { LoginComponent } from './authentication.component/login.component';
import { PageNotFoundComponent } from './page-not-found.component/page-not-found.component';
import { HomeComponent } from './home.component/home.component';

import { AuthService } from './services/auth.service';
import { HttpService } from './services/http.service';
import { ConstService } from './services/const.service';

import { SyntheseFormComponent } from './synthese.component/form/syntheseForm.component';
import { SyntheseResultatComponent } from './synthese.component/resultat/syntheseResultat.component';
import { SyntheseErrorComponent } from './synthese.component/error/syntheseError.component';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CollapseModule } from 'ngx-bootstrap';
import { HistoriqueComponent } from './historique/historique.component';

@NgModule({
  declarations: [
    AppComponent,
    SyntheseComponent,
    SyntheseFormComponent,
    SyntheseResultatComponent,
    SyntheseErrorComponent,
    SaisieComponent,
    LoginComponent,
    PageNotFoundComponent,
    HomeComponent,
    HistoriqueComponent,
    HeaderComponent
  ],
  imports: [
    AppRoutesModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CollapseModule,
    TooltipModule.forRoot(),
    AngularFontAwesomeModule
  ],
  providers: [
    ConstService,
    AuthService,
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
