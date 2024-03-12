import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmpopopComponent } from 'src/admin/confirmpopop/confirmpopop.component';
import { UserServicesService } from 'src/shared/services/userServices/user-services.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  userList: any[] = [];
  constructor(public dialog:MatDialog,private userService: UserServicesService,private route:Router,public snackBar: MatSnackBar){}
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
  deleteUser(id: number) {


    this.dialog
    .open(ConfirmpopopComponent,{
      data: {
       id:id,
       val:true
     }
    })
    .afterClosed()




    // this.userService.deleteUser(id).subscribe((data) => {
    //    console.log("complete");
    //    // Use Snackbar for success notification
       







    //    this.snackBar.open('User deleted successfully', 'OK', { duration: 3000 });
    // }, error => {
    //    // Use Snackbar for error notification
    //    this.snackBar.open('User deleted successfully', 'OK', { duration: 3000 });
    // });
   }
   
}
