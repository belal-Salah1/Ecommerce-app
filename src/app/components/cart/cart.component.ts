import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../services/data-storage.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, NavbarComponent, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  getCartProducts: any = [];
  TotalAmount: number = 0;
  productsCount: number = 0;

  constructor(private _dataStorageService: DataStorageService, private _router:Router) {}

  ngOnInit() {
    this.getCartProducts = this._dataStorageService.getCartData();
    this.getCartProducts.forEach((prd: any) => {
      prd.quantity = prd.quantity || 1;
    });
    this.updateTotalAmount();
    this.productsCount = this.getCartProducts.length;
  }

  removeProduct(data: any) {
    this.getCartProducts = this.getCartProducts.filter((prd: any) => prd.pdId !== data.pdId);
    this._dataStorageService.storeCartData(this.getCartProducts);
    this.updateTotalAmount();
    this.productsCount = this.getCartProducts.length;
  }

  plusCount(data: any) {
    if (data.quantity < 5) {
    this.productsCount +=1;
    data.quantity += 1;
    this.updateTotalAmount();
    }
  }

  minusCount(data: any) {
    if (data.quantity > 1) {
      this.productsCount -=1;
      data.quantity -= 1;
      this.updateTotalAmount();
    }
  }

  updateTotalAmount() {
    this.TotalAmount = this.getCartProducts.reduce((total: number, prd: any) => {
      return total + (prd.pdPrice * prd.quantity);
    }, 0);
  }
  orderNow(){
    this._router.navigate(['/home']);
    localStorage.removeItem('cart-data')
  }


}
