import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { GetDataService } from '../../services/get-data.service';
import { CurrencyPipe } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, RouterModule, NavbarComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductPageComponent implements OnInit {
  getParamValue: string | null = null;
  getProductData: any[] = [];
  filteredProducts: any[] = [];
  getSubCatagoryOptions: any[] = [];
  getFilterValue: string = 'all';
  isLoading: boolean = true;

  constructor(
    private _router: ActivatedRoute,
    private _getDataService: GetDataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getParamValue = this._router.snapshot.paramMap.get('name');
    this.loadProducts();
    this.loadSubCategories();
  }

  loadProducts() {
    this.isLoading = true;
    this._getDataService.getProducts().subscribe({
      next: (res: any) => {
        this.getProductData = res.data.products.filter((prd: any) =>
          prd.pdCategory === this.getParamValue
        );
        this.filteredProducts = [...this.getProductData];
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });
  }

  loadSubCategories() {
    this._getDataService.getSubCategories().subscribe({
      next: (res: any) => {
        this.getSubCatagoryOptions = res.data.SubCatagories.filter(
          (prd: any) => prd.categories === this.getParamValue
        );
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading subcategories:', error);
        this.cdr.markForCheck();
      }
    });
  }

  filterSelect(data: any) {
    const filterValue = data.target.value;
    if (filterValue !== 'all') {
      this.filteredProducts = this.getProductData.filter(
        (prd) => prd.pdSubCategory === filterValue
      );
    } else {
      this.filteredProducts = [...this.getProductData];
    }
    this.cdr.markForCheck();
  }
}
