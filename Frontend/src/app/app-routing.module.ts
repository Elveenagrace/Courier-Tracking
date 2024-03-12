import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

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
     // canActivate:[AuthGuard]
    
  },
  { 
    path: 'admin',
    
    loadChildren: () =>
      import('../admin/admin.module').then((m) => m.AdminModule),
      canActivate:[AuthGuard]
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
