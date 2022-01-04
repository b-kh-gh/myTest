import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from './product-data';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';


const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  {
    path: 'products/:id/edit',
   // canDeactivate: [ProductEditGuard],
    component: ProductEditComponent
  }
]



@NgModule({
  declarations: [
    ProductListComponent,
    ProductEditComponent,
    ProductDetailComponent,
  
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    InMemoryWebApiModule.forRoot(ProductData),
    FormsModule
    
  ]
 
})
export class ProductsModule { }
