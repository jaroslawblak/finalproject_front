import {Component, OnInit} from '@angular/core';
import {UserResourcesService} from './user-resources.service';
import {Resource} from '../../Resource.model';
import {UserResource} from '../../UserResource.model';
import {User} from '../../User.model';
import {ResourceService} from '../../resource.service';
import {Category} from '../../categories/category.model';
import {CategoryService} from '../../category.service';
import {_isNumberValue} from '@angular/cdk/coercion';
import {InfoTransferService} from '../../info-transfer.service';

@Component({
  selector: 'app-user-table-info',
  templateUrl: './user-table-info.component.html',
  styleUrls: ['./user-table-info.component.css']
})
export class UserTableInfoComponent implements OnInit {

  private _resource: Resource;
  resources: Resource[];
  categories: Category[];
  userResources: UserResource[];
  user: User;
  displayEdit = false;
  displayView = false;
  id: number;

  constructor(private userResourcesService: UserResourcesService,
              private resourceService: ResourceService,
              private categoryService: CategoryService,
              private infoTransferService: InfoTransferService) {
    this.userResources = [];
    this.categories = [];
    this.resources = [];
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }

  ngOnInit() {
    this.resourceService.currentMessage.subscribe(id => this.id = id);
    this.userResourcesService.getUserResource(this.user.id).subscribe(data => {
      this.userResources = data;
      this.loadResources(this.userResources);
    });
    this.infoTransferService.displayEditState.subscribe(isActive => this.displayEdit = isActive);
  }

  showEdit(id: number) {
    this.resourceService.changeIdResForUserEdit(id);
    this.displayView = false;
    this.displayEdit = true;
  }

  showView(id: number) {
    this.resourceService.getResource(id).subscribe(data => {
      this._resource = data;
    });
    this.displayView = true;
    this.displayEdit = false;
    this.categoryService.getActiveCategories(id).subscribe(data => {
      this.categories = data;
    });
  }

  loadResources(userResource: UserResource[]): Resource[] {
    for (let i = 0; i < userResource.length; i++) {
      if ((_isNumberValue(this.userResources[i].resource))) {
        continue;
      }
      this.resources.push(this.userResources[i].resource);
    }
    return this.resources;
  }

  get resource(): Resource {
    return this._resource;
  }

  getOpacity(): number {
    if (this.displayEdit) {
      return 0.5;
    }
  }
}

