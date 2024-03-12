import { Component ,OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CourierServicesService } from 'src/shared/services/courierServices/courier-services.service';

@Component({
  selector: 'app-shipper',
  templateUrl: './shipper.component.html',
  styleUrls: ['./shipper.component.scss']
})
export class ShipperComponent implements OnInit{
  shipperList: any[] = [];
  constructor(private courierService: CourierServicesService,private route:Router,public snackBar: MatSnackBar){}
  ngOnInit(): void {
    this.courierService.getAllShipperDetails().subscribe(data => {
      this.shipperList = data;
    }, error => {
      this.snackBar.open('Error fetching shipper details.Please try Again Later.', 'dismiss', { duration: 3000 });
    });
  }

  goBack(){
    this.route.navigate(['/admin']);
  }
}
