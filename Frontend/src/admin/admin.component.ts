import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  constructor(private route:Router,public snackBar:MatSnackBar){}
  courierAnalysis(){

  }
  allCouriers(){
    
  }
  allUsers(){
    
  }

  toggleDropdown() {
    var dropdownContent = document.querySelector('.dropdown-content');
    dropdownContent.classList.toggle('show');
 }

 logout(){
  //console.log("out");
  
  sessionStorage.clear();
  this.snackBar.open('logged out successfully', 'dismiss', { duration: 3000 });
  
  sessionStorage.clear();
}
}
