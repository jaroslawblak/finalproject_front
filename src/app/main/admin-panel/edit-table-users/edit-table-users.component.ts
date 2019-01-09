import {Component, OnInit} from '@angular/core';
import {User} from '../../../model/User.model';
import {UserService} from '../../../user.service';
import {NgForm} from '@angular/forms';
import {ConfirmationService} from 'primeng/api';
import {isNumber} from 'util';

@Component({
  selector: 'app-edit-table-users',
  templateUrl: './edit-table-users.component.html',
  styleUrls: ['./edit-table-users.component.css']
})
export class EditTableUsersComponent implements OnInit {
  users: User[];
  selectedUser: User;
  newUser: User;
  displayDialog: boolean;
  displayEditDialog: boolean;
  addUser: boolean;
  ParentUserSettings: {};
  selectedParentUser: User[];
  emails: string[];
  passwords: string[];
  editForm: NgForm;

  constructor(private userService: UserService, private confirmationService: ConfirmationService) {
    this.newUser = new User();
    this.selectedParentUser = [];
    this.users = [];
    this.emails = [];
    this.passwords = [];
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
    this.dropdownSettings();
  }

  selectUser(event: Event, user: User) {
    this.selectedUser = user;
    this.displayDialog = true;
  }

  saveEditedUser(editUserForm: NgForm) {
    this.newUser = editUserForm.value;
    this.newUser.id = this.selectedUser.id;
    if (this.selectedParentUser[0] != null) {
      this.userService.getUser(this.selectedParentUser[0].id).subscribe(parentUser => {
        this.newUser.parentUser = parentUser;
        this.userService.updateUser(this.newUser);
        window.location.reload();
      });
    } else {
      this.userService.updateUser(this.newUser);
      window.location.reload();
    }
  }

  removeUser(event: Event, user: User) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to remove this user?',
      accept: () => {
        this.userService.deleteUser(user.id);
        window.location.reload();
      }
    });
  }

  onDialogHide() {
    this.selectedUser = null;
  }

  addNewUser() {
    this.selectedParentUser = [];
    this.addUser = true;
  }

  editUser(event: Event, user: User) {
    this.selectedUser = user;
    if (isNumber(this.selectedUser.parentUser)) {
      this.userService.getUser(Number(this.selectedUser.parentUser)).subscribe(data => {
        this.selectedParentUser = [];
        this.selectedUser.parentUser = data;
        if (this.selectedUser.parentUser != null) {
          this.selectedParentUser.push(this.selectedUser.parentUser);
        } else {
          this.selectedParentUser = [];
        }
        this.displayEditDialog = true;
      });
    } else {
      this.selectedParentUser = [];
      this.selectedParentUser.push(this.selectedUser.parentUser);
      this.displayEditDialog = true;
    }
  }

  saveNewUser(addUserForm: NgForm): void {
    this.newUser = addUserForm.value;
    this.users.forEach(user => this.passwords.push(user.password));
    this.users.forEach(user => this.emails.push(user.password));
    if (this.passwords.includes(this.newUser.password) || this.emails.includes(this.newUser.email)) {
      alert('User with this email or password exists in database!');
      return;
    }
    const addDate = new Date();
    let dateAsString = null;
    if (addDate.getDate() < 10) {
      dateAsString = addDate.getFullYear() + '-' + addDate.getMonth() + 1 + '-0' + addDate.getDate();
    } else {
      dateAsString = addDate.getFullYear() + '-' + addDate.getMonth() + 1 + '-' + addDate.getDate();
    }
    this.newUser.addTime = dateAsString;
    if (this.selectedParentUser[0] != null) {
    this.userService.getUser(this.selectedParentUser[0].id).subscribe(parentUser => {
      this.newUser.parentUser = parentUser;
      this.userService.saveUser(this.newUser);
      window.location.reload();
    });
  } else {
      this.userService.saveUser(this.newUser);
      window.location.reload();
    }
  }

  dropdownSettings() {
    this.ParentUserSettings = {
      singleSelection: true,
      textField: 'firstName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
}
