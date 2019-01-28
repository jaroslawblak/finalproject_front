import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PdfFileService {

  constructor(private http: HttpClient) { }

  getPdfFile(id: number){
    let url = 'http://localhost:8080/documents/resource/' + id;
    return this.http.get<any>(url,{responseType: 'arraybuffer' as 'json'});
  }
}
