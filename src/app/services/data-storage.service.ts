import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor() {}

  storeCartData(data:any){
    const cartData = JSON.stringify(data);
    localStorage.setItem('cart-data' , cartData)
  }

  getCartData(){
    const Getdata = localStorage.getItem('cart-data');
    return Getdata? JSON.parse(Getdata):[]
  }
}
