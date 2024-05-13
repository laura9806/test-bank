import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
  
    const username = this.loginForm.controls['username'].value;
    const password = this.loginForm.controls['password'].value;
  
    this.authService.login(username, password).subscribe(
      response => {
        this.router.navigate(['/accounts']);
      },
      error => {
        this.errorMessage = 'Failed to login. Please verify your credentials.';
      }
    );
  }
}
