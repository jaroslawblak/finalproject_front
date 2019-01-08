import {Component, OnInit} from '@angular/core';
import {UserResourcesService} from './user-resources.service';
import {Resource} from '../../model/Resource.model';
import {UserResource} from '../../model/UserResource.model';
import {User} from '../../model/User.model';
import {ResourceService} from '../../resource.service';
import {Category} from '../../model/category.model';
import {CategoryService} from '../../category.service';
import {_isNumberValue} from '@angular/cdk/coercion';
import {InfoTransferService} from '../../info-transfer.service';
import {TicketService} from '../../ticket.service';
import {Ticket} from '../../model/ticket.model';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-user-table-info',
  templateUrl: './user-table-info.component.html',
  styleUrls: ['./user-table-info.component.css'],

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
  displayNotCheckedTickets = false;
  displayCheckedTickets = false;
  notActiveTicketOwners: Ticket[];

  constructor(private userResourcesService: UserResourcesService,
              private resourceService: ResourceService,
              private categoryService: CategoryService,
              private infoTransferService: InfoTransferService,
              private ticketService: TicketService,
              private userService: UserService) {
    this.userResources = [];
    this.categories = [];
    this.resources = [];
    this.notActiveTicketOwners = [];
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }

  ngOnInit() {
    this.resourceService.currentMessage.subscribe(id => this.id = id);
    this.userResourcesService.getUserResourceForUser(this.user.id).subscribe(data => {
      this.userResources = data;
      this.loadResources(this.userResources);
    });
    this.infoTransferService.displayEditState.subscribe(isActive => this.displayEdit = isActive);
  }

  removeEdit(id: number) {

  }
  showCheckedTickets() {
    this.displayNotCheckedTickets = true;
    this.displayEdit = false;
    this.displayView = false;
    this.displayNotCheckedTickets = false;
    this.ticketService.getTicketsByOwner(this.user.id).subscribe(tickets => {
      this.notActiveTicketOwners = tickets;
    });
  }
  showNotCheckedTickets() {
    this.displayNotCheckedTickets = true;
   this.displayCheckedTickets = false;
  this.displayEdit = false;
    this.displayView = false;
    this.ticketService.getNotActiveTicketsByOwner(this.user.id).subscribe(tickets => {
      this.notActiveTicketOwners = tickets;
    });
  }

  showEdit(id: number) {
    this.resourceService.changeIdResForUserEdit(id);
    this.displayCheckedTickets = false;
    this.displayView = false;
    this.displayNotCheckedTickets = false;
    this.displayEdit = true;
  }

  showView(id: number) {
    this.resourceService.getResource(id).subscribe(data => {
      this._resource = data;
    });
    this.displayView = true;
    this.displayEdit = false;
    this.displayCheckedTickets = false;
    this.displayNotCheckedTickets = false;
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

