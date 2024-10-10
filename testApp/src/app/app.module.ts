import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module'; 
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { RegistrationComponent } from './registration/registration.component'; 
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BlogCreateComponent } from './blog-create/blog-create.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    BlogListComponent,
    BlogDetailsComponent,
    RegistrationComponent,
    BlogCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
