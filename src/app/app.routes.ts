import { Routes } from '@angular/router';
import { Customer } from './pages/customer/customer';
import { Home } from './pages/home/home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'customer', component: Customer },
];
