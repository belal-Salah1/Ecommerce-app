import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsComponent } from './product-details.component';
import { GetDataService } from '../../services/get-data.service';
import { DataStorageService } from '../../services/data-storage.service';
import { ActivatedRoute } from '@angular/router';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let _getDataService: GetDataService;
  let _dataStorageService: DataStorageService;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('8565'),
        },
      },
    };

    await TestBed.configureTestingModule({
      imports: [ProductDetailsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        GetDataService,
        DataStorageService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    _getDataService = TestBed.inject(GetDataService);
    _dataStorageService = TestBed.inject(DataStorageService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize correctly on ngOnInit when product is found and not in cart initially (then added to cart logic check)', () => {
    interface product {
      pdId: number;
      pdName: string;
      pdDesc: string;
      pdPrice: number;
      pdCategory: string;
      pdSubCategory: string;
      pdImg: string;
    }
    let prd: product[] = JSON.parse(
      JSON.stringify([
        {
          pdId: 8565,
          pdName: 'SAMSUNG Galaxy F04 (Opal Green, 64 GB)',
          pdDesc:
            'With the stunning features of the Samsung Galaxy F04 smartphone, discover what it means to have a flawless user experience',
          pdPrice: 11499,
          pdCategory: 'appliances',
          pdSubCategory: 'mobile',
          pdImg: 'assets/images/productimg/samasungmobile.webp',
        },
      ])
    );
    spyOn(_dataStorageService, 'getCartData').and.returnValue(prd);
    _getDataService.productData = prd;

    fixture.detectChanges();
    expect(component.storeCartData).toEqual(prd);
    expect(component.getParamValue).toEqual('8565');
    expect(component.getProductDetails).toEqual(prd[0]);

    expect(component.inCart).toBe(true);
  });

  it('should set inCart to true if product is already in cart on init', () => {
    interface Product {
      pdId: number;
      pdName: string;
      pdDesc: string;
      pdPrice: number;
      pdCategory: string;
      pdSubCategory: string;
      pdImg: string;
    }
    const productInCart: Product = {
      pdId: 8565,
      pdName: 'SAMSUNG Galaxy F04',
      pdDesc: 'Desc',
      pdPrice: 11499,
      pdCategory: 'appliances',
      pdSubCategory: 'mobile',
      pdImg: 'path.webp',
    };
    const initialCartData: Product[] = [productInCart];

    spyOn(_dataStorageService, 'getCartData').and.returnValue(initialCartData);
    _getDataService.productData = [productInCart];
    mockActivatedRoute.snapshot.paramMap.get.and.returnValue(
      productInCart.pdId.toString()
    );

    fixture.detectChanges();

    expect(component.inCart).toBe(true);
    expect(component.getProductDetails).toEqual(productInCart);
    expect(component.storeCartData).toEqual(initialCartData);
  });

  it('should add product to cart and navigate', () => {
    const routerSpy = spyOn(component['_router'], 'navigate');

    const productToAdd = {
      pdId: 123,
      pdName: 'Test Product',
      pdPrice: 100,
      pdDesc: '',
      pdCategory: '',
      pdSubCategory: '',
      pdImg: '',
    };
    component.storeCartData = [];
    spyOn(_dataStorageService, 'storeCartData');

    component.addCart(productToAdd);

    expect(component.storeCartData).toContain(productToAdd);
    expect(_dataStorageService.storeCartData).toHaveBeenCalledWith(
      component.storeCartData
    );
    expect(routerSpy).toHaveBeenCalledWith(['/cart']);
  });
});
