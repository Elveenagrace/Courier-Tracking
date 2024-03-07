import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourierServicesService } from 'src/shared/services/courierServices/courier-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courier-details',
  templateUrl: './courier-details.component.html',
  styleUrls: ['./courier-details.component.scss'],
})
export class CourierDetailsComponent implements OnInit {
  formBuilder: any;
  constructor(private cs: CourierServicesService, private fb:FormBuilder,private router: Router) {}
  detailsForms: FormGroup;
  ngOnInit(): void {

    
    this.intiatedetailsForms();
  }
  myCouriers: any[] = [];

  intiatedetailsForms() {
    this.detailsForms = this.fb.group({
      id: [''],
    });
  }

  onSubmit(detailsForms: { id: string }) {
    // debugger;

    this.cs .getCourier(this.detailsForms).subscribe((data) => {
      const courierData = [{
        courierId: data.courierId,
        userId: data.userId,
        pickupAddress: data.pickupAddress,
        deliveryAddress: data.deliveryAddress,
        pickupPincode: data.pickupPincode,
        deliveryPincode: data.deliveryPincode,
        weight: data.weight,
        height: data.height,
        length: data.length,
        width: data.width,
        price: data.price,
        itemName: data.itemName,
        deliveryDate: data.deliveryDate,
        pickupDate: data.pickupDate,
        estimatedDeliveryDate: data.estimatedDeliveryDate,
        currentPlace: data.currentPlace,
        deliveryStatus: data.deliveryStatus,
        PaymentId: data.PaymentId
      }];
      
      this.myCouriers = courierData;
    });
  }
  onCancel(){
    this.router.navigate(['/Booking']);

  }
}
