import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutesModule } from './app.routes.module';

import { HeaderComponent } from './header.component/header.component';
import { AppComponent } from './app.component';
import { DeclarationComponent } from './declaration.component/declaration.component';
import { LoginComponent } from './authentication.component/login.component';
import { PageNotFoundComponent } from './page-not-found.component/page-not-found.component';
import { HomeComponent } from './home.component/home.component';

import { AppService } from './app.service';

@NgModule({
  declarations: [
    AppComponent,
    DeclarationComponent,
    LoginComponent,
    PageNotFoundComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    AppRoutesModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
