import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Resource} from '../../model/Resource.model';
import {Observable} from 'rxjs';
import {UserResource} from '../../model/UserResource.model';
import {User} from '../../model/User.model';


@Injectable({
  providedIn: 'root'
})
export class UserResourcesService {

  constructor(private http: HttpClient) { }

  getUserResourceForUser(param?: number) {
    const url = 'http://localhost:8080/usersResources/user/' + param;
    return this.http.get<UserResource[]>(url);
  }
  getUserResources() {
    const url = 'http://localhost:8080/usersResources/';
    return this.http.get<UserResource[]>(url);
  }
  getUserResource(param?: number) {
    const url = 'http://localhost:8080/usersResources/' + param;
    return this.http.get<UserResource>(url);
  }


  saveUserResources(userResource: UserResource) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    const url = 'http://localhost:8080/usersResources/';
    console.log(userResource);
    this.http.post<UserResource>(url, userResource, httpOptions).subscribe();
  }

  updateUserResource(userResource: UserResource) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    const url = 'http://localhost:8080/usersResources/';
    this.http.put<UserResource>(url, userResource, httpOptions).subscribe();
  }

  deleteUserResource(id: number) {
    const url = 'http://localhost:8080/usersResources/' + id;
    this.http.delete(url).subscribe();
  }

  getUserFromResId(Resid: number) {
    const url = 'http://localhost:8080/usersResources/res/' + Resid + '/user';
    return this.http.get<User>(url);
  }
 }
