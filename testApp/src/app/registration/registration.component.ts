import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'] // Optional, for styling
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  message: string = '';
  isSuccess: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // Email field
      password: ['', Validators.required],
      // Optionally, add other fields like bio if needed
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const registrationData = {
        username: this.registrationForm.value.username,
        email: this.registrationForm.value.email,
        password: this.registrationForm.value.password // Consider hashing if needed
      };

      console.log("registration data is : " + JSON.stringify(registrationData));

      this.http.post('http://localhost:8080/api/auth/register', registrationData)
        .subscribe({
          next: () => {
            this.message = 'Registration successful! Redirecting to login page...';
            this.isSuccess = true;
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
          },
          error: (err) => {
            this.message = 'Registration failed: ' + (err.error.message );
            this.isSuccess = false;
          }
        });
    } else {
      this.message = 'Please fill out the form correctly.';
      this.isSuccess = false;
    }
  }
}
