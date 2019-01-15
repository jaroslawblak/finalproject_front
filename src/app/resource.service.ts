import {Injectable} from '@angular/core';
import {Resource} from './model/Resource.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {User} from './model/User.model';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  private idResForUserEdit = new BehaviorSubject<number>(0);
  currentMessage = this.idResForUserEdit.asObservable();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };


  constructor(private http: HttpClient) {
  }

  changeIdResForUserEdit(id: number) {
    console.log(this.idResForUserEdit);
    this.idResForUserEdit.next(id);
  }

  getResource(param: number) {
    const url = 'http://localhost:8080/resources/' + param;
    return this.http.get<Resource>(url, this.httpOptions);
  }

  getResources() {
    const url = 'http://localhost:8080/resources/';
    return this.http.get<Resource[]>(url, this.httpOptions);
  }

  updateResource(resource: Resource) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    const url = 'http://localhost:8080/resources';
    this.http.put<Resource>(url, resource, httpOptions).subscribe();
  }
  saveResource(resource: Resource) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    const url = 'http://localhost:8080/resources';
    this.http.put<Resource>(url, resource, httpOptions).subscribe();
  }
  deleteResource(id: number) {
    const url = 'http://localhost:8080/resources/' + id;
    this.http.delete(url).subscribe();
  }
  getResourcesForUser(id: number) {
    const url = 'http://localhost:8080/user/' + id + '/res';
    return this.http.get<Resource[]>(url, this.httpOptions);
  }
}
