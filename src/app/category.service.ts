import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Category} from './categories/category.model';
import {Resource} from './Resource.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  getActiveCategories(id: number) {
    const url = 'http://localhost:8080/categories/res/' + id;
    return this.http.get<Category[]>(url);
  }

  getAllCategories() {
    const url = 'http://localhost:8080/categories';
    return this.http.get<Category[]>(url);
  }

  updateResToCategory(id: number, categoryIds: number[]) {
    const url = 'http://localhost:8080/categories/res/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    console.log('Updating Resource2Category Table...');
    this.http.post(url, categoryIds, httpOptions).subscribe();
  }
}
