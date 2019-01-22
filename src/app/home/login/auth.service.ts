import {Injectable} from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

export class LoginStatus {

  constructor(state: string, description: string) {
    this.state = state;
    this.description = description;
  }

  state: string;
  description: string;
}

@Injectable()
export class AuthService {
  isLoggedIn: Observable<boolean>;
  loginStatus: LoginStatus;
  private observer: Observer<boolean>;
  redirectUrl: string;
  serverUrl = 'http://localhost:8080';

  constructor(private http: HttpClient, private router: Router, private Cookie: CookieService) {
    this.isLoggedIn = new Observable(observer =>
      this.observer = observer
    );
  }

  login(email: string, password: string): Observable<LoginStatus> {
    let params = new HttpParams();
    params.append('username', email);
    params.append('password', password);
    params.append('grant_type', 'password');
    params.append('client_id', 'healthapp');
    let headers = new HttpHeaders({
      'Content-type': 'application/x-wwwform-urlencoded; charset=utf-8',
      'Authorization': 'Basic ' +
      btoa('healthapp:HeAltH@!23')
    });
    console.log(headers);
    this.http.post('http://localhost:8080/oauth/token', null, {headers: headers, params: params})
      .subscribe(
        res => {
          console.log(res);
          // this.saveToken(res.json());
          return new LoginStatus('SUCCESS', 'Login Successful');
        },
        err => {
          console.log(err);
          return new LoginStatus('FAILED', 'Login Failed');
        }
      );
    return null;
  }

  //     });
  //    } catch((error: any) => {
  //        return Observable.of(new LoginStatus('FAILURE', 'Username or password is incorrect. Please try again!'));
  //      });
  // }
  saveToken(token: any) {
    let expireDate = new Date().getTime() + (1000 *
      token.expires_in);
    this.Cookie.set('access_token', token.access_token, expireDate);
    this.Cookie.set('role', token.role);
    this.changeLoginStatus(true);
    if (token.role === 'ROLE_DOCTOR') {
      this.router.navigate(['rx']);
    } else {
      this.router.navigate(['patient/home']);
    }
  }

  checkCredentials() {
    if (!this.Cookie.check('access_token')) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.Cookie.delete('access_token');
    this.Cookie.delete('role');
    this.changeLoginStatus(false);
  }

  changeLoginStatus(status: boolean) {
    if (this.observer !== undefined) {
      this.observer.next(status);
    }
  }
}
