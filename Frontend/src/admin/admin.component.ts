import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  constructor(private route:Router){}
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

}
