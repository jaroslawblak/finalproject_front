import { Component, OnInit } from '@angular/core';
import {User} from '../../../model/User.model';
import {UserService} from '../../../user.service';
import {isNumber} from 'util';
import {ConfirmationService} from 'primeng/api';
import {NgForm} from '@angular/forms';
import {UserResourcesService} from '../../user-table-info/user-resources.service';
import {UserResource} from '../../../model/UserResource.model';
import {Resource} from '../../../model/Resource.model';
import {ResourceService} from '../../../resource.service';

@Component({
  selector: 'app-edit-table-user-resources',
  templateUrl: './edit-table-user-resources.component.html',
  styleUrls: ['./edit-table-user-resources.component.css']
})
export class EditTableUserResourcesComponent implements OnInit {

  userResources: UserResource[];
  users: User[];
  resources: Resource[];
  selectedUser: User[];
  selectedResource: Resource[];
  selectedUserResource: UserResource;
  newUserResource: UserResource;
  displayDialog: boolean;
  displayEditDialog: boolean;
  addUserResource: boolean;
  ParentUserResourceSettings: {};
  ResourceDropdownSettings: {};
  UserDropdownSettings: {};
  selectedParentUserResource: UserResource[];

  constructor(private userResourceService: UserResourcesService,
              private confirmationService: ConfirmationService,
              private userService: UserService,
              private resourceService: ResourceService) {
    this.newUserResource = new UserResource();
    this.selectedParentUserResource = [];
    this.userResources = [];
    this.users = [];
    this.resources = [];
    this.selectedUser = [];
    this.selectedResource = [];
  }

  ngOnInit() {
    this.userResourceService.getUserResources().subscribe(userResources => {
      this.userResources = userResources;
      this.userService.getUsers().subscribe(users => {
        this.selectedUser = [];
        this.users = users;
        this.resourceService.getResources().subscribe(res => {
          this.resources = res;
          this.selectedResource = [];
          this.selectedParentUserResource = [];
        });
      });
    });
    this.dropdownSettings();
  }

  selectUserRes(event: Event, userResource: UserResource) {
    this.selectedUserResource = userResource;
    this.displayDialog = true;
  }
  removeUserRes(event: Event, userResource: UserResource) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to remove this user-resource?',
      accept: () => {
        this.userResourceService.deleteUserResource(userResource.id);
        window.location.reload();
      }
    });
  }

  onDialogHide() {
    this.selectedUserResource = null;
  }

  saveEditedUserRes(editUserResForm: NgForm) {
    this.newUserResource = editUserResForm.value;
    console.log(this.newUserResource);
    this.newUserResource.id = this.selectedUserResource.id;
    if (this.selectedUser[0] == null || this.selectedResource[0] == null) {
      alert('You need to fill user and resource in form!');
      return;
    }
    this.userService.getUser(this.selectedUser[0].id).subscribe(user => {
      this.newUserResource.user = user;
      this.resourceService.getResource(this.selectedResource[0].id).subscribe(res => {
        this.newUserResource.resource = res;
        if (this.selectedUser[0] == null || this.selectedResource[0] == null) {
          alert('You need to fill user and resource in form!');
          return;
        }
        if (this.selectedParentUserResource[0] != null) {
          this.userResourceService.getUserResource(Number(this.selectedParentUserResource[0])).subscribe(parentUserRes => {
            this.newUserResource.parentUserResources = parentUserRes;
            console.log(this.newUserResource);
            this.userResourceService.updateUserResource(this.newUserResource);
            window.location.reload();
          });
        }
        this.userResourceService.updateUserResource(this.newUserResource);
        window.location.reload();
      });
    });
  }


  editUserRes(event: Event, userResource: UserResource) {
    this.selectedUserResource = userResource;
    this.selectedParentUserResource = [];
    this.selectedResource = [];
    this.selectedUser = [];
    this.selectedUser.push(this.selectedUserResource.user);
    this.selectedResource.push(this.selectedUserResource.resource);
    if (this.selectedUserResource.parentUserResources != null) {
    this.selectedParentUserResource.push(this.selectedUserResource.parentUserResources);
    }
    this.displayEditDialog = true;
  }

  addNewUserRes() {
    this.selectedUser = null;
    this.selectedResource = [];
    this.selectedUser = [];
    this.selectedParentUserResource = [];
    this.addUserResource = true;
  }

  saveNewUserRes(addUserResForm: NgForm): void {
    this.newUserResource = addUserResForm.value;
    if (this.selectedUser[0] == null || this.selectedResource[0] == null) {
      alert('You need to fill user and resource in form!');
      return;
    }
    this.userService.getUser(this.selectedUser[0].id).subscribe(user => {
      this.newUserResource.user = user;
      this.resourceService.getResource(this.selectedResource[0].id).subscribe(res => {
        this.newUserResource.resource = res;
        if (this.selectedParentUserResource[0] != null) {
          this.userResourceService.getUserResource(Number(this.selectedParentUserResource[0])).subscribe(parentUser => {
            this.newUserResource.parentUserResources = parentUser;
            this.userResourceService.saveUserResources(this.newUserResource);
             window.location.reload();
          });
        } else {
          this.userResourceService.saveUserResources(this.newUserResource);
          window.location.reload();
        }
        });
      });
  }

  dropdownSettings() {
    this.UserDropdownSettings = {
      singleSelection: true,
      textField: 'firstName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.ResourceDropdownSettings = {
      singleSelection: true,
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.ParentUserResourceSettings = {
      singleSelection: true,
      textField: 'id',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

  }
}

