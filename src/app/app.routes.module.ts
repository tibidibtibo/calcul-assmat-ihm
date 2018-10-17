import { HomeComponent } from './home.component/home.component';
import { PageNotFoundComponent } from './page-not-found.component/page-not-found.component';
import { LoginComponent } from './authentication.component/login.component';
import { DeclarationComponent } from './declaration.component/declaration.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'declaration', component: DeclarationComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent }
];


export let AppRoutesModule = RouterModule.forRoot(routes);
