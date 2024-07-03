import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import path from 'path';
import { HomeComponent } from './Components/home/home.component';
import { ProductListComponent } from './Components/Order/product-list/product-list.component';
import { OrderMasterComponent } from './Components/Order/order-master/order-master.component';
import { NotFoundComponentComponent } from './Components/NotFoundComponent/NotFoundComponent.component';
import { UserLoginComponent } from './Components/UserLogin/UserLogin.component';
import { MainLayoutComponent } from './Components/MainLayout/MainLayout.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { AuthGuard } from './Guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: '/Home', pathMatch: 'full' }, // Defualt path
      { path: 'Home', component: HomeComponent },
      { path: 'Products', component: ProductListComponent },
      { path: 'Products/:pid', component: ProductDetailsComponent },
      // { path: 'Products/:pid', component: ProductDetailsComponent },
      {
        path: 'Order',
        component: OrderMasterComponent,
        canActivate: [AuthGuard],
      },
    ],
  },

  { path: 'Login', component: UserLoginComponent },
  { path: 'Logout', component: UserLoginComponent },
  { path: '**', component: NotFoundComponentComponent }, // Wild Card Path
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
