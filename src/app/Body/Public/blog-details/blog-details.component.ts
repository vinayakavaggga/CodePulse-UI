import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPostService } from '../../BlogPost/services/blog-post.service';
import { Observable } from 'rxjs';
import { BlogPostModel } from '../../BlogPost/Models/blogPost.model';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {

  url : string | null = null;
  blogPost$? : Observable<BlogPostModel>

  constructor(private route : ActivatedRoute,
    private blogpostService : BlogPostService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next : (params) => {
        this.url = params.get('url');
      }
    })

    if(this.url){
      this.blogPost$ = this.blogpostService.GetBlogPostByUrl(this.url)
    }

  }
}
