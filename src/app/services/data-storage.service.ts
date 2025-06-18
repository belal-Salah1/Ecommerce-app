import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  storeCartData(data: any): void {
    if (this.isBrowser) {
      try {
        const cartData = JSON.stringify(data);
        localStorage.setItem('cart-data', cartData);
      } catch (e) {
        console.error('Error storing cart data:', e);
      }
    }
  }

  getCartData(): any[] {
    if (!this.isBrowser) {
      return [];
    }
    try {
      const cartData = localStorage.getItem('cart-data');
      return cartData ? JSON.parse(cartData) : [];
    } catch (e) {
      console.error('Error retrieving cart data:', e);
      return [];
    }
  }
}
