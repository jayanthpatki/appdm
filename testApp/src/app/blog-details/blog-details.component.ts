import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Comment {
  id?: number; // Optional id for the comment
  text: string;
  date: Date;
}

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
  title: string | null = null;
  content: string | null = null;
  date: string | null = null;
  comments: Comment[] = [];
  newCommentText: string = '';

  userId: number = 1; // Replace with actual user ID logic
  blogId: number = 1; // Replace with actual blog ID logic

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.title = this.route.snapshot.paramMap.get('title') || '';
    this.content = this.route.snapshot.paramMap.get('content') || '';
    this.date = this.route.snapshot.paramMap.get('date') || '';

    this.fetchComments(); // Fetch comments on initialization
  }

  fetchComments() {
    this.http.get<Comment[]>(`http://localhost:8080/api/comment/${this.userId}/blogs/${this.blogId}/comments`)
      .subscribe(
        (response) => {
          this.comments = response;
        },
        (error) => {
          console.error('Error fetching comments:', error);
        }
      );
  }

  addComment() {
    if (this.newCommentText) {
      const newComment: Comment = {
        text: this.newCommentText,
        date: new Date(),
      };

      this.http.post<Comment>(`http://localhost:8080/api/comment/${this.userId}/blogs/${this.blogId}/comments`, newComment)
        .subscribe(
          (response) => {
            this.comments.push(response); // Add the new comment to the comments array
            this.newCommentText = ''; // Reset the comment input
          },
          (error) => {
            console.error('Error adding comment:', error);
          }
        );
    }
  }

  deleteComment(index: number) {
    const commentId = this.comments[index].id; // Get the comment ID to delete

    this.http.delete(`http://localhost:8080/api/comment/${this.userId}/blogs/${this.blogId}/comments/${commentId}`)
      .subscribe(
        () => {
          this.comments.splice(index, 1); // Remove the comment
        },
        (error) => {
          console.error('Error deleting comment:', error);
        }
      );
  }
}
