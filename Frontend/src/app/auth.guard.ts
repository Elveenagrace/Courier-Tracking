import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn:'root',
})
export class AuthGuard implements CanActivate{
  constructor(private route:Router){}
  canActivate(): boolean  {
 
    const b = sessionStorage.getItem('userId');

    if(b==='undefined'  )
    return true;
  else if(typeof(b)==='string')
  {

    this.route.navigate(['/Booking']);
  }
  else{
    this.route.navigate(['/login']);

  }
  return false; 
  }



}
