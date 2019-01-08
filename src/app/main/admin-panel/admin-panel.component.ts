import { Component, OnInit } from '@angular/core';
import {Table} from '../../model/table.model';
import {InfoTransferService} from '../../info-transfer.service';
import {Router} from '@angular/router';
import {Ticket} from '../../model/ticket.model';
import {TicketService} from '../../ticket.service';
import {SelectItem} from 'primeng/api';
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
  animations: [
    trigger('rowExpansionTrigger', [
      state('void', style({
        transform: 'translateX(-10%)',
        opacity: 0
      })),
      state('active', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})
export class AdminPanelComponent implements OnInit {

  tables: Table[];
  checkTickets = false;
  rentResource = true;
  scrapResource = false;
  notActiveTicketRent: Ticket[];
  notActiveTicketScrap: Ticket[];
  cols: any[];

  constructor(private dataTransfer: InfoTransferService, private router: Router,
              private ticketService: TicketService) {
    this.tables = [
      {id: 1, title: 'Users'},
      {id: 2, title: 'User-Resources'},
      {id: 3, title: 'Resources'},
      {id: 4, title: 'Documents'},
      {id: 5, title: 'Places'},
      {id: 6, title: 'Resources-Categories'},
      {id: 7, title: 'Category'},
      {id: 8, title: 'Children-of-resource'}
      ];

      this.cols = [
        { field: 'id', header: 'ID' },
        { field: 'resource', header: 'Resource' },
        { field: 'user', header: 'Raporter' },
        { field: 'owner', header: 'Owner' },
        { field: 'addTime', header: 'Added' },
        { field: 'dateFrom', header: 'Dato From' },
        { field: 'dateTo', header: 'Dato To' },
        { field: 'Accept', header: 'Accept' },
        { field: 'Decline', header: 'Decline' }
    ];
  }

  ngOnInit() {
    this.ticketService.getNotActiveTicketRent().subscribe(ticketsR => {
      this.notActiveTicketRent = ticketsR;
      console.log(this.notActiveTicketRent);
      this.ticketService.getNotActiveTicketScrap().subscribe(ticketsS => {
        this.notActiveTicketScrap = ticketsS;
        console.log(this.notActiveTicketScrap);
    });
  });
  }

  selectedTable(table: Table) {
    this.router.navigateByUrl(`main/admin/edit/` + table.title);
  }

  showTickets() {
    this.checkTickets = true;
  }

  acceptRentTicket(id: number) {
    this.ticketService.acceptTicket(id);
    let tempTicket = this.notActiveTicketRent.filter(ticket => ticket.id === id);
    let index = this.notActiveTicketRent.indexOf(tempTicket[0]);
    this.notActiveTicketRent.splice(index, 1)
  }
  rejectRentTicket(id: number) {
    this.ticketService.rejectTicket(id);
    let tempTicket = this.notActiveTicketRent.filter(ticket => ticket.id === id);
    let index = this.notActiveTicketRent.indexOf(tempTicket[0]);
    this.notActiveTicketRent.splice(index, 1)
  }

  acceptScrapTicket(id: number) {
    this.ticketService.acceptTicket(id);
    let tempTicket = this.notActiveTicketRent.filter(ticket => ticket.id === id);
    let index = this.notActiveTicketRent.indexOf(tempTicket[0]);
    this.notActiveTicketRent.splice(index, 1);
  }
  rejectScrapTicket(id: number) {
    this.ticketService.rejectTicket(id);
    let tempTicket = this.notActiveTicketScrap.filter(ticket => ticket.id === id);
    let index = this.notActiveTicketScrap.indexOf(tempTicket[0]);
    this.notActiveTicketRent.splice(index, 1);
  }

  paginate(event: Event) {
    console.log(event.page)
    if (event.page === 1) {
      this.rentResource = true;
      this.scrapResource = false;
    } else {
      this.rentResource = false;
      this.scrapResource = true;
    }
  }

  onDialogHide() {
    this.checkTickets = false;
  }
}
