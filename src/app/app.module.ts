import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutesModule } from './app.routes.module';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CollapseModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ModalModule } from 'ngx-bootstrap/modal';

import { HeaderComponent } from './header.component/header.component';
import { AppComponent } from './app.component';
import { SaisieComponent } from './saisie.component/saisie.component';
import { SyntheseComponent } from './synthese.component/synthese.component';
import { LoginComponent } from './authentication.component/login.component';
import { PageNotFoundComponent } from './page-not-found.component/page-not-found.component';
import { HomeComponent } from './home.component/home.component';
import { SyntheseFormComponent } from './synthese.component/form/syntheseForm.component';
import { SyntheseResultatComponent } from './synthese.component/resultat/syntheseResultat.component';
import { SyntheseErrorComponent } from './synthese.component/error/syntheseError.component';
import { HistoriqueComponent } from './historique.component/historique.component';
import { ParametrageComponent } from './parametrage.component.ts/parametrage.component';

import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { HttpService } from './services/http.service';
import { ConstService } from './services/const.service';
import { TokenStorageService } from './services/token.storage.service';
import { AppHttpInterceptor } from './services/app.interceptor.service';


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
    HeaderComponent,
    ParametrageComponent
  ],
  imports: [
    AppRoutesModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CollapseModule,
    TooltipModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
    AngularFontAwesomeModule
  ],
  providers: [
    ConstService,
    AuthService,
    HttpService,
    AuthGuardService,
    TokenStorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
