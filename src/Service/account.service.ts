import { HttpClient, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private myclient: HttpClient) { }

  private jwt_url = 'http://localhost:65323/api/Account/';

  login(userLogin: any): Observable<any> {
    return this.myclient.post<any>(this.jwt_url + 'Login', userLogin);
  }


  register(userDetails: any): Observable<any> {
    return this.myclient.post<any>(this.jwt_url + 'Register', userDetails);
  }

  

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');;
    if (!token) {
      return false; // Token not present
    }

    try {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp > currentTime; 
    } catch (error) {
      return false; 
    }
  }
}


