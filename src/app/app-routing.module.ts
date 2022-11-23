import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductListComponent } from './modules/products/product-list/product-list.component';
import { HomeComponent } from './modules/dashboard/home/home.component';
import { ProductAddComponent } from './modules/products/product-add/product-add.component';
import { TestingComponentComponent } from './testing-component/testing-component.component';
import { MatTableCommonComponent } from './layout/mat-table-common/mat-table-common.component';
import { CategoryListComponent } from './modules/category/category-list/category-list.component';
import { CategoryAddComponent } from './modules/category/category-add/category-add.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { AuthService } from './service/auth.service';
import { AuthGuardService } from './helper/auth-guard.service';
import { RegisterComponent } from './modules/auth/register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'test', component: TestingComponentComponent },
  { path: 'test1', component: MatTableCommonComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductListComponent,canActivate: [AuthGuardService] },
  { path: 'products/add', component: ProductAddComponent,canActivate: [AuthGuardService]  },
  { path: 'products/edit/:id', component: ProductAddComponent,canActivate: [AuthGuardService]  },
  { path: 'category', component: CategoryListComponent ,canActivate: [AuthGuardService] },
  { path: 'category/add', component: CategoryAddComponent ,canActivate: [AuthGuardService] },
  { path: 'category/edit/:id', component: CategoryAddComponent ,canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
