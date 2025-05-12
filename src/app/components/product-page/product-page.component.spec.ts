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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should paramMap be defined',()=>{
    component.ngOnInit()
    expect(component.getParamValue).toBeDefined();
  })


});
