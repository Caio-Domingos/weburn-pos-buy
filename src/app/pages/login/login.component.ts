import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  private createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  getErrorMessage(control: string) {
    return this.loginForm.controls[control].hasError('required')
      ? 'Precisa inserir um valor válido'
      : this.loginForm.controls[control].hasError('email')
      ? 'Não é um email válido'
      : this.loginForm.controls[control].hasError('minlength')
      ? 'Mínimo de 6 caracteres'
      : this.loginForm.controls[control].hasError('mask')
      ? 'Formato de campo não válido'
      : '';
  }

  login() {}
}
