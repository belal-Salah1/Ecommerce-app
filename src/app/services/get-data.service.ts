import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  constructor(private httpClient:HttpClient){}


  getSubCategories(){
    return this.httpClient.get(`${environment.apiUrl}/subcategories`);
  }
  getCategories(){
    return this.httpClient.get(`${environment.apiUrl}/categories`);
  }
  getProducts(){
    return this.httpClient.get(`${environment.apiUrl}/products`);
  }

}
