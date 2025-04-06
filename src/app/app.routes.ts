import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { authGuard } from './guards/auth.guard';
import { RegistrarProductoComponent } from './components/registrar-producto/registrar-producto.component';
import { RegistrarCategoriaComponent } from './components/registrar-categoria/registrar-categoria.component';
import { ClienteHomeComponent } from './components/cliente/cliente-home/cliente-home.component';
import { ClienteLoginComponent } from './components/cliente/cliente-login/cliente-login.component';
import { ClienteRegistroComponent } from './components/cliente/cliente-registro/cliente-registro.component';
import { CarritoClienteComponent } from './components/cliente/carrito-cliente/carrito-cliente.component';
import { ClienteAuthGuard } from './guards/clienteauth.guard';



export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'registro', component: RegistroComponent},
    {path: 'dashboard', component: HomeComponent, canActivate: [authGuard]},
    {path: 'registrar-producto',component:RegistrarProductoComponent},
    {path:'registar-categoria',component:RegistrarCategoriaComponent},
    {path: 'cliente-home' , component:ClienteHomeComponent, canActivate: [ClienteAuthGuard]},
    {path: 'cliente-login', component:ClienteLoginComponent},
    {path: 'cliente-registro', component:ClienteRegistroComponent},
    {path: 'carrito-cliente', component:CarritoClienteComponent},    
    
];
