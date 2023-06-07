import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { UserGuard } from './guards/user.guard';
import { ShoppingCartComponent } from './utils/shopping-cart/shopping-cart.component';
import { EquipementComponent } from './pages/equipement/equipement.component';
import { AccessDeniedComponent } from './pages/errors/access-denied/access-denied.component';
import { LenderGuard } from './guards/lender.guard';
import { Order } from './model/Order';
import { OrdersComponent } from './pages/orders/orders.component';

// TODO: Add routes for new components
// TODO: Add route for not found page

const routes: Routes = [
  {
    path: "home", 
    component: HomeComponent, 
    canActivate: [UserGuard]
  },
  {path: "", redirectTo: "home", pathMatch: "full"},
  {path: "login", component: LoginComponent},
  {
    path: "access-denied",
    component: AccessDeniedComponent, 
    canActivate: [UserGuard, LenderGuard]
  },
  {
    path: "orders",
    component: OrdersComponent,
    canActivate: [UserGuard]
  },
  {
    path: "shopping-cart", 
    component: ShoppingCartComponent, 
    canActivate: [UserGuard]
  },
  {
    path: "equipement",
    component: EquipementComponent,
    canActivate: [UserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
