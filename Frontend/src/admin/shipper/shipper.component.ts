import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CourierServicesService } from 'src/shared/services/courierServices/courier-services.service';

@Component({
  selector: 'app-shipper',
  templateUrl: './shipper.component.html',
  styleUrls: ['./shipper.component.scss']
})
export class ShipperComponent implements OnInit{
  shipperList: any[] = [];
  constructor(private courierService: CourierServicesService,private route:Router){}
  ngOnInit(): void {
    this.courierService.getAllShipperDetails().subscribe(data => {
      this.shipperList = data;
    }, error => {
      console.error('Error fetching courier details:', error);
    });
  }

  goBack(){
    this.route.navigate(['/admin']);
  }
}
