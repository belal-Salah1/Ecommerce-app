import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logState: boolean = false;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  logIn() {
    if (this.isBrowser) {
      try {
        localStorage.setItem('logState', 'true');
        this.logState = true;
      } catch (e) {
        console.error('Error accessing localStorage:', e);
      }
    }
  }

  logOut() {
    if (this.isBrowser) {
      try {
        localStorage.removeItem('logState');
        this.logState = false;
      } catch (e) {
        console.error('Error accessing localStorage:', e);
      }
    }
  }

  getLogState(): boolean {
    if (this.isBrowser) {
      try {
        return !!localStorage.getItem('logState');
      } catch (e) {
        console.error('Error accessing localStorage:', e);
        return false;
      }
    }
    return false;
  }
}
