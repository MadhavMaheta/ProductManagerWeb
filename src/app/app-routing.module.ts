import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/dashboard/home/home.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { AuthService } from './service/auth.service';
import { AuthGuardService } from './helper/auth-guard.service';
import { RegisterComponent } from './modules/auth/register/register.component';

const routes: Routes = [
  { 
    path: '', 
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuardService]
  },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
