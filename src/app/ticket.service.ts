import { Injectable } from '@angular/core';
import {User} from './model/User.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Resource} from './model/Resource.model';
import {Ticket} from './model/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  constructor(private http: HttpClient) { }


  saveTicket(ticket: Ticket) {
    const url = 'http://localhost:8080/ticket';
    this.http.post<Ticket>(url, ticket, this.httpOptions).subscribe();
  }
  saveScrapTicket(ticket: Ticket) {
    const url = 'http://localhost:8080/ticket';
    this.http.post<Ticket>(url, ticket, this.httpOptions).subscribe();
  }
  getNotActiveTicketRent() {
    const url = 'http://localhost:8080/ticket/notactive/rent/';
    return this.http.get<Ticket[]>(url, this.httpOptions);
  }

  updateTicket(ticket: Ticket) {
    const url = 'http://localhost:8080/ticket';
    this.http.put<Ticket>(url, ticket, this.httpOptions).subscribe();
  }
  getTickets() {
    const url = 'http://localhost:8080/tickets';
    return this.http.get<Ticket[]>(url, this.httpOptions);
  }
  deleteTicket(id: number) {
    const url = 'http://localhost:8080/ticket/' + id;
    return this.http.delete(url).subscribe();
  }
  getNotActiveTicketScrap() {
    const url = 'http://localhost:8080/ticket/notactive/scrap/';
    return this.http.get<Ticket[]>(url, this.httpOptions);
  }
  getNotActiveTicketsByOwner(param: number) {
    const url = 'http://localhost:8080/ticket/notactive/owner/' + param;
    return this.http.get<Ticket[]>(url, this.httpOptions);
  }
  getNotActiveTicketsByUser(param: number) {
    const url = 'http://localhost:8080/ticket/notactive/user/' + param;
    return this.http.get<Ticket[]>(url, this.httpOptions);
  }

  getTicketsByOwner(param: number) {
    const url = 'http://localhost:8080/ticket/user/' + param;
    return this.http.get<Ticket[]>(url, this.httpOptions);
  }
  getTicketsByUser(param: number) {
    const url = 'http://localhost:8080/ticket/notactive/user/' + param;
    return this.http.get<Ticket[]>(url, this.httpOptions);
  }
  acceptTicket(id: number) {
    const url = 'http://localhost:8080/ticket/accept/' + id;
    this.http.post<Ticket>(url, this.httpOptions).subscribe();
  }
  rejectTicket(id: number) {
    const url = 'http://localhost:8080/ticket/reject/' + id;
    this.http.post<Ticket>(url, this.httpOptions).subscribe();
  }
}


