import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServicesService } from 'src/shared/services/userServices/user-services.service';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
 
 
  ngOnInit(): void {
    const id = localStorage.getItem('userId');
    const userId = parseInt(id, 10);
    console.log(id);
   
    // Initialize the form with default values or placeholders
    this.UserForm = this.formBuilder.group({
      userId:[''],
       username: [''],
       password: [''],
       email: [''],
       phone: ['']
    });
   
    this.userService.getuserDetails(userId).subscribe((data) => {
       console.log(data);
       if (data) {
         // Update the form with values from the API response
         this.UserForm.patchValue({
          userId:data.userId,
           username: data.username,
           password: data.password,
           email: data.email,
           phone: data.phone
         });
       }
    });
   }
   
  UserForm: FormGroup ;
  constructor(
    private formBuilder: FormBuilder,
    // private courierService: CourierServicesService,
    private userService:UserServicesService,
    private router:Router
    
  ) { }
  
  onUpdate(): void {
    const id = sessionStorage.getItem('userId');
    const userId = parseInt(id, 10);
    this.userService.updateUser(userId, this.UserForm.value).subscribe(
      response => {
        console.log('User updated successfully', response);
        alert('updated successfully');
        this.router.navigate(['/Booking']);
      },
      error => {
        console.error('Error updating user', error);
      }
    );
 }

onCancel(): void {
  this.router.navigate(['/Booking']);
}

}
