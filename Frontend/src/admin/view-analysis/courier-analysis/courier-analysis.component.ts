import { Component, OnInit } from '@angular/core';

import { Chart, Title, Tooltip, Legend,  CategoryScale, LinearScale , BarController, BarElement,registerables} from 'chart.js';

Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale,BarController);


import { CourierServicesService } from 'src/shared/services/courierServices/courier-services.service';


@Component({
  selector: 'app-courier-analysis',
  templateUrl: './courier-analysis.component.html',
  styleUrls: ['./courier-analysis.component.scss']
})
export class CourierAnalysisComponent implements OnInit {
  couriers: any[] = [];
 
  constructor(private courierService: CourierServicesService) { }
 
  ngOnInit(): void {
     this.courierService.getCourierDetails().subscribe(data => {
       this.couriers = data;
       this.createChart();
     });
  }
 
  createChart() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    const labels = this.couriers.map(courier => courier.deliveryStatus);
    const data = this.couriers.map(courier => 1); 
   
    
    const backgroundColors = this.couriers.map(courier => {
       
       if (courier.deliveryStatus === 'Pending') {
         return 'rgba(255, 182, 193, 0.2)'; 
       } else if (courier.deliveryStatus === 'delivered') {
         return 'rgba(75, 192, 192, 0.2)'; 
       } else {
         return 'rgba(255, 100, 193, 0.9)'; 
       }
    });
   
    new Chart(ctx, {
       type: 'bar',
       data: {
         labels: labels,
         datasets: [{
           label: 'Delivery of Couriers',
           data: data,
           backgroundColor: backgroundColors, 
           borderColor: 'rgba(75, 192, 192, 1)',
           borderWidth: 2
         }]
       },
       options: {
         scales: {
           y: {
             beginAtZero: true
           }
         }
       }
    });
   }
   
   
   
   
 }


