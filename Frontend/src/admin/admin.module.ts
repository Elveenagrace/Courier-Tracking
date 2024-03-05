import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CourierAnalysisComponent } from './view-analysis/courier-analysis/courier-analysis.component';
import { ViewCouriersComponent } from './couriers/view-couriers/view-couriers.component';


@NgModule({
  declarations: [
    AdminComponent,
    CourierAnalysisComponent,
    ViewCouriersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
