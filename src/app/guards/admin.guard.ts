import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {User} from '../User.model';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  user: User;

  constructor(private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
     this.user = JSON.parse(sessionStorage.getItem('user'));
     console.log(this.user.role);
     if (this.user.role.toUpperCase() === 'ADMIN') {
       return true;
     }
    this.router.navigateByUrl('/main');
     alert("You don't have permission");
    return false;
  }
}
