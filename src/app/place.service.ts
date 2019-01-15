import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Place} from './model/place.model';
import {Resource} from './model/Resource.model';
import {Category} from './model/category.model';
import {User} from './model/User.model';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  constructor(private http: HttpClient) {
  }

  getActivePlace(id: number) {
    const url = 'http://localhost:8080/places/' + id;
    return this.http.get<Place>(url);
  }

  getAllPlaces() {
    const url = 'http://localhost:8080/places/';
    return this.http.get<Place[]>(url);
  }

  deletePlace(id: number) {
    const url = 'http://localhost:8080/places/' + id;
    this.http.delete(url).subscribe();
  }
  getPlace(param: number) {
    const url = 'http://localhost:8080/places/' + param;
    return this.http.get<Place>(url, this.httpOptions);
  }
  savePlace(place: Place) {
    const url = 'http://localhost:8080/places/';
    this.http.post<Place>(url, place, this.httpOptions).subscribe();
  }

  updatePlace(place: Place) {
    const url = 'http://localhost:8080/places/';
    this.http.put<Place>(url, place, this.httpOptions).subscribe();
  }

  getPlaceByName(param: string) {
    const url = 'http://localhost:8080/places/name/' + param;
    return this.http.get<Place>(url);
  }

  getResourceForPlace(param: number) {
    const url = 'http://localhost:8080/places/' + param + '/res';
    return this.http.get<Resource[]>(url);
  }
  addNewResourcesForPlace(placeId: number, resIds: number[]) {
    const url = 'http://localhost:8080/places/res/place/' + placeId;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    this.http.post(url, resIds, httpOptions).subscribe();
  }
}
