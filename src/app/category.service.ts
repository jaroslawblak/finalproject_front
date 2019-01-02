import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Category} from './categories/category.model';

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
}
