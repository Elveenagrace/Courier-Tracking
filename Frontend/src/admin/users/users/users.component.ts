import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServicesService } from 'src/shared/services/userServices/user-services.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  userList: any[] = [];
  constructor(private userService: UserServicesService,private route:Router){}
  ngOnInit(): void {
    this.userService.getAllUserDetails().subscribe(data => {
      this.userList = data;
    }, error => {
      console.error('Error fetching courier details:', error);
    });
  }

  goBack(){
    this.route.navigate(['/admin']);
  }
 deleteUser(id : number){
  
  this.userService.deleteUser(id).subscribe((data)=>{
    console.log("complete");
    
  });
  window.alert("deleted Successfully");
 }
}
