import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ViewCouriersComponent } from './couriers/view-couriers/view-couriers.component';
import { CourierAnalysisComponent } from './view-analysis/courier-analysis/courier-analysis.component';
import { UsersComponent } from './users/users/users.component';
import { ShipperComponent } from './shipper/shipper.component';
const routes: Routes = [
  { path: '', component: AdminComponent },
{ path: 'courier-analysis', component:CourierAnalysisComponent  },
{path : 'view-couriers',component:ViewCouriersComponent },
{path: 'all-users', component:UsersComponent},
{path:'all-shippers',component:ShipperComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
