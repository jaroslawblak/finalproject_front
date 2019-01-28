import { Component, OnInit } from '@angular/core';
import {ConfirmationService} from 'primeng/api';
import {UserService} from '../../../user.service';
import {isNumber} from "util";
import {User} from '../../../model/User.model';
import {Ticket} from '../../../model/ticket.model';
import {NgForm} from '@angular/forms';
import {TicketService} from '../../../ticket.service';
import {ResourceService} from '../../../resource.service';
import {Router} from '@angular/router';
import {Resource} from '../../../model/Resource.model';

@Component({
  selector: 'app-edit-table-tickets',
  templateUrl: './edit-table-tickets.component.html',
  styleUrls: ['./edit-table-tickets.component.css']
})
export class EditTableTicketsComponent implements OnInit {

  tickets: Ticket[];
  selectedTicket: Ticket;
  newTicket: Ticket;
  displayDialog: boolean;
  displayEditDialog: boolean;
  DropdownSettings: {};
  DropdownResourceSettings: {};
  users: User[];
  selectedUser: User[];
  selectedOwner: User[];
  resources: Resource[];
  selectedResources: Resource[];
  editForm: NgForm;

  constructor(private userService: UserService,
              private ticketService: TicketService,
              private resourceService: ResourceService,
              private confirmationService: ConfirmationService,
              private router: Router) {
    this.newTicket = new Ticket();
    this.selectedUser = [];
    this.selectedOwner = [];
    this.selectedResources = [];
    this.tickets = [];
    this.users = [];
    this.resources = [];
  }

  ngOnInit() {
    this.ticketService.getTickets().subscribe(tickets => {
      this.tickets = tickets;
      this.userService.getUsers().subscribe(users => {
        this.users = users;
        this.resourceService.getResources().subscribe(res => {
          this.resources = res;
          console.log(this.resources);
        });
      });
    });
    this.dropdownSettings();
  }
  getTicketType(ticket: Ticket): String {
    if (ticket.type == 0) {
      return 'SCRAP';
    } else {
      return 'RENT';
    }
  }

  selectTicket(event: Event, ticket: Ticket) {
    this.selectedTicket = ticket;
    this.displayDialog = true;
  }

  saveEditedTicket(editTicketForm: NgForm) {
    console.log(editTicketForm)
    this.newTicket = editTicketForm.value;
    this.newTicket.id = this.selectedTicket.id;
    this.newTicket.type =  (this.newTicket.type == 1 ? true : false);
    this.newTicket.active = (this.newTicket.type == 1 ? true : false);
    if (this.selectedUser[0] != null && this.selectedResources[0] != null) {
      this.userService.getUser(this.selectedUser[0].id).subscribe(user => {
        this.newTicket.user = user;
        this.resourceService.getResource(this.selectedResources[0].id).subscribe( res => {
          this.newTicket.resource = res;
          if (this.selectedOwner[0] != null) {
            this.userService.getUser(this.selectedOwner[0].id).subscribe(owner => {
              this.newTicket.owner = owner;
              this.ticketService.updateTicket(this.newTicket);
              window.location.reload();
            });
          } else {
            this.ticketService.updateTicket(this.newTicket);
            window.location.reload();
          }
        });
      });
    } else {
      alert('Choose a user and resource!');
    }
  }

  removeTicket(event: Event, ticket: Ticket) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to remove this ticket?',
      accept: () => {
        this.ticketService.deleteTicket(ticket.id);
        console.log(ticket.id);
        // window.location.reload();
      }
    });
  }

  onDialogHide() {
    this.selectedTicket = null;
  }

  addNewTicket() {
    this.router.navigateByUrl('/main/ticket');
  }

  editTicket(event: Event, ticket: Ticket) {
    this.selectedTicket = ticket;
    this.selectedUser.push(ticket.user);
    this.selectedOwner.push(ticket.owner);
    this.selectedResources.push(ticket.resource);
    this.displayEditDialog = true;
  }



  dropdownSettings() {
    this.DropdownSettings = {
      singleSelection: true,
      textField: 'firstName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.DropdownResourceSettings = {
      singleSelection: true,
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

}
