import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoginComponent } from './user-login.component';
import { provideRouter, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

describe('UserLoginComponent', () => {
  let component: UserLoginComponent;
  let fixture: ComponentFixture<UserLoginComponent>;
  let _authService:AuthService;
  let _router:Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserLoginComponent, ReactiveFormsModule],
      providers:[provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserLoginComponent);
    component = fixture.componentInstance;
    _authService = TestBed.inject(AuthService);
    _router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should login form if it is valid',()=>{
    spyOn(_authService,'logIn')
    spyOn(_router,'navigate')
    const signUpForm = {
      valid:true,
      value:{
        name:'faketest',
        email:'test@gmail.com',
        password:'12vckcvlA456'
      }
    } as FormGroup
    component.signUpForm = signUpForm
    component.onSubmit()
    expect(component.signUpForm.valid).toBeTruthy()
    expect(_authService.logIn).toHaveBeenCalled()
    expect(_router.navigate).toHaveBeenCalledWith(['/home'])
  })
});
