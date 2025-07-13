import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { InputComponent } from './../../../shared/components/input/input.component';
import { ButtonComponent } from './../../../shared/components/button/button.component';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signupForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    passwordConfirm: new FormControl(''),
  });

  onSubmit() {
    console.log(this.signupForm.value);
  }
}
