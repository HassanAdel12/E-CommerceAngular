import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../Service/account.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [AccountService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private data: AccountService, private router: Router) { }

  Loginform = new FormGroup({
    Email: new FormControl("",
      [Validators.required,
      Validators.pattern("^.{3,}@gmail\.com$")]),

    Password: new FormControl("",
      [Validators.required,
      Validators.pattern("^.{6,20}$")]),
  })

  LoginUser() {
    if (this.Loginform.valid) {

      let LoginUser = {
        Email: this.Loginform.controls.Email.value as string,
        Password: this.Loginform.controls.Password.value as string,

      };
      this.data.login(LoginUser).subscribe({
        next:(data)=>{
          const token = data.token;
          const expireOn = data.expireOn;
         
          localStorage.setItem('token', token);
          localStorage.setItem('expireOn', expireOn);

          this.router.navigate(['/Home']);

        },
        error:(err)=>{

          console.log(err);
        }
      });
    }
  }
}
