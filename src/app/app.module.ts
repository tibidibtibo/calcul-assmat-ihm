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
import { TabsModule } from 'ngx-bootstrap/tabs';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/authentication.component/login.component';
import { PageNotFoundComponent } from './components/page-not-found.component/page-not-found.component';
import { HomeComponent } from './components/home.component/home.component';
import { HeaderComponent } from './components/header.component/header.component';
import { ParametrageComponent } from './components/parametrage.component.ts/parametrage.component';

import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { HttpService } from './services/http.service';
import { ConstService } from './services/const.service';
import { TokenStorageService } from './services/token.storage.service';
import { AppHttpInterceptor } from './services/app.interceptor.service';
import { SaisieModule } from './modules/saisie.module/saisie.module';
import { SyntheseModule } from './modules/synthese.module/synthese.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    HomeComponent,
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
    TabsModule.forRoot(),
    AngularFontAwesomeModule,
    SaisieModule,
    SyntheseModule
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
