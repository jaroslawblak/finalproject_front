import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Resource} from './model/Resource.model';
import {BehaviorSubject} from 'rxjs';
import {User} from './model/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private idUser = new BehaviorSubject<number>(0);
  currentUserId = this.idUser.asObservable();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };


  constructor(private http: HttpClient) {
  }

  changeIdResForUserEdit(id: number) {
    console.log(this.idUser);
    this.idUser.next(id);
  }

  getUser(param: number) {
    const url = 'http://localhost:8080/users/' + param;
    return this.http.get<User>(url, this.httpOptions);
  }

  getUserByEmail(param: string) {
    const url = 'http://localhost:8080/users/email';
    const body = new HttpParams().set('email', param);
    const headers = new HttpHeaders().set('Content-Type', 'application/json' )
    return this.http.get<User>(url, {headers: headers, params: body});
  }



  getUsers() {
    const url = 'http://localhost:8080/users/';
    return this.http.get<User[]>(url, this.httpOptions);
  }

  saveUser(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    const url = 'http://localhost:8080/users';
    this.http.post<Resource>(url, user, httpOptions).subscribe();
  }

  updateUser(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    const url = 'http://localhost:8080/users';
    this.http.put<Resource>(url, user, httpOptions).subscribe();
  }

  deleteUser(id: number) {
    const url = 'http://localhost:8080/users/' + id;
    this.http.delete(url).subscribe();
  }
}
