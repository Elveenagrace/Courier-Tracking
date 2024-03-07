import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourierServicesService } from 'src/shared/services/courierServices/courier-services.service';


@Component({
  selector: 'app-view-couriers',
  templateUrl: './view-couriers.component.html',
  styleUrls: ['./view-couriers.component.scss']
})
export class ViewCouriersComponent implements OnInit {
  courierList: any[] = [];
 
  constructor(private courierService: CourierServicesService,private route:Router) { }
 
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
 deleteCourier(id : number)
{
  this.courierService.deleteCourier(id).subscribe((data)=>{
    console.log("complete");
  });
  window.alert("deleted Successfully");
}
 }
