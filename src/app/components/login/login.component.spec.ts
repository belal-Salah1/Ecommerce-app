import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { provideRouter, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let _authService:AuthService;
  let _router:Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers:[provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    _authService = TestBed.inject(AuthService);
     _router = TestBed.inject(Router);
    spyOn(_router,'navigate')
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should log in if form is valid',()=>{
    const mockFrom={
      valid:true,
      form:{
        value:{
          email:'test@gmail.com',
          password:'12vckcvlA456'
        }
      }
    } as NgForm
    spyOn(_authService,'logIn').and.callThrough()
    component.onSubmit(mockFrom)
    expect(_authService.logIn).toHaveBeenCalled()
    expect(_router.navigate).toHaveBeenCalledWith(['/home'])
  })
});
