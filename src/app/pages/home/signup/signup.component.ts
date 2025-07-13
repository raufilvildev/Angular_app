import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { InputComponent } from './../../../shared/components/input/input.component';
import { ButtonComponent } from './../../../shared/components/button/button.component';
import { UsersService } from '../../../core/services/users.service';
import { UserSignupDto } from '../../../core/interfaces/users/user-signup-dto.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  private usersService = inject(UsersService);
  private router = inject(Router);

  signupForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.maxLength(254),
      Validators.email,
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\[\]{};':"\\|,.<>/?\-]).{8,}$/
      ),
    ]),
    passwordConfirm: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\[\]{};':"\\|,.<>/?\-]).{8,}$/
      ),
    ]),
  });

  signupFormError = '';
  passwordMissmatchError = '';

  async onSubmit() {
    this.signupForm.markAllAsTouched();
    this.signupFormError = '';
    this.passwordMissmatchError = '';

    const { passwordConfirm, ...userSignupDto } = this.signupForm.value;

    if (this.signupForm.invalid) {
      this.signupFormError = 'Faltan campos por completar.';
      return;
    }

    if (passwordConfirm !== userSignupDto.password) {
      this.passwordMissmatchError = 'Las contraseñas no coinciden.';
      return;
    }

    try {
      const { refreshToken, accessToken } = await this.usersService.create(
        userSignupDto as UserSignupDto
      );

      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('accessToken', accessToken);

      this.router.navigate(['/dashboard']);
    } catch ({ status, error }: any) {
      if ([401, 409].includes(status)) {
        this.signupFormError = error.message;
        return;
      }

      this.signupFormError =
        'Ha ocurrido un error inesperado. Vuelve a intentarlo más tarde.';
    }
  }
}
