import { Component } from '@angular/core';
import { CourierServicesService } from 'src/shared/services/courierServices/courier-services.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  
  currentPrice: number | null = null;

constructor(private courierService : CourierServicesService,private router: Router){

}
  fetchCourierPrice(courierId: number): void {
    this.courierService.getPrice(courierId).subscribe(response => {
      if (response.message) {
        console.log(response.message ,"asda");
        this.currentPrice = response.message;
       
     
    } 
}, error => {
   
    console.error('An error occurred:', error);
    });
  }

  onPay():void{
    if(this.currentPrice !== null){
    this.router.navigate(['/Booking/Payments'],{queryParams:{ amount:this.currentPrice}});
    }else{
      console.error('Cannot navigate to payment page with booking a courier');
    }

  }
  onCancel(){
    this.router.navigate(['/Booking/CourierBooking']);
  }
}
