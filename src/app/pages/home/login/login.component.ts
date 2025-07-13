import { Component, inject } from '@angular/core';
import { InputComponent } from '../../../shared/components/input/input.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { UserLoginDto } from '../../../core/interfaces/users/user-login-dto.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [InputComponent, ReactiveFormsModule, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private authenticationService = inject(AuthenticationService);
  private router = inject(Router);

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  loginFormError = '';

  async onSubmit() {
    this.loginFormError = '';
    if (this.loginForm.invalid) {
      this.loginFormError = 'Credenciales incorrectas.';
      return;
    }

    try {
      const { token } = await this.authenticationService.login(
        this.loginForm.value as UserLoginDto
      );
      localStorage.setItem('refreshToken', token);
      this.router.navigate(['/dashboard']);
    } catch ({ error }: any) {
      this.loginFormError = error.message;
    }
  }
}
