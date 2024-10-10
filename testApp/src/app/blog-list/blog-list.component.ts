import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service'; // Import the UserService

interface Blog {
  id: number; // Include the id to identify the blog
  title: string;
  content: string;
  createdDate: string; // Use string to match the API response format
  comments: any[]; // Include comments (if needed)
}

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'] // Optional, for styling
})
export class BlogListComponent implements OnInit {
  blogs: Blog[] = []; // Initialize as an empty array
  userId: number | null = null; // Add userId property

  constructor(private router: Router, private http: HttpClient, private userService: UserService) {} // Inject UserService

  ngOnInit() {
    this.userId = this.userService.getUserId(); // Retrieve the user ID
    console.log("user id inside blog list 1 :: " + this.userId)
    if (this.userId !== null) {
      console.log("user id inside blog list 2 :: " + this.userId)

      this.fetchBlogs(); // Pass the userId to fetchBlogs if it's not null
    } else {
      console.log("user id inside blog list 2 :: " + this.userId)

      console.error('User ID not found');
      // Handle the case when the user ID is not found (redirect, show an error, etc.)
    }
  }

  fetchBlogs() {
    this.http.get<Blog[]>(`http://localhost:8080/api/users/${this.userId}/blogs`).subscribe({
      next: (data) => {
        this.blogs = data.map(blog => ({
          id: blog.id,
          title: blog.title,
          content: blog.content,
          createdDate: blog.createdDate,
          comments: blog.comments
        }));
      },
      error: (error) => {
        console.error('Error fetching blogs:', error);
      }
    });
  }

  createBlog() {
    // Navigate to the Create Blog page
    this.router.navigate(['/create-blog']); // Ensure this matches your routing setup
  }

  viewBlog(blog: Blog) {
    // Navigate to the Blog Details Page, passing necessary parameters
    this.router.navigate(['/blog-details', { 
      title: blog.title, 
      content: blog.content,
      author: 'Unknown', // Set a default value or remove if not needed
      date: blog.createdDate 
    }]);
  }
}
