import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsModule } from './modules/products/products.module';
import { ProductListComponent } from './modules/products/product-list/product-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule } from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { HomeComponent } from './modules/dashboard/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableCommonComponent } from './layout/mat-table-common/mat-table-common.component';
import { TestingComponentComponent } from './testing-component/testing-component.component';
import {MaterialModule} from '../app/modules/material/material.module';
import { CategoryListComponent } from './modules/category/category-list/category-list.component';
import { CategoryModule } from './modules/category/category.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfirmationDialogComponent } from './layout/confirmation-dialog/confirmation-dialog.component';
import { AlertDialogComponent } from './layout/alert-dialog/alert-dialog.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { RegisterComponent } from './modules/auth/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    CategoryListComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    MatTableCommonComponent,
    TestingComponentComponent,
    ConfirmationDialogComponent,
    AlertDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductsModule,
    CategoryModule,
    AuthModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatSortModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
],
  bootstrap: [AppComponent],
})
export class AppModule { }
