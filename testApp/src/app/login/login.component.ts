import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../user.service'; // Import the UserService

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  private loginUrl = 'http://localhost:8080/api/auth/login';

  constructor(private router: Router, private http: HttpClient, private userService: UserService) {} // Inject UserService

  onSubmit(form: NgForm) {
    if (form.valid) {
      const payload = { username: this.username, password: this.password };

      this.http.post<any>(this.loginUrl, payload, { observe: 'response' }).subscribe({
        next: (response) => {
          console.log("response status : " + response.status);
          // Check the status code
          if (response.status === 200) {
            console.log(" HTTP Status CODE IS 200 ##########################3");
            localStorage.setItem('token', response.body.token); // Store token

            // Set user ID in the UserService after login
            const userId = response.body.userId; // Assuming the response contains the user ID
            this.userService.setUserId(userId);
            console.log(" login user id is: " + userId);

            this.successMessage = `Welcome back, ${this.username}!`;
            this.errorMessage = '';
            form.reset();
            this.router.navigate(['/blogs']);
          } else {
            // Handle unexpected response
            this.errorMessage = 'Invalid response format.';
            this.successMessage = '';
          }
        },
        error: (error: HttpErrorResponse) => {
          // Handle the error response
          if (error.status === 401) {
            this.errorMessage = 'Invalid username or password.';
          } else {
            console.log(" HTTP Status CODE IS" + error.status + " ##########################3");
            this.errorMessage = 'An unexpected error occurred.';
          }
          this.successMessage = '';
        }
      });
    } else {
      this.errorMessage = 'Please fill in the form correctly.';
      this.successMessage = '';
    }
  }
}
