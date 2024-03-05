import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
  

  constructor(private http:HttpClient) { }
  private apiUrl = 'https://localhost:7081/users/editInfo';
  updateUser(userId: number, userDetails: any): Observable<any> {

    // Assuming userId is part of the URL path
    return this.http.put(`https://localhost:7081/api/user/${userId}`, userDetails);
 }
  getuserDetails(id :number)  : Observable<any>{
   
    
    return this.http.get<any>(`https://localhost:7081/api/user/Details/${id}`);
  }
  

  loginUser(formData: any): Observable<any> {
    const loginUrl = 'https://localhost:7081/users/loginuser';
    return this.http.post<any>(loginUrl, formData, {
      observe: 'response',
    }).pipe(
      map(response => {
        const body = response.body;
        return {
          message: body.message,
          userId: body.userId
        };
      }),
      tap(data => {
        sessionStorage.setItem('userId', data.userId);
      })
    );
  }

  signupUser(formData: any): Observable<any> {
    const signupurl = 'https://localhost:7081/users/signup';
    return this.http.post<any>(signupurl, formData);
  }
}
