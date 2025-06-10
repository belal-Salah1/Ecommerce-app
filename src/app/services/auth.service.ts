import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logState!:boolean;
  // public isLoggedIn = this.logStateSubject.asObservable();
  constructor(){
    this.logState = false;
  }

  logIn(){
    this.logState = true;
  }
  logOut(){
    this.logState = false;
  }
  getLogState():boolean{
    return this.logState;
  }
}
