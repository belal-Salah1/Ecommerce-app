import { HomeComponent } from './components/home/home.component';
import { Routes } from '@angular/router';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { loginHandleGuard } from './guards/login-handle.guard';

export const routes: Routes = [
  {path:'' , redirectTo:'userLogin' , pathMatch:'full'},
  {path:'home' , component:HomeComponent, canActivate:[authGuard]},
  {path:'cart' , loadComponent:()=>import('./components/cart/cart.component').then(m=>m.CartComponent) , canActivate:[authGuard]},
  {path:'product-page/:name', component:ProductPageComponent},
  {path:'product-details/:name/:id' , component:ProductDetailsComponent},
  {path:'login' , component:LoginComponent, canActivate:[loginHandleGuard]},
  {path:'userLogin' , component:UserLoginComponent, canActivate:[loginHandleGuard]},
  {path:'notFound' ,loadComponent:()=>import('./components/not-found/not-found.component').then(m=>m.NotFoundComponent)},
  {path:'**' , redirectTo:'notFound'}
];
