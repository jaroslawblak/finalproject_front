import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Resource} from '../../Resource.model';
import {Observable} from 'rxjs';
import {UserResource} from '../../UserResource.model';


@Injectable({
  providedIn: 'root'
})
export class UserResourcesService {

  constructor(private http: HttpClient) { }

  getUserResource(param?: number) {
    const url = 'http://localhost:8080/usersResources/user/' + param;
    return this.http.get<UserResource[]>(url);
  }
  getResources() {
    const url = 'http://localhost:8080/resources/';
    return this.http.get<Resource[]>(url);
  }
 }
