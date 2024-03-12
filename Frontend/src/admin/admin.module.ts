import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CourierAnalysisComponent } from './view-analysis/courier-analysis/courier-analysis.component';
import { ViewCouriersComponent } from './couriers/view-couriers/view-couriers.component';
import { UsersComponent } from './users/users/users.component';
import { ShipperComponent } from './shipper/shipper.component';
import { ConfirmpopopComponent } from './confirmpopop/confirmpopop.component';


@NgModule({
  declarations: [
    AdminComponent, 
    CourierAnalysisComponent,
    ViewCouriersComponent,
    UsersComponent,
    ShipperComponent,
    ConfirmpopopComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
