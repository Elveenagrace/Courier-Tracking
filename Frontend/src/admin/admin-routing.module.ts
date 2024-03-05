import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ViewCouriersComponent } from './couriers/view-couriers/view-couriers.component';
import { CourierAnalysisComponent } from './view-analysis/courier-analysis/courier-analysis.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
{ path: 'courier-analysis', component:CourierAnalysisComponent  },
{path : 'view-couriers',component:ViewCouriersComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
