import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../../BlogPost/services/blog-post.service';
import { Observable } from 'rxjs';
import { BlogPostModel } from '../../BlogPost/Models/blogPost.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  blogPost$? : Observable<BlogPostModel[]>

  constructor(private blogpostServices: BlogPostService){}

  ngOnInit(): void {
    this.blogPost$ = this.blogpostServices.GetBlogPost();
  }
}
