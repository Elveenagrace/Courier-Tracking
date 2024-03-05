import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 
  
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  
  { 
    path: 'login', 
    loadChildren: () => import('../login/login.module').then((m) => m.LoginModule),
  },
  
  { 
    path: 'Booking',
    
    loadChildren: () =>
      import('../booking/booking.module').then((m) => m.BookingModule),
  },
  { 
    path: 'admin',
    
    loadChildren: () =>
      import('../admin/admin.module').then((m) => m.AdminModule),
  },
  { 
    path: 'user',
    
    loadChildren: () =>
      import('../user/user.module').then((m) => m.UserModule),
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
