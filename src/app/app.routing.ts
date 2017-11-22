import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views\/home/home.component';
import { LoginComponent } from './views\/login/login.component';
import { BootstrapComponent } from './views\/bootstrap/bootstrap.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'bootstrap', component: BootstrapComponent },
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(routes);
