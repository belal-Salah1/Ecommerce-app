import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { GetDataService } from '../../services/get-data.service';
import { CurrencyPipe } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-product-page',
  imports: [CurrencyPipe, RouterLink, RouterModule, NavbarComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProductPageComponent implements OnInit {
  getParamValue: any;
  getProductData: any = [];
  filteredProducts: any = [];
  getSubCatagoryOptions: any = [];
  getFilterValue:any;
  constructor(
    private _router: ActivatedRoute,
    private _getDataService: GetDataService
  ) {}
  ngOnInit() {
    this.getParamValue = this._router.snapshot.paramMap.get('name');

    this._getDataService.productData.filter((prd: any) => {
      if (prd.pdCategory == this.getParamValue) {
        this.getProductData.push(prd);
        this.filteredProducts.push(prd);
      }
    });
    this._getDataService.subCategorisFilterData.filter((prd) => {
      if (prd.categories == this.getParamValue) {
        this.getSubCatagoryOptions.push(prd);
      }
    });
  }

  filterSelect(data: any) {
    this.filteredProducts = [];
    this.getFilterValue = data.target.value;
    if (this.getFilterValue != 'all') {
      this._getDataService.productData.filter((prd) => {
        if (prd.pdSubCategory == this.getFilterValue) {
          this.filteredProducts.push(prd);
        }
      });
    } else {
      this.filteredProducts = this.getProductData;
    }
  }
}
