import { Component, inject } from '@angular/core';
import { InputComponent } from '../../../shared/components/input/input.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersService } from '../../../core/services/users.service';
import { UserResponseDto } from '../../../core/interfaces/users/user-response-dto.interface';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { UserUpdateDto } from '../../../core/interfaces/users/user-update-dto.interface';

@Component({
  selector: 'app-dashboard-settings',
  imports: [InputComponent, ReactiveFormsModule, ButtonComponent],
  templateUrl: './dashboard-settings.component.html',
  styleUrl: './dashboard-settings.component.css',
})
export class DashboardSettingsComponent {
  usersService = inject(UsersService);

  updateForm = new FormGroup({
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
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
  });

  updateFormError = '';

  async onSubmit() {
    this.updateForm.markAllAsTouched();
    this.updateFormError = '';

    if (this.updateForm.invalid) {
      this.updateFormError = 'Faltan campos por completar.';
      return;
    }

    try {
      await this.usersService.update(this.updateForm.value as UserUpdateDto);
    } catch ({ status, error }: any) {
      if (status === 409) {
        this.updateFormError = error.message;
        return;
      }

      this.updateFormError =
        'Ha ocurrido un error inesperado. Vuelve a intentarlo más tarde.';
    }
  }

  async ngOnInit() {
    try {
      const userResponseDto: UserResponseDto = await this.usersService.get();
      this.updateForm.patchValue({
        firstName: userResponseDto.firstName,
        lastName: userResponseDto.lastName,
        username: userResponseDto.username,
      });
    } catch (error) {
      return;
    }
  }
}
