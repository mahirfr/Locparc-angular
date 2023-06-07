import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'; 
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SearchBarComponent } from './utils/search-bar/search-bar.component';
import { JwtInterceptor } from './jwt.interceptor';
import { ShoppingCartComponent } from './utils/shopping-cart/shopping-cart.component';
import { EquipementComponent } from './pages/equipement/equipement.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PlanningComponent } from './utils/planning/planning.component'; 
import { MatTableModule } from '@angular/material/table';
import { AccessDeniedComponent } from './pages/errors/access-denied/access-denied.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { CreateUsersComponent } from './pages/create-users/create-users.component';
import { ProfileComponent } from './pages/profile/profile.component'; 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SearchBarComponent,
    ShoppingCartComponent,
    EquipementComponent,
    PlanningComponent,
    AccessDeniedComponent,
    OrdersComponent,
    CreateUsersComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTableModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
