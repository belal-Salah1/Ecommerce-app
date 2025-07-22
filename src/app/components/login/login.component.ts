import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, NgIf, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  model:any ={
    email:'user@gmail.com',
    password:'Aa1232f'
  };
  constructor(private _authService:AuthService,private _router:Router){}

onSubmit(form: NgForm) {
  if (form.valid) {

    this._authService.login(this.model).subscribe({
      next:(res)=>{
        if(res.status == 'SUCCESS'){
          localStorage.setItem('token',res.token);
          this._router.navigate(['/home']);
        }else{
          console.log(res.message)
        }
      },
      error:(err)=>{
        window.alert(err.error.message);
      }
    });
  }
}

}
