import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  listIsOn: boolean = true;

  constructor(private router: Router) {

  }
  ngOnInit() {
  }

  showProfile = function () {
    this.listIsOn  = false;
    this.router.navigateByUrl('main');
  };
  showHome = function () {
    this.listIsOn  = true;
    this.router.navigateByUrl('main');
  };
  showAdminPanel = function () {
    this.router.navigateByUrl('main/admin');
  };
  logout = function () {
    this.router.navigateByUrl('/login');
  };
}
