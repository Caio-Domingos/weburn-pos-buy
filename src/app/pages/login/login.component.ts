import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { errorCodes } from 'src/app/core/interfaces/auth.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authSerivce: AuthService,
    private snack: MatSnackBar
  ) {
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

  async login() {
    if (this.loginForm.valid) {
      try {
        const auth = await this.authSerivce.login(
          this.loginForm.controls['email'].value,
          this.loginForm.controls['password'].value
        );

        console.log('auth', auth);
        this.router.navigate(['/']);
      } catch (error: any) {
        console.error('auth error', error.code);
        const code = error.code as string;
        this.snack.open(
          errorCodes[code]!.message ||
            'Erro ao logar, contatar o administrador',
          'Fechar',
          {
            duration: 5000,
          }
        );
        return;
      }
    }
  }
}
