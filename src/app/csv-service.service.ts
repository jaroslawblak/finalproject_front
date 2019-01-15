import { Injectable } from '@angular/core';
import {ResourceCategory} from './model/resourceCategory.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CsvServiceService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  constructor(private http: HttpClient) { }

  generateCsv(param: string) {
    const url = 'http://localhost:8080/' + param + '/csv';
    this.http.get<ResourceCategory>(url, this.httpOptions).subscribe();
  }

}
