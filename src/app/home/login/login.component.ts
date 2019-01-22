import {Component, Injectable, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from '../../model/User.model';
import {Resource} from '../../model/Resource.model';
import {AuthService} from './auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  user: User;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.user = new User();
  }

  ngOnInit() {
    sessionStorage.setItem('token', '');
  }

  login() {
    this.authService.login(this.model.email, this.model.password);
    // const url = 'http://localhost:8080/login';
    // this.http.post<Observable<boolean>>(url, {
    //   email: this.model.email,
    //   password: this.model.password
    // }).subscribe(isValid => {
    //   if (isValid) {
    //     this.user = Object.assign(new User(), isValid); console.log(this.user);
    //     sessionStorage.setItem('user', JSON.stringify(this.user));
    //     sessionStorage.setItem('isLoggedIn', 'true');
    //     this.router.navigate(['/main']);
    //   } else {
    //     sessionStorage.setItem('isLoggedIn', 'false');
    //     alert('Authentication failed.');
    //   }
    // });
  }
  @Injectable()
  getUser() {
    return this.user;
  }

}
