import {Component, OnInit} from '@angular/core';
import {UserResourcesService} from './user-resources.service';
import {Resource} from '../../Resource.model';
import {UserResource} from '../../UserResource.model';
import {User} from '../../User.model';
import {ResourceService} from '../../resource.service';
import {Category} from '../../categories/category.model';
import {CategoryService} from '../../category.service';
import {UserResDetailComponent} from '../user-res-detail/user-res-detail.component';

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
  displayEdit: boolean = false;
  displayView: boolean = false;
  id: number;

  constructor(private userResourcesService: UserResourcesService,
              private resourceService: ResourceService,
              private categoryService: CategoryService) {
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
  }

  showEdit(id: number) {
    this.resourceService.changeIdResForUserEdit(id);
    this.displayView = false;
    this.displayEdit = true;
  }

  showView(id: number) {
    this.resourceService.getResource(id).subscribe(data => {
      this._resource = data;
      console.log(this._resource);
      console.log(id);
    });
    this.displayView = true;
    this.displayEdit = false;
    this.categoryService.getActiveCategories(id).subscribe(data => {
      this.categories = data;
      console.log(this.categories);
    });
  }

  loadResources(userResource: UserResource[]): Resource[] {
    for (let i = 0; i < userResource.length; i++) {
      this.resources.push(this.userResources[i].resource);
    }
    return this.resources;
  }

  get resource(): Resource {
    return this._resource;
  }
  printText() {
    console.log("LEO");
  }

  getOpacity(): number {
    if (this.displayEdit) {
      return 0.5;
    }
  }
}
