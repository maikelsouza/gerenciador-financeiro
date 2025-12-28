import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from "@angular/material/input";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  authService = inject(AuthService);

  form  = new FormGroup({
    user: new FormControl('', {
        validators: [Validators.required]
    }),
    password: new FormControl('', {
        validators: [Validators.required]
    }),
  }) 

  submit() {
    if (this.form.invalid){
      return
    }
    const payload = {
      user: this.form.controls.user.value as string,
      password: this.form.controls.password.value as string 
    }
    this.authService.login(payload).subscribe({
      next: (resp) => {
        console.log(resp);
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }
}
