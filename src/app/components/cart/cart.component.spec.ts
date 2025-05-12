import { ComponentFixture, TestBed } from "@angular/core/testing"
import { CartComponent } from "./cart.component"
import { DataStorageService } from "../../services/data-storage.service";
import { RouterTestingModule } from "@angular/router/testing";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NavbarComponent } from "../navbar/navbar.component";
import { Router } from "@angular/router";

describe('Cart Component', ()=>{
  let fixture:ComponentFixture<CartComponent>;
  let comp:CartComponent;
  let _dataStorageService:jasmine.SpyObj<DataStorageService>;

  beforeEach(async()=>{
    const dataStorageSpy = jasmine.createSpyObj('DataStorageService', ['getCartData', 'storeCartData']);
    await TestBed.configureTestingModule({

      imports: [CommonModule, CartComponent, FormsModule,NavbarComponent, RouterTestingModule],
      providers:[{provide :DataStorageService, useValue:dataStorageSpy}],
    })
    fixture = TestBed.createComponent(CartComponent);
    comp = fixture.componentInstance;
    _dataStorageService = TestBed.inject(DataStorageService) as jasmine.SpyObj<DataStorageService>;
  })
  it('should created' , ()=>{
    expect(comp).toBeTruthy();
  })
  describe('ngOnInit', ()=>{
    beforeEach(()=>{
      _dataStorageService.getCartData.and.returnValue([{ pdId: 1, pdName: 'iphone 14', pdPrice: 20000 },{ pdId: 2, pdName: 'iphone 15', pdPrice: 25000 }]);
      comp.ngOnInit();
      fixture.detectChanges();
    })

    it('test ng on init functions', ()=>{
      expect(comp.getCartProducts).toBeDefined();
      expect(comp.getCartProducts.length).toBe(2);
      expect(comp.getCartProducts[0].pdName).toBe('iphone 14');
      expect(comp.getCartProducts[0].pdPrice).toBe(20000);
      let prdCount = comp.productsCount
      expect(comp.getCartProducts.length).toEqual(prdCount)
    })
  })
  describe('remove product' ,()=>{
    beforeEach(() => {
      _dataStorageService.getCartData.and.returnValue([{ pdId: 1, pdName: 'iphone 14', pdPrice: 20000,quantity:1 },{ pdId: 2, pdName: 'iphone 15', pdPrice: 25000, quantity:1 }]);
      comp.ngOnInit();
      comp.removeProduct(comp.getCartProducts[0]);
    });

    it('should remove the product correctly', () => {
      expect(comp.getCartProducts[0]).toEqual({ pdId: 2, pdName: 'iphone 15', pdPrice: 25000, quantity: 1 });
      expect(comp.getCartProducts.length).toBe(1);
      expect(comp.productsCount).toBe(1);
      expect(_dataStorageService.storeCartData).toHaveBeenCalledWith(comp.getCartProducts);
      expect(comp.TotalAmount).toBe(25000);
    });
  })
  describe('plusCount', () => {
    beforeEach(() => {
      _dataStorageService.getCartData.and.returnValue([
        { pdId: 1, pdName: 'iphone 14', pdPrice: 20000, quantity: 1 }
      ]);
      comp.ngOnInit();
    });

    it('should increase the quantity of the product if it is less than 5', () => {
      const product = comp.getCartProducts[0];
      const initialCount = comp.productsCount;

      comp.plusCount(product);
      expect(product.quantity).toBe(2);
      expect(comp.productsCount).toBe(initialCount + 1);


      comp.plusCount(product);
      expect(product.quantity).toBe(3);
      expect(comp.productsCount).toBe(initialCount + 2);


      comp.plusCount(product);
      expect(product.quantity).toBe(4);
      expect(comp.productsCount).toBe(initialCount + 3);


      comp.plusCount(product);
      expect(product.quantity).toBe(5);
      expect(comp.productsCount).toBe(initialCount + 4);

      comp.plusCount(product);
      expect(product.quantity).toBe(5);
      expect(comp.productsCount).toBe(initialCount + 4);
    });
  });
  describe('MinusCount', () => {
    beforeEach(() => {
      _dataStorageService.getCartData.and.returnValue([
        { pdId: 1, pdName: 'iphone 14', pdPrice: 20000, quantity: 1 }
      ]);
      comp.ngOnInit();
    });

    it('should decrease the quantity of the product if it is bigger tham 1', () => {
      const product = comp.getCartProducts[0];
      const initialCount = comp.productsCount;
      comp.plusCount(product);
      comp.plusCount(product);
      comp.plusCount(product);
      comp.plusCount(product);
      comp.minusCount(product);
      const afterIncrementCount = initialCount + 4;
      expect(product.quantity).toBe(4);
      expect(comp.productsCount).toBe(afterIncrementCount - 1);


      comp.minusCount(product);
      expect(product.quantity).toBe(3);
      expect(comp.productsCount).toBe(afterIncrementCount - 2);


      comp.minusCount(product);
      expect(product.quantity).toBe(2);
      expect(comp.productsCount).toBe(afterIncrementCount - 3);


      comp.minusCount(product);
      expect(product.quantity).toBe(1);
      expect(comp.productsCount).toBe(afterIncrementCount - 4);

      comp.minusCount(product);
      expect(product.quantity).toBe(1);
      expect(comp.productsCount).toBe(afterIncrementCount - 4);
    });
  });
  describe('updateTotalAmount',()=>{
    beforeEach(()=>{
      _dataStorageService.getCartData.and.returnValue([
        { pdId: 1, pdName: 'iphone 14', pdPrice: 20000, quantity: 2 },
        { pdId: 2, pdName: 'iphone 15', pdPrice: 25000, quantity: 1 }
      ])
      comp.ngOnInit();
  });
    it('should update the total amount correctly', () => {
      comp.updateTotalAmount();
      expect(comp.TotalAmount).toBe(65000);
    });
  })
  describe('orderNow', () => {
    let routerSpy: jasmine.SpyObj<Router>;
    let localStorageSpy: jasmine.Spy;
    beforeEach(()=>{
      routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
      spyOn(routerSpy, 'navigate').and.returnValue(Promise.resolve(true));
      localStorageSpy = spyOn(localStorage, 'removeItem');
      _dataStorageService.getCartData.and.returnValue([
        { pdId: 1, pdName: 'iphone 14', pdPrice: 20000, quantity: 2 },
        { pdId: 2, pdName: 'iphone 15', pdPrice: 25000, quantity: 1 }
      ]);
      comp.ngOnInit();
    })


    it('should navigate to home and clear cart data from localStorage', () => {
      comp.orderNow();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
      expect(localStorageSpy).toHaveBeenCalledWith('cart-data');
      expect(comp.getCartProducts.length).toBe(0);
      expect(comp.productsCount).toBe(0);
      expect(comp.TotalAmount).toBe(0);
    });
  });
})
