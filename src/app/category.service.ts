import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Category} from './model/category.model';
import {Resource} from './model/Resource.model';
import {User} from './model/User.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  getCategory(param: number) {
    const url = 'http://localhost:8080/categories/' + param;
    return this.http.get<Category>(url);
  }

  getCategoryByName(param: string) {
    const url = 'http://localhost:8080/categories/name/' + param;
    return this.http.get<Category>(url);
  }

  getResourceForCategories(param: number) {
    const url = 'http://localhost:8080/categories/' + param + '/res';
    return this.http.get<Resource[]>(url);
  }

  getActiveCategories(id: number) {
    const url = 'http://localhost:8080/categories/res/' + id;
    return this.http.get<Category[]>(url);
  }

  getAllCategories() {
    const url = 'http://localhost:8080/categories';
    return this.http.get<Category[]>(url);
  }
  addNewResourcesForCategory(categoryId: number, resIds: number[]) {
    const url = 'http://localhost:8080/categories/res/cat/' + categoryId;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    this.http.post(url, resIds, httpOptions).subscribe();
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

  saveCategory(category: Category) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    const url = 'http://localhost:8080/categories';
    this.http.post<Resource>(url, category, httpOptions).subscribe();
  }

  updateCategory(category: Category) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    const url = 'http://localhost:8080/categories';
    this.http.put<Resource>(url, category, httpOptions).subscribe();
  }

  deleteCategory(id: number) {
    const url = 'http://localhost:8080/categories/' + id;
    this.http.delete(url).subscribe();
  }
}
