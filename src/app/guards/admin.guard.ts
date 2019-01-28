import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {User} from '../model/User.model';
import {UserService} from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  user: User;

  constructor(private router: Router,
              private userService: UserService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.userService.getUserByEmail(sessionStorage.getItem('user_email')).toPromise().then(
      user => {
        if (!!user.role && user.role.toUpperCase() === 'ADMIN') {
          return true;
        } else {
          this.router.navigateByUrl('/main');
          alert('You don\'t have permission');
          return false;
        }
      })
      .catch((error) => {
          console.error(error);
          return false;
        }
      );
  }
}

