import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Place} from './place.model';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private http: HttpClient) {
  }

  getActivePlace(id: number) {
    const url = 'http://localhost:8080/places/' + id;
    return this.http.get<Place>(url);
  }

  getAllPlaces() {
    const url = 'http://localhost:8080/places';
    return this.http.get<Place[]>(url);
  }
}
