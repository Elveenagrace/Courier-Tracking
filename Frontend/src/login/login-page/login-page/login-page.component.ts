import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { CourierServicesService } from 'src/shared/services/courierServices/courier-services.service';
import { UserServicesService } from 'src/shared/services/userServices/user-services.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  signupForm: FormGroup;
  isLoginMode: boolean = true; 
  errorMessage: string = '';
  

  constructor(
    private formBuilder: FormBuilder,
    private courierService: CourierServicesService,
    private userService:UserServicesService,
    private router: Router,
    
  ) { }
 
  

  ngOnInit(): void {
    
    this.loginForm = this.formBuilder.group({
      
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required]

     
  
    });
    
  }

 

  onLogin() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.userService.loginUser(formData).subscribe({
        next: (data) => {
          if (data.message === 'user') {
            localStorage.setItem('userId', data.userId); // Updated line here
            console.log(data);
            this.router.navigate(['/Booking']);
          } else if (data.message === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            alert("Sign up, please!");
          }
        },
        error: (error) => {
          console.error('Login Error:', error);
          alert("Login failed. Please try again.");
        }
      });
    }
  }
  
   
  onSignup() {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      this.userService.signupUser(formData).subscribe(
        response => this.handleResponse(response),
        error => this.handleError(error)
      );
    }
  }

  handleResponse(response: any): void {
    if (response.status === 200) {
       // Assuming you want to redirect to a booking module on successful login
       this.router.navigate(['Booking']); // Adjust the route as necessary
    } else {
       // If the response status is not 200, you might want to handle it differently
       // For demonstration, setting a generic success message
       this.errorMessage = 'Login successful. Redirecting...';
       setTimeout(() => {
         this.router.navigate(['/booking-module']); // Adjust the route as necessary
       }, 2000); // Redirect after 2 seconds
    }
   }

   handleError(error: HttpErrorResponse): void {
    if (error.error instanceof ErrorEvent) {
       // A client-side or network error occurred
       this.errorMessage = `An error occurred: ${error.error.message}`;
    } else {
       // The backend returned an unsuccessful response code
       this.errorMessage = `Errorsss: ${error.status}, ${error.error}`;
       if(error.status===200){
        this.router.navigate(['Booking']);
       }
       
    }
   }
}
