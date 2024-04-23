import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/dashboard/home/home.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { AuthService } from './service/auth.service';
import { AuthGuardService } from './helper/auth-guard.service';
import { RegisterComponent } from './modules/auth/register/register.component';
import { MyAccountComponent } from './modules/components/my-account/my-account.component';
import { ProductDetailComponent } from './modules/components/product-detail/product-detail.component';
import { OrderCheckoutComponent } from './modules/components/order-checkout/order-checkout.component';

const routes: Routes = [
  { 
    path: '', 
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuardService]
  },
  { path: 'account', component: MyAccountComponent,canActivate: [AuthGuardService] },
  { path: 'product-detail/:id', component: ProductDetailComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'checkout', component: OrderCheckoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
