import { HomeComponent } from './components/home/home.component';
import { Routes } from '@angular/router';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { UserLoginComponent } from './components/user-login/user-login.component';

export const routes: Routes = [
  {path:'' , redirectTo:'home' , pathMatch:'full'},
  {path:'home' , component:HomeComponent},
  {path:'cart' , component:CartComponent},
  {path:'product-page/:name', component:ProductPageComponent},
  {path:'product-details/:name/:id' , component:ProductDetailsComponent},
  {path:'login' , component:UserLoginComponent},
  {path:'**' , redirectTo:'home'}
];
