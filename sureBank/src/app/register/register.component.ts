import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  register() {
    if (this.registerForm.valid) {
      const { username, password, email, firstName, lastName } = this.registerForm.value;
      this.authService.register(username, password, email, firstName, lastName).subscribe(
        response => {
          this.successMessage = 'Registration successful!';
          this.registerForm.reset();
          this.errorMessage = '';
        },
        error => {
          this.successMessage = '';
          this.errorMessage = 'Registration failed. Please try again.';
        }
      );
    }
  }
}
