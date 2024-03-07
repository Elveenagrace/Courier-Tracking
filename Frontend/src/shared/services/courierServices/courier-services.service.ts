import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class CourierServicesService {
  getAllShipperDetails(): Observable<any> {
    const apiUrl='https://localhost:7081/api/shippers';

    return this.http.get<any>(apiUrl);
  }

 
  courierDetails: any[] = [];
 detailsForms: FormGroup;
 
  constructor(private http:HttpClient) { 
    this.detailsForms = new FormGroup({
      id: new FormControl(''), 
   });
  }
  
  getPrice(courierId: number): Observable<any> {
    return this.http.get(`https://localhost:7081/api/couriers/price/${courierId}`);
 }
 deleteCourier(id: number) {
  const delcurl = `https://localhost:7081/delete/${id}`;
  return this.http.delete<any>(delcurl);
  
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

