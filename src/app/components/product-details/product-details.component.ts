import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GetDataService } from '../../services/get-data.service';
import { CurrencyPipe, NgIf } from '@angular/common';
import { DataStorageService } from '../../services/data-storage.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe, NgIf, RouterLink, NavbarComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProductDetailsComponent implements OnInit {
  getParamValue: any;
  getProductDetails: any;
  storeCartData: any = [];
  inCart: boolean = false;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _getDataService: GetDataService,
    private _DataStorageService: DataStorageService,
    private _router: Router
  ) {}
  ngOnInit() {
    this.storeCartData = this._DataStorageService.getCartData();
    this.getParamValue = this._activatedRoute.snapshot.paramMap.get('id');
    this._getDataService.productData.filter((prd) => {
      if (prd.pdId == this.getParamValue) {
        this.getProductDetails = prd;
      }
    });

    this.storeCartData.filter((prd: any) => {
      if (prd.pdId == this.getParamValue) {
        this.inCart = true;
      }
    });
  }

  addCart(data: any) {
    this.storeCartData.push(data);
    this._DataStorageService.storeCartData(this.storeCartData);
    this._router.navigate(['/cart']);
  }
}
