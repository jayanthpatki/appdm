import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Blog {
  id?: number;  // Optional, as it will be assigned by the server
  title: string;
  content: string;
  createdDate?: string;  // Optional, as it will be assigned by the server
  comments?: any;  // Optional, can adjust the type based on your comment structure
}

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css']
})
export class BlogCreateComponent {
  title: string = '';
  content: string = '';
  message: string = '';

  private userId: number = 1; // Set this to the logged-in user's ID
  private apiUrl: string = `http://localhost:8080/api/users/${this.userId}/blogs`; // Update base URL as needed

  constructor(private router: Router, private http: HttpClient) {}

  saveBlog() {
    const newBlog: Blog = {
      title: this.title,
      content: this.content
    };

    this.createBlog(newBlog).subscribe(
      (response) => {
        // Handle the response here
        console.log('Blog created:', response);
        this.message = 'Blog saved successfully!';

        // Optional: You can store the created blog ID or other details if needed
        // this.message += ` Blog ID: ${response.id}`;

        // Redirect to blog list after a short delay (optional)
        setTimeout(() => {
          this.router.navigate(['/blogs']); // Navigate to blog list page
        }, 1000); // Redirect after 1 second
      },
      (error) => {
        this.message = 'Error saving blog. Please try again.';
        console.error('Error saving blog:', error);
      }
    );
  }

  private createBlog(blog: Blog): Observable<Blog> {
    return this.http.post<Blog>(this.apiUrl, blog);
  }
}
