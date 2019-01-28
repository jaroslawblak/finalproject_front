import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  listIsOn = true;
  profileIsOn = true;

  constructor(private router: Router) {

  }
  ngOnInit() {
  }
  showProfile = function () {
    this.listIsOn  = false;
    this.profileIsOn = true;
    this.router.navigateByUrl('main');
  };
  showHome = function () {
    this.listIsOn  = true;
    this.profileIsOn = false;
    this.router.navigateByUrl('main');
  };
  showAdminPanel = function () {
    this.listIsOn  = false;
    this.profileIsOn = false;
    this.router.navigateByUrl('/main/admin');
  };
  showTicket() {
    this.listIsOn  = false;
    this.profileIsOn = true;
    this.router.navigateByUrl('/main/ticket');

  }
  logout = function () {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('user_email');
    this.router.navigateByUrl('/login');
  };
}
