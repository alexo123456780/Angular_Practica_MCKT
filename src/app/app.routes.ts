import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { RegistrarProductoComponent } from './components/registrar-producto/registrar-producto.component';
import { RegistrarCategoriaComponent } from './components/registrar-categoria/registrar-categoria.component';
//import { ClienteHomeComponent } from './components/cliente/cliente-home/cliente-home.component';
import { ClienteLoginComponent } from './components/cliente/cliente-login/cliente-login.component';
import { ClienteRegistroComponent } from './components/cliente/cliente-registro/cliente-registro.component';
import { CarritoClienteComponent } from './components/cliente/carrito-cliente/carrito-cliente.component';
import { ClienteAuthGuard } from './guards/clienteauth.guard';
import { usuarioGuard } from './guards/auth.guard';
import { DetallesProductoComponent } from './components/detalles-producto/detalles-producto.component';
import { OlvidoPasswordComponent } from './components/olvido-password/olvido-password.component';
import { FotoPerfilComponent } from './components/foto-perfil/foto-perfil.component';



export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'cliente-login', component:ClienteLoginComponent},
    {path: 'registro', component: RegistroComponent},
    {path: 'cliente-registro', component:ClienteRegistroComponent},
    {path: 'dashboard', component: HomeComponent, canActivate: [usuarioGuard]},
    {path: 'registro', component: RegistroComponent},
    {path:'detalles-producto',component:DetallesProductoComponent},
    {path:'recuperar-password',component:OlvidoPasswordComponent},
    {path:'registar-categoria',component:RegistrarCategoriaComponent},
    {path: 'registrar-producto',component:RegistrarProductoComponent,canActivate:[usuarioGuard]},
    //{path: 'cliente-home' , component:ClienteHomeComponent, canActivate: [ClienteAuthGuard]},
    {path: 'carrito-cliente', component:CarritoClienteComponent},    
    {path:'cambiar-perfil',component:FotoPerfilComponent}
    
];
