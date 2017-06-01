import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views\/home/home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(routes);
