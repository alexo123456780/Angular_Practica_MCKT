import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { authGuard } from './guards/auth.guard';

import { RegistrarProductoComponent } from './components/registrar-producto/registrar-producto.component';
export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'about', component: AboutComponent},
    {path: 'registro', component: RegistroComponent},
    {path: 'dashboard', component: HomeComponent, canActivate: [authGuard]},
    {path: 'registrar-producto',component:RegistrarProductoComponent}
];



