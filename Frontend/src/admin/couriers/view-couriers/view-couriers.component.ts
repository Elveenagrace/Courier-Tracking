import { Component,OnInit } from '@angular/core';
import { CourierServicesService } from 'src/shared/services/courierServices/courier-services.service';


@Component({
  selector: 'app-view-couriers',
  templateUrl: './view-couriers.component.html',
  styleUrls: ['./view-couriers.component.scss']
})
export class ViewCouriersComponent implements OnInit {
  courierList: any[] = [];
 
  constructor(private courierService: CourierServicesService) { }
 
  ngOnInit() {
    this.courierService.getCourierDetails().subscribe(data => {
      this.courierList = data;
    }, error => {
      console.error('Error fetching courier details:', error);
    });
 }

 }
