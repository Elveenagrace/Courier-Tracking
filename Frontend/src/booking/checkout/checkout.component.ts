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
        // Handle the message returned by the backend
        console.log(response.message ,"asda");
        this.currentPrice = response.message;
        // Optionally, set a component property to display the message in the UI
     
    } 
}, error => {
    // Handle errors here
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
