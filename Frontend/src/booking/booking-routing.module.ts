import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking.component';
import { CourierBookingComponent } from './courier-booking/courier-booking.component';
import { CourierDetailsComponent } from './courier-details/courier-details.component';
import { PaymentsComponent } from './payments/payments.component';
import { ConfirmationPageComponent } from './confirmation-page/confirmation-page.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [{ path: '', component: BookingComponent },
{ path: 'CourierBooking', component: CourierBookingComponent },
{path : 'CourierDetails',component:CourierDetailsComponent},
{
  path : 'Payments',component:PaymentsComponent
},
{
  path : 'confirmation',component:ConfirmationPageComponent
},
{
  path : 'checkout',component: CheckoutComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
