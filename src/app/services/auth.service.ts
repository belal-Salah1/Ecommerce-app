import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logState!:boolean;
  constructor(){
    // this.logState = false;
  }

  logIn(){
    localStorage.setItem('logState', 'true');

    // this.logState = true;
  }
  logOut(){
    localStorage.removeItem('logState');
    // this.logState = false;
  }
  getLogState():boolean{
    return !!localStorage.getItem('logState');
  }
}
