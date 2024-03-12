import { Component } from '@angular/core';
import { CourierServicesService } from 'src/shared/services/courierServices/courier-services.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  
  currentPrice: number | null = null;

constructor(private courierService : CourierServicesService,private router: Router, public snackBar: MatSnackBar){

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
    this.snackBar.open('Navigating to payment page', 'dismiss', { duration: 3000 });

    }else{
      this.snackBar.open('Cannot navigate to payment page without booking a courier', 'dismiss', { duration: 3000 });
    }

  }
  onCancel(){
    this.snackBar.open('Checkout cancelled', 'dismiss', { duration: 3000 });

    this.router.navigate(['/Booking/CourierBooking']);
  }
}
