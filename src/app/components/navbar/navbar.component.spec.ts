import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { provideRouter } from '@angular/router';
import { DataStorageService } from '../../services/data-storage.service';

describe('navbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let service:DataStorageService
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers:[provideRouter([])]
    }).compileComponents();
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(DataStorageService);
    fixture.detectChanges();
  });

  it('should created navbar component', () => {
    expect(component).toBeTruthy();
  });
  it('ng onInit should set cartCount to the length of cart data', () => {
    component.cartCount = 0;
    spyOn(service,'getCartData').and.returnValue([1,2,3]);
    component.ngOnInit();
    expect(component.cartCount).toBe(3);
  })
});
