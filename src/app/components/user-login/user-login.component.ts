import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-login',
  imports: [NavbarComponent, NgIf, ReactiveFormsModule, RouterLink],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserLoginComponent implements OnInit {
  signUpForm!: FormGroup;
  isUserLoggedIn: boolean = false;
  constructor(private _router: Router, private _authService: AuthService) {}
  ngOnInit() {
    this.signUpForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=(.*\d){2,})(?=(.*[a-zA-Z]){2,})(?=.*[A-Z]).{6,}$/
        ),
      ]),
    });
  }
  onSubmit() {
    if (this.signUpForm.valid) {
      this._authService.register(this.signUpForm.value).subscribe({
        next: (res) => {
          if (res.status == 'SUCCESS') {
            const token = res.data.user.token;
            localStorage.setItem('token', token);
            const now = new Date();
            const expireDate = new Date(
              now.getTime() + 15 * 24 * 60 * 60 * 1000
            );
            localStorage.setItem('token_expire', expireDate.toISOString());
            this._router.navigate(['/home']);
          }
        },
        error: (err) => {
          window.alert(err.error.message);
        },
      });
    }
  }
}
