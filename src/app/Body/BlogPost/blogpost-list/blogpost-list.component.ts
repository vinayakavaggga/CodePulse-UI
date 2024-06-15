import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../services/blog-post.service';
import { Observable } from 'rxjs';
import { BlogPostModel } from '../Models/blogPost.model';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogpostListComponent implements OnInit {

  blogPost$?: Observable<BlogPostModel[]>;
  constructor(private blogPostservice: BlogPostService){

  }

  ngOnInit(): void {
    this.blogPost$ = this.blogPostservice.GetBlogPost()
  }
  
}
