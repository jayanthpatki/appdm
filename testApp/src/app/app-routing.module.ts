import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { RegistrationComponent } from './registration/registration.component';
import { BlogCreateComponent } from './blog-create/blog-create.component';

const routes: Routes = [
  { path: '', component: LoginComponent }, // Default route to Login
  { path: 'login', component: LoginComponent },
  { path: 'blogs', component: BlogListComponent }, // Route to Blog List
  { path: 'blog-details', component: BlogDetailsComponent },
  { path: 'create-blog', component: BlogCreateComponent },
  { path: 'register', component: RegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
