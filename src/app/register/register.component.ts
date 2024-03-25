import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../Service/account.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [AccountService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private data: AccountService, private router: Router) { }

  Registerform = new FormGroup({
    Email : new FormControl("",
          [Validators.required,
            Validators.pattern("^.{3,}@gmail\.com$")]),

    Password : new FormControl("",
          [Validators.required,
            Validators.pattern("^.{6,20}$")]),

    ConfirmPassword : new FormControl("",
          [Validators.required,
            Validators.pattern("^.{6,20}$")]),

    UserName : new FormControl("",
          [Validators.required,
             Validators.minLength(3),
             Validators.maxLength(50)]),

    PhoneNumber : new FormControl("",
          [Validators.required,
             Validators.pattern("^01[0-2,5]{1}[0-9]{8}$")]),

  })



  addnewuser() {
    if (this.Registerform.valid) {

      let newuser = {
        email: this.Registerform.controls.Email.value as string,
        password: this.Registerform.controls.Password.value as string,
        confirmPassword: this.Registerform.controls.ConfirmPassword.value as string,
        userName: this.Registerform.controls.UserName.value as string,
        phoneNumber: this.Registerform.controls.PhoneNumber.value as string

      };
      this.data.register(newuser).subscribe({
        next:(data)=>{
          this.router.navigate(['/Home']);
        },
        error:(err)=>{

          console.log(err);
        }
      });
      
    }
  }
}
