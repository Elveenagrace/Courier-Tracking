import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './user-info/user-details/user-details.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  
  { path: '', component: UserComponent },
{ path: 'userInfo', component: UserDetailsComponent },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
