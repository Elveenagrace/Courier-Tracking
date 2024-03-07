import { Component, OnInit } from '@angular/core';
import { CourierServicesService } from 'src/shared/services/courierServices/courier-services.service';

@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.scss']
})
export class ConfirmationPageComponent implements OnInit{
  transactionId="";
  constructor(private cs: CourierServicesService){}
  ngOnInit(): void {
  }

}
