import {Component, Injectable, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from '../../model/User.model';
import {Resource} from '../../model/Resource.model';
import {AuthService} from './auth.service';
import {Login} from '../../model/login.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: Login;
  user: User;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.user = new User();
    this.model = new Login();
  }

  ngOnInit() {
    sessionStorage.setItem('token', '');
  }

  login() {
    this.authService.login(this.model);
   }
  @Injectable()
  getUser() {
    return this.user;
  }

}
