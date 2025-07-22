import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logState: boolean = false;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object, private httpClient:HttpClient) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  login(credentials :{email:string,password:string}):Observable<any> {
       return  this.httpClient.post(`${environment.apiUrl}/users/login`,credentials)
  }
  register(credentials : {name:string , email:string , password:string}):Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/users/register`,credentials)
  }

  logOut() {
    localStorage.removeItem('token')
  }

  getLogState(): boolean {
    if (this.isBrowser) {
      try {
        return !!localStorage.getItem('token');
      } catch (e) {
        console.error('Error accessing localStorage:', e);
        return false;
      }
    }
    return false;
  }
}
