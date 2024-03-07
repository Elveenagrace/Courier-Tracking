import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
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
            localStorage.setItem('userId', data.userId); 
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
     
       
       this.router.navigate(['Booking']); 
    } else {
      
       this.errorMessage = 'Login successful. Redirecting...';
       setTimeout(() => {
         this.router.navigate(['/booking-module']);
       }, 2000);
    }
   }

   handleError(error: HttpErrorResponse): void {
    if (error.error instanceof ErrorEvent) {
       this.errorMessage = `An error occurred: ${error.error.message}`;
    } else {
       this.errorMessage = `Errorsss: ${error.status}, ${error.error}`;
       if(error.status===200){
        this.router.navigate(['Booking']);
       }
       
    }
   }
}
