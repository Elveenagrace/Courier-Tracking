import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentsComponent } from '../payments/payments.component';


import { CourierServicesService } from 'src/shared/services/courierServices/courier-services.service';



@Component({
  selector: 'app-courier-booking',
  templateUrl: './courier-booking.component.html',
  styleUrls: ['./courier-booking.component.scss']
})
export class CourierBookingComponent implements OnInit {
  CourierForm: FormGroup ;

  constructor(
    private formBuilder: FormBuilder,
    private courierService: CourierServicesService,
    private router: Router 
  ) { }

  ngOnInit(): void {
    this.CourierForm = this.formBuilder.group({
     
      pickupAddress: [''],
      deliveryAddress: [''],
      pickupPincode: [''],
      deliveryPincode: [''],
      weight: [''],
      height: [''],
      length: [''],
      width: [''],
      itemName: ['']
    });
  }

  onSubmit() {
    if (this.CourierForm.valid) {
      const formData = this.CourierForm.value;
      this.courierService.Addcourier(formData).subscribe({
        next: (response) => {
          console.log('Form data sent successfully', response);
           
        },
        error: (error) => {
          console.error('Error occurred while sending form data', error);
        }
      });
     

      this.router.navigate(['/Booking/checkout']);
    }
  }
  onCancel() {
    this.router.navigate(['/Booking']);

  }


}
