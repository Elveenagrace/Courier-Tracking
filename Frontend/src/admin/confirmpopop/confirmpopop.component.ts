import { Component, Inject, Injectable } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CourierServicesService } from 'src/shared/services/courierServices/courier-services.service';
import { UserServicesService } from 'src/shared/services/userServices/user-services.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-confirmpopop',
  templateUrl: './confirmpopop.component.html',
  styleUrls: ['./confirmpopop.component.scss']
})
export class ConfirmpopopComponent {

  constructor(private userService:UserServicesService,public dialogRef: MatDialogRef<ConfirmpopopComponent> ,@Inject(MAT_DIALOG_DATA) public data: any,private courierService:CourierServicesService,public snackBar:MatSnackBar,private route:Router){}

  onDelete(){


 if(this.data.val ===false){

   this.courierService.deleteCourier(this.data.id).subscribe((data) => {
     console.log("complete");
     this.dialogRef.close();
     this.snackBar.open('Courier deleted successfully', 'dismiss', { duration: 3000 });
     console.log("hoe");
   
    
  }, error => {
     // Use Snackbar for error notification



     this.snackBar.open('Courier deleted successfully', 'dismiss', { duration: 3000 });
  });
 }
 else{

  this.userService.deleteUser(this.data.id).subscribe((data) => {
    console.log("complete");
    this.dialogRef.close();
    this.snackBar.open('user deleted successfully', 'dismiss', { duration: 3000 });
    console.log("hoe");
  
   
 }, error => {
    // Use Snackbar for error notification



    this.snackBar.open('user deleted successfully', 'dismiss', { duration: 3000 });
 });
 }

  }
  onCancel(){
   
    
    this.dialogRef.close();
  }


}
