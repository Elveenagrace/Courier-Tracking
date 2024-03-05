import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CourierServicesService } from 'src/shared/services/courierServices/courier-services.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit{
  courierId: number;
  price: number;
  @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;
  paymnent: any;
 
  fakeamount : number
  amount: any;
  constructor(private router: Router, private manage: CourierServicesService, private routing:ActivatedRoute) {}
  ngOnInit(): void {
    this.routing.queryParams.subscribe(params=>{
      if (params['amount']) {
        let amountNumber = parseInt(params['amount']);
        this.fakeamount = amountNumber;
     //   amountNumber = this.fakeamount;
        if (this.fakeamount) {
          console.log(this.fakeamount);
          this.initializePayPalButton();
        } else {
          console.error('Amount provided in query parameters is not a valid number');
        }
     } else {
        console.error('No amount provided in query parameters');
     }
    });
  }
    initializePayPalButton(){
      console.log(window.paypal);
      if(window.paypal){
        window.paypal.Buttons({
          style: {

            layout: 'horizontal',
            color:'blue',
            shape:'rect',
            label:'paypal',
          },
          createOrder:(data:any,actions:any)=>{
            return actions.order.create({
              purchase_units:[
                {
                  amount:{
                    value:this.fakeamount.toString(),
                    currency_code:'USD'
                  }
                }
              ]
            })
          },
          onApprove:(data:any,actions:any)=>{
            return actions.order.capture().then((details:any)=>{
              console.log(details);
              if(details.status=="COMPLETED"){
                this.paymnent.transactionID=details.id;
                this.router.navigate(['/Booking/confirmation']);
              }
            });
          },
          onError:(error:any)=>{
            console.log(error);
          }
        }

        ).render(this.paymentRef.nativeElement);
      }else{
        console.error('PayPal SDK not loaded');
      }
    }
    
    cancel(){
      this.router.navigate(['/Booking/CourierBooking']);
    }
  }

















  //    window.paypal.Buttons({
  //     style: {
  //       layout: 'horizontal',
  //       color: 'blue',
  //       shape: 'rect',
  //       label: 'paypal',
  //     },
  //     createOrder: (data: any, actions: any) => {
  //       return actions.order.create({
  //         purchase_units: [
  //           {
  //             amount: {
  //              value: this.price.toString(),
  //              currency_code: 'USD'
  //             }
  //           }
  //         ]
  //       });
  //     },
  //     onApprove: (data: any, actions: any) => {
  //       return actions.order.capture().then((details: any) => {
  //         console.log(details);
  //         if(details.status==="COMPLETED"){
  //           //this.paymnent.transactionID=details.id;
  //           this.router.navigate(['buyer/cofirm']);
  //         }
         
  //         // Assuming you have a service method to update the payment transaction ID
  //         // this.manage.updatePaymentTransactionID(details.id);
  //         // Navigate to the confirmation page
       
  //       });
  //     },
  //     onError: (error: any) => {
  //       console.log(error);
  //     }
  //   }).render(this.paymentRef.nativeElement);
 
  // }
  
  // cancel(){
  //   this.router.navigate(['Booking']);
  // }
  

