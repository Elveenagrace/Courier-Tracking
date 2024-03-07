import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Chart, Title, Tooltip, Legend, CategoryScale, LinearScale, BarController, BarElement, PieController, ArcElement, registerables, ChartComponentLike } from 'chart.js';

// Explicitly type the array of components/plugins
const components: ChartComponentLike[] = [Title, Tooltip, Legend, CategoryScale, LinearScale, BarController, BarElement, PieController, ArcElement];

Chart.register(...components);


import { CourierServicesService } from 'src/shared/services/courierServices/courier-services.service';


@Component({
  selector: 'app-courier-analysis',
  templateUrl: './courier-analysis.component.html',
  styleUrls: ['./courier-analysis.component.scss']
})
export class CourierAnalysisComponent implements OnInit {
  couriers: any[] = [];
 
  constructor(private courierService: CourierServicesService,private route:Router ) { }
 
  ngOnInit(): void {
     this.courierService.getCourierDetails().subscribe(data => {
       this.couriers = data;
       this.createChart();
       this.createPickupLocationsPieChart();
       this.createPricePieChart();
       this.createEstimatedDeliveryDateChart();
   
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
   createPickupLocationsPieChart() {
    const ctx = document.getElementById('pickupLocationsPieChart') as HTMLCanvasElement;
    const locations = this.couriers.map(courier => courier.pickupAddress);
    const locationCounts = this.getLocationCounts(locations);
   
    new Chart(ctx, {
       type: 'pie',
       data: {
         labels: Object.keys(locationCounts),
         datasets: [{
           label: 'Pickup Locations',
           data: Object.values(locationCounts),
           backgroundColor: [
             'rgba(255, 99, 132, 0.2)',
             'rgba(54, 162, 235, 0.2)',
             'rgba(255, 206, 86, 0.2)',
             'rgba(75, 192, 192, 0.2)',
             'rgba(153, 102, 255, 0.2)',
             'rgba(255, 159, 64, 0.2)'
           ],
           borderColor: [
             'rgba(255, 99, 132, 1)',
             'rgba(54, 162, 235, 1)',
             'rgba(255, 206, 86, 1)',
             'rgba(75, 192, 192, 1)',
             'rgba(153, 102, 255, 1)',
             'rgba(255, 159, 64, 1)'
           ],
           borderWidth: 1
         }]
       },
       options: {
         responsive: true,
         plugins: {
           legend: {
             position: 'top',
           },
           title: {
             display: true,
             text: 'Pickup Locations'
           }
         }
       }
    });
   }
   
   createPricePieChart() {
    const ctx = document.getElementById('pricePieChart') as HTMLCanvasElement;
    const prices = this.couriers.map(courier => courier.price);
    const priceCounts = this.getPriceCounts(prices);
   
    new Chart(ctx, {
       type: 'pie',
       data: {
         labels: Object.keys(priceCounts),
         datasets: [{
           label: 'Prices',
           data: Object.values(priceCounts),
           backgroundColor: [
             'rgba(255, 99, 132, 0.2)',
             'rgba(54, 162, 235, 0.2)',
             'rgba(255, 206, 86, 0.2)',
             'rgba(75, 192, 192, 0.2)',
             'rgba(153, 102, 255, 0.2)',
             'rgba(255, 159, 64, 0.2)'
           ],
           borderColor: [
             'rgba(255, 99, 132, 1)',
             'rgba(54, 162, 235, 1)',
             'rgba(255, 206, 86, 1)',
             'rgba(75, 192, 192, 1)',
             'rgba(153, 102, 255, 1)',
             'rgba(255, 159, 64, 1)'
           ],
           borderWidth: 1
         }]
       },
       options: {
         responsive: true,
         plugins: {
           legend: {
             position: 'top',
           },
           title: {
             display: true,
             text: 'Prices'
           }
         }
       }
    });
   }
   
   getLocationCounts(locations: string[]): Record<string, number> {
    const counts: Record<string, number> = {};
    locations.forEach(location => {
       if (counts[location]) {
         counts[location]++;
       } else {
         counts[location] = 1;
       }
    });
    return counts;
   }
   
   getPriceCounts(prices: number[]): Record<string, number> {
    const counts: Record<string, number> = {};
    prices.forEach(price => {
       const key = `Price: ${price}`;
       if (counts[key]) {
         counts[key]++;
       } else {
         counts[key] = 1;
       }
    });
    return counts;
   }

   createEstimatedDeliveryDateChart() {
    const ctx = document.getElementById('estimatedDeliveryDateChart') as HTMLCanvasElement;
    const dates = this.couriers.map(courier => courier.estimatedDeliveryDate);
    const dateCounts = this.getDateCounts(dates); // Assuming you have a method to count occurrences
   
    new Chart(ctx, {
       type: 'bar',
       data: {
         labels: Object.keys(dateCounts),
         datasets: [{
           label: 'Estimated Delivery Date',
           data: Object.values(dateCounts),
           backgroundColor: 'rgba(75, 192, 192, 0.2)',
           borderColor: 'rgba(75, 192, 192, 1)',
           borderWidth: 1
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
   
   getDateCounts(dates: string[]): Record<string, number> {
    const counts: Record<string, number> = {};
    dates.forEach(date => {
       if (counts[date]) {
         counts[date]++;
       } else {
         counts[date] = 1;
       }
    });
    return counts;
   }
   goBack(){
    this.route.navigate(['/admin']);
   }
   
   
   
   
   
   
 }


