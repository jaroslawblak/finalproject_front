import { Component, OnInit } from '@angular/core';
import {UserResourcesService} from './user-resources.service';
import {Resource} from '../../Resource.model';
import {UserResource} from '../../UserResource.model';
import {User} from '../../User.model';
import {DialogModule} from 'primeng/dialog';
import {CalendarModule} from 'primeng/calendar';
import {delay} from 'rxjs/internal/operators';

@Component({
  selector: 'app-user-table-info',
  templateUrl: './user-table-info.component.html',
  styleUrls: ['./user-table-info.component.css']
})
export class UserTableInfoComponent implements OnInit {

  resource: Resource;
  resources: Resource[];
  userResources: UserResource[];
  user: User;
  displayEdit: boolean = false;
  displayView: boolean = false;
  date1: any;

  constructor(private userResourcesService: UserResourcesService) {
    this.resource = new Resource();
    this.userResources = [];
    this.resources = [];
    this.user = JSON.parse(sessionStorage.getItem("user"));
  }

  ngOnInit() {
    // this.userResourcesService.ge(2).subscribe(data => {
    //   this.resource = Object.assign(new Resource(), data); console.log(this.resource); });
    //
    this.userResourcesService.getUserResource(this.user.id).subscribe(data => {
      this.userResources = data;
      console.log(this.userResources);
      this.loadResources(this.userResources);
      console.log(this.resources);
    });
  }

  showEdit() {
    this.displayView = false;
    this.displayEdit = true;
   console.log(this.displayEdit);
  }
  showView(id: number) {
    this.displayView = true;
    this.displayEdit = false;
    console.log(this.displayEdit);
    console.log(id);
  }

  loadResources(userResource: UserResource[]): Resource[] {
    for ( let i = 0; i < userResource.length; i++) {
      this.resources.push(this.userResources[i].resource);
    }
    return this.resources;
  }

}
