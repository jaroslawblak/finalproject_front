import { Component, OnInit } from '@angular/core';
import {Resource} from '../../Resource.model';
import {User} from '../../User.model';
import {UserProfileService} from './user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User;

  constructor(private userService: UserProfileService) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    console.log(this.user);
  }

}
