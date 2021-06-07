import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const AUTH_API = 'http://localhost:8080/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  username? :string;

  constructor(private http: HttpClient, private token:TokenStorageService) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signIn', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signUp', {
      username,
      email,
      password
    }, httpOptions);
  }

  isAuthenticated(): boolean {
    this.isLoggedIn = !!this.token.getToken();
   if (this.isLoggedIn) {
     const user = this.token.getUser();
     this.username = user.username;
   }

   return this.username !=null;

}
}
