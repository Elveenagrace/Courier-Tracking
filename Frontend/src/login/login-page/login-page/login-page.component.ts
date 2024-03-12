import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    public snackBar: MatSnackBar
    
   
    
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
            sessionStorage.setItem('userId', data.userId); 
            console.log(data);

            this.router.navigate(['/Booking']);
            this.snackBar.open('Login successful.', 'dismiss', { duration: 3000 });


          } else if (data.message === 'admin') {
            this.router.navigate(['/admin']);
            this.snackBar.open('Login successful.', 'dismiss', { duration: 3000 });

          } else {
            //alert("Sign up, please!");
            this.snackBar.open('Sign up, please!', 'OK', { duration: 3000 });


          }
        },
        error: (error) => {
          console.error('Login Error:', error);
          alert("Login failed. Please try again.");
          this.snackBar.open('Login failed. Please try again.', 'dismiss', { duration: 3000 });


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
     
      this.snackBar.open('Signed up Successfully.', 'dismiss', { duration: 3000 });

       this.router.navigate(['Booking']); 
    } else {
      
       this.errorMessage = 'Login successful.';
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
