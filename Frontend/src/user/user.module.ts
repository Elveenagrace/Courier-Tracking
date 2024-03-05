import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserDetailsComponent } from './user-info/user-details/user-details.component';
import { MyCouriersComponent } from './user-couriers/my-couriers/my-couriers.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserComponent,
    UserDetailsComponent,
    MyCouriersComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule
    
    
  ]
})
export class UserModule { }
