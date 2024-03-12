import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingComponent } from './booking.component';
import { CourierBookingComponent } from './courier-booking/courier-booking.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CourierDetailsComponent } from './courier-details/courier-details.component';
import { PaymentsComponent } from './payments/payments.component';
import { ConfirmationPageComponent } from './confirmation-page/confirmation-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LocationComponent } from './live-tracking/location/location.component';


@NgModule({
  declarations: [
    BookingComponent,
    CourierBookingComponent,
    CourierDetailsComponent,
    PaymentsComponent,
    ConfirmationPageComponent,
    CheckoutComponent,
    LocationComponent,
   
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    ReactiveFormsModule
  ]
})
export class BookingModule { }
