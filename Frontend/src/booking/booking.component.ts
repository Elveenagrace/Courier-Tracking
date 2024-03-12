import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent {
  constructor(
   
    public snackBar: MatSnackBar // Inject MatSnackBar here
   ) {}
   

  bookCourier(){
    
  }
  trackCourier(){
    
  }
 
  logout(){
    console.log("out");
    
    sessionStorage.clear();
    this.snackBar.open('logged out successfully', 'dismiss', { duration: 3000 });

  }
   
}
