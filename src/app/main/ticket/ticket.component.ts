import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {InfoTransferService} from '../../info-transfer.service';
import {User} from '../../model/User.model';
import {ConfirmationService} from 'primeng/api';
import {ResourceService} from '../../resource.service';
import {Resource} from '../../model/Resource.model';
import {UserResourcesService} from '../user-table-info/user-resources.service';
import {NgForm} from '@angular/forms';
import {Ticket} from '../../model/ticket.model';
import {TicketService} from '../../ticket.service';
import {Router} from '@angular/router';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  user: User;
  owner: User;
  resources: Resource[];
  selectedResource: Resource[];
  ResourceDropdownSettings = {};
  ticketRENT: boolean;
  ticketSCRAP: boolean;
  ticket: Ticket;

  constructor(private confirmationService: ConfirmationService,
              private resourceService: ResourceService,
              private userResourceService: UserResourcesService,
              private ticketService: TicketService,
              private router: Router,
              private userService: UserService) {
    this.resources = [];
    this.selectedResource = [];
  }

  ngOnInit() {
    this.userService.getUserByEmail(sessionStorage.getItem('user_email')).subscribe(user => {
      this.user = user;
        this.dropdownSettings();
      this.resourceService.getResources().subscribe(res => {
        this.resources = res;
        this.confirmationService.confirm({
          message: 'Do you want a rent or scrap resource?',
          accept: () => {
            this.ticketRENT = true;
            this.ticketSCRAP = false;
          },
          reject: () => {
            this.resources = [];
            this.ticketSCRAP = true;
            this.ticketRENT = false;
            this.resourceService.getResourcesForUser(this.user.id).subscribe(rese => {
              this.resources = rese;
            });
          }
        });
      });
    });
  }
  backToMenu() {
    this.ticketRENT = false;
    this.ticketSCRAP = false;
    this.router.navigateByUrl('/main');
  }
  sentNewTicket(rentResUser: NgForm) {
    console.log(rentResUser.value);
    if (this.selectedResource[0] != null) {
      this.ticket = rentResUser.value;
    this.resourceService.getResource(this.selectedResource[0].id).subscribe(res => {
      this.ticket.resource = res;
      this.ticket.type = 1;
      this.ticket.owner = this.owner;
      this.ticket.user = this.user;
      console.log(this.ticket);
      this.ticketService.saveTicket(this.ticket);
      this.backToMenu();
    });
  } else {
    alert('Choose resource to rent');
    }
  }
  sentNewScrapTicket(scrapResUser: NgForm) {
    console.log(scrapResUser.value);
    if (this.selectedResource[0] != null) {
      this.ticket = scrapResUser.value;
      this.resourceService.getResource(this.selectedResource[0].id).subscribe(res => {
        this.ticket.resource = res;
        this.ticket.type = 0;
        this.ticket.user = this.user;
        console.log(this.ticket);
        this.ticketService.saveTicket(this.ticket);
        this.backToMenu();
      });
    } else {
      alert('Choose resource to rent');
    }
  }

  dropdownSettings() {
    this.ResourceDropdownSettings = {
      singleSelection: true,
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  onItemSelect(item: any) {
    if (this.selectedResource[0] != null) {
      let tempResId;
      tempResId = this.selectedResource[0].id;
      this.userResourceService.getUserFromResId(tempResId).subscribe(user => {
        this.owner = user;
      });
    }
  }
}
