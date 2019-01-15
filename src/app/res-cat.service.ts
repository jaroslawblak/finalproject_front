import { Injectable } from '@angular/core';
import {User} from './model/User.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ResourceCategory} from './model/resourceCategory.model';

@Injectable({
  providedIn: 'root'
})
export class ResCatService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

}
