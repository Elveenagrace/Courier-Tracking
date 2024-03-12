import { Component,Inject,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmpopopComponent } from 'src/admin/confirmpopop/confirmpopop.component';
import { CourierServicesService } from 'src/shared/services/courierServices/courier-services.service';


@Component({
  selector: 'app-view-couriers',
  templateUrl: './view-couriers.component.html',
  styleUrls: ['./view-couriers.component.scss']
})
export class ViewCouriersComponent implements OnInit {
  courierList: any[] = [];
 
  constructor(public dialog: MatDialog,private courierService: CourierServicesService,private route:Router, public snackBar: MatSnackBar) { }
 
  ngOnInit() {
    this.courierService.getCourierDetails().subscribe(data => {
      this.courierList = data;
    }, error => {
      console.error('Error fetching courier details:', error);
    });
 }
 goBack(){
   this.route.navigate(['/admin']);
 }
 deleteCourier(userid: number) {
   
  this.dialog
  .open(ConfirmpopopComponent,{
    data: {
     id:userid,
     val:false
   }
  })
  .afterClosed()
 }
 
 }
