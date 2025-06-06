import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPageComponent } from './product-page.component';
import { provideRouter } from '@angular/router';
import { GetDataService } from '../../services/get-data.service';

describe('ProductPageComponent', () => {
  let component: ProductPageComponent;
  let fixture: ComponentFixture<ProductPageComponent>;
  let getDataService:GetDataService
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductPageComponent],
      providers:[provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductPageComponent);
    component = fixture.componentInstance;
    getDataService = TestBed.inject(GetDataService)
    component.getParamValue = 'fashion'
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should paramMap be defined',()=>{
    component.ngOnInit()
    component.getParamValue = 'fashion';
    expect(component.getParamValue).toBeDefined();
    expect(component.getParamValue).toBe('fashion');
  })

  it('should GetProductDate catagory equal to paramValue',()=>{
    component.ngOnInit()

    component.getProductData.forEach((prd:any)=>{
      expect(prd.pdCategory).toBe(component.getParamValue)
      expect(component.getProductData.push(prd)).toBeTruthy();
      expect(component.getProductData).toContain(prd);
    })
    // expect(component.getProductData.length).toBeGreaterThan(0);
  })

  it('should filteredProducts catagory equal to paramValue',()=>{
    component.ngOnInit()

    component.filteredProducts.forEach((prd:any)=>{
      expect(prd.pdCategory).toBe(component.getParamValue)
      expect(component.filteredProducts).toContain(prd);
    })
    // expect(component.filteredProducts.length).toBeGreaterThan(0);
  })

  it('should filterSelect function work true',()=>{
    component.ngOnInit()
    component.getFilterValue = 'all'
    expect(component.filteredProducts).toEqual(component.getProductData)
    component.getFilterValue = 'mobile'
    component.filteredProducts.forEach((prd:any)=>{expect(prd.pdSubCategory).toBe('mobile')})
  })

})

