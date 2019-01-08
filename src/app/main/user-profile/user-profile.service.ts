import { Injectable } from '@angular/core';
import {Resource} from '../../model/Resource.model';
import {HttpClient} from '@angular/common/http';
import {User} from '../../model/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: HttpClient) { }

  getUserProfile(param?: number) {
    const url = 'http://localhost:8080/users/' + param;
    return this.http.get<User>(url);
  }
}

