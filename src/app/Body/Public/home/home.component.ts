import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../../BlogPost/services/blog-post.service';
import { catchError, Observable, of } from 'rxjs';
import { BlogPostModel } from '../../BlogPost/Models/blogPost.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  blogPost$? : Observable<BlogPostModel[]>
  errorMessage: string | null = null;

  constructor(private blogpostServices: BlogPostService){}

  ngOnInit(): void {
    this.blogPost$ = this.blogpostServices.GetBlogPost().pipe(
      catchError(error => {
        this.errorMessage = 'Failed to load blogs. Please try again later.';
        return of([]); // Return an empty array to handle the error gracefully
      })
    );
  }

  closeAlert(): void {
    this.errorMessage = null;
  }
}
