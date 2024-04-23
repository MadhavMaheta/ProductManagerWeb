import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import {MaterialModule} from '../app/modules/material/material.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfirmationDialogComponent } from './layout/confirmation-dialog/confirmation-dialog.component';
import { AlertDialogComponent } from './layout/alert-dialog/alert-dialog.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { RegisterComponent } from './modules/auth/register/register.component';
import { SharedModule } from './modules/shared/shared.module';
import { MyAccountComponent } from './modules/components/my-account/my-account.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderInterceptorInterceptor } from './interceptor/loader-interceptor.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ProductDetailComponent } from './modules/components/product-detail/product-detail.component';
import { OrderCheckoutComponent } from './modules/components/order-checkout/order-checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ConfirmationDialogComponent,
    AlertDialogComponent,
    MyAccountComponent,
    ProductDetailComponent,
    OrderCheckoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
    SharedModule,
    MatProgressSpinnerModule,
    NgxSpinnerModule
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorInterceptor,
      multi: true
    },
    JwtHelperService
],
  bootstrap: [AppComponent],
})
export class AppModule { }
