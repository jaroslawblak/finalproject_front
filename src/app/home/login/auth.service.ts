import {Injectable} from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {Login} from '../../model/login.model';


@Injectable()
export class AuthService {
  isLoggedIn: Observable<boolean>;
  private observer: Observer<boolean>;
  redirectUrl: string;
  serverUrl = 'http://localhost:8080';

  constructor(private http: HttpClient, private router: Router) {
    this.isLoggedIn = new Observable(observer =>
      this.observer = observer
    );
  }

  login(login: Login) {
    this.http.post<Observable<any>>(this.serverUrl + '/login', login, {observe: 'response'}).subscribe(
      res => {
        if (res.status === 202) {
          this.getAccessToken(login);
        } else {
          alert('Invalid username or password!');
          return false;
        }
      }, err => {
        alert('Invalid username or password!');
        return false;
      }
    );
    return false;
  }

  getAccessToken(login: Login) {
    let params = new HttpParams()
      .set('username', login.email)
      .set('password', login.password)
      .set('grant_type', 'password');
    let headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' +
      btoa('html5:password1'),
    });
    this.http.post('http://localhost:8080/oauth/token', params.toString(), {headers: headers, observe: 'response'}).subscribe(
      res => {
        let token = res.body.access_token;
        sessionStorage.setItem('access_token', token);
        sessionStorage.setItem('user_email', login.email);
        this.router.navigateByUrl('main');

      },
      err => {
        this.router.navigateByUrl('login');
        console.log(err);
      }
    );
  }

  checkCredentials(): boolean {
    if (sessionStorage.getItem('access_token') == null) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }

  logout() {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('role');
  }
}
