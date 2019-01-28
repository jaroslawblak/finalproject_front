import {Component, OnInit} from '@angular/core';
import {User} from '../../model/User.model';
import {UserProfileService} from './user-profile.service';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserByEmail(sessionStorage.getItem('user_email')).subscribe(user => {
      this.user = user;
      console.log(this.user);
    });
  }

}
