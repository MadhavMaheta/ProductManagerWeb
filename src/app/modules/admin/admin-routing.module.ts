import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { AdminModule } from './admin.module';
import { LayoutComponent } from './components/layout/layout.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { HomeComponent } from '../dashboard/home/home.component';

const routes: Routes = [{
  path: '',
  //component: LayoutComponent,
  children: [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/add', component: ProductAddComponent },
  { path: 'products/edit/:id', component: ProductAddComponent },
  { path: 'category', component: CategoryListComponent },
  { path: 'category/add', component: CategoryAddComponent },
  { path: 'category/edit/:id', component: CategoryAddComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
