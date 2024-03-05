import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class CourierServicesService {
//   private apiUrl = 'https://localhost:7081/users/editInfo';
//   updateUser(userId: number, userDetails: any): Observable<any> {

//     // Assuming userId is part of the URL path
//     return this.http.put(`https://localhost:7081/api/user/${userId}`, userDetails);
//  }
//   getuserDetails(id :number)  : Observable<any>{
   
    
//     return this.http.get<any>(`https://localhost:7081/api/user/Details/${id}`);
//   }
 
  courierDetails: any[] = [];
 detailsForms: FormGroup;
 //private priceUrl = 'http://localhost:7081/api/couriers/price';
  constructor(private http:HttpClient) { 
    this.detailsForms = new FormGroup({
      id: new FormControl(''), 
   });
  }
  // loginUser(formData: any): Observable<any> {
  //   const loginUrl = 'https://localhost:7081/users/loginuser';
  //   return this.http.post<any>(loginUrl, formData, {
  //     observe: 'response',
  //   }).pipe(
  //     map(response => {
  //       const body = response.body;
  //       return {
  //         message: body.message,
  //         userId: body.userId
  //       };
  //     }),
  //     tap(data => {
  //       sessionStorage.setItem('userId', data.userId);
  //     })
  //   );
  // }
  

  // signupUser(formData: any): Observable<any> {
  //   const signupurl = 'https://localhost:7081/users/signup';
  //   return this.http.post<any>(signupurl, formData);
  // }
  getPrice(courierId: number): Observable<any> {
    return this.http.get(`https://localhost:7081/api/couriers/price/${courierId}`);
 }
  

  
    

  Addcourier(newCourierForm: FormData): Observable<string> {
    const url = 'https://localhost:7081/api/addcouriers';
    
     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    return this.http.post(url, newCourierForm, { observe: 'response', headers: headers }).pipe(
    map((response) => {
    if (response.status === 200) {
    return 'success' ;
    } else {
    return 'failure';
    }
    })
    );
     }
 
  getCourier(courieridForms :FormGroup):Observable<any>
   {
     const id = courieridForms.get('id').value;
    //  debugger;

    
    const url = `https://localhost:7081/api/couriers/${id}`;
 
      return this.http.get<any>(url);
   }
   getCourierDetails(): Observable<any> {
    const apiUrl='https://localhost:7081/api/couriers';

    return this.http.get<any>(apiUrl);
 }


  
   

  }

