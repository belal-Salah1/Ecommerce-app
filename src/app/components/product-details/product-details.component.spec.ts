import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsComponent } from './product-details.component';
import { provideRouter } from '@angular/router';
import { GetDataService } from '../../services/get-data.service';
import { DataStorageService } from '../../services/data-storage.service';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let dataStorageService: DataStorageService;
  let getDataService: GetDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailsComponent],
      providers:[provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    getDataService = TestBed.inject(GetDataService);
    dataStorageService = TestBed.inject(DataStorageService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('ngOninit',()=>{
    spyOn(dataStorageService, 'getCartData').and.returnValue(JSON.parse(JSON.stringify([
      {
        pdId: 8565,
        pdName: "SAMSUNG Galaxy F04 (Opal Green, 64 GB)",
        pdDesc: "With the stunning features of the Samsung Galaxy F04 smartphone, discover what it means to have a flawless user experience",
        pdPrice: 11499,
        pdCategory: "appliances",
        pdSubCategory: "mobile",
        pdImg: "assets/images/productimg/samasungmobile.webp"
      },
    ])))
    component.ngOnInit()
    expect(component.storeCartData).toEqual(dataStorageService.getCartData())
  })
});
