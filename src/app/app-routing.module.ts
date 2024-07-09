import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './shared/components/auth/auth.component';
import { HomeComponent } from './shared/components/home/home.component';
import { UsersComponent } from './shared/components/users/users.component';
import { ProductsComponent } from './shared/components/products/products.component';
import { FairDashboardComponent } from './shared/components/fair-dashboard/fair-dashboard.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { UserFormComponent } from './shared/components/users/user-form/user-form.component';
import { SingleUserComponent } from './shared/components/users/single-user/single-user.component';
import { ProductFormComponent } from './shared/components/products/product-form/product-form.component';
import { SingleProductComponent } from './shared/components/products/single-product/single-product.component';
import { FairDetailsComponent } from './shared/components/fair-details/fair-details.component';
import { AuthGuard } from './shared/services/auth.guard';
import { UserRoleGuard } from './user-role.guard';

const routes: Routes = [
 {
    path:'',component:AuthComponent
 },
  {
    path:'home',component:HomeComponent
  },
  {
    path:'users',component:UsersComponent,
    canActivate:[AuthGuard,UserRoleGuard],
    data:{
      userRole:['admin','buyer']
    },
    children:[
      {
        path:'adduser',component:UserFormComponent
      },
      {
        path:':userId',component:SingleUserComponent
      },
      {
        path:':userId/edit',component:UserFormComponent
      }
    ]
  },
  {
    path:'products',component:ProductsComponent,
    canActivate:[AuthGuard,UserRoleGuard],
    data:{
      userRole:['buyer','admin','sa']
    },
    children:[
      {
        path:'addproduct',component:ProductFormComponent
      },
      {
        path:':productId',component:SingleProductComponent
      },
      {
        path:':productId/edit',component:ProductFormComponent
      }
    ]
  },
  {
    path:'fairs',component:FairDashboardComponent,
    canActivate:[AuthGuard,UserRoleGuard],
    data:{
      userRole:['sa']
    },
    children:[
      {
        path:':fairId',component:FairDetailsComponent
      }
    ]
  },
  {
    path:'page-not-found',component:PageNotFoundComponent
  },
  {
    path:'**',redirectTo:'page-not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
