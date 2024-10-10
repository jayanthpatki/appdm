// login.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [
    LoginComponent // Declare the LoginComponent
  ],
  imports: [
    CommonModule,  // Required for using Angular directives
    FormsModule    // Import FormsModule to use ngModel/ngForm
  ],
  exports: [
    LoginComponent,
    FormsModule // Export if needed elsewhere
  ]
})
export class LoginModule { }
