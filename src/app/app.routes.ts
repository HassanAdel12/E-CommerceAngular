import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { DetailsProductComponent } from './details-product/details-product.component';
import { AddProductComponent } from './add-product/add-product.component';

export const routes: Routes = [
    {path:"",redirectTo:"Login",pathMatch:"full"},
    {path:"Home",component:HomeComponent},
    {path:"Login",component:LoginComponent},
    {path:"Register",component:RegisterComponent},
    {path:"Products/:Code",component:DetailsProductComponent},
    {path:"AddProduct",component:AddProductComponent},

    {path:"**",component:ErrorComponent}
];
