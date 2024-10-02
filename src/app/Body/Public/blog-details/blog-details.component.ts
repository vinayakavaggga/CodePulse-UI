import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPostService } from '../../BlogPost/services/blog-post.service';
import { Observable, Subscribable, Subscription } from 'rxjs';
import { BlogPostModel } from '../../BlogPost/Models/blogPost.model';
import { GetAuthorModel } from '../../Component/Models/get-author.model';
import { HomeService } from '../Services/home.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {

  blogModel? : BlogPostModel;
  authorModel : GetAuthorModel = {
    id : '',
    authorName : '',
    authorEmail : '',
    registeredDate : new Date,
    description : ''
  };
  blogSubscrption$? : Subscription;

  authorId: string | undefined;
  url : string | null = null;
  blogPost$? : Observable<BlogPostModel>
  authorByid$? : Observable<GetAuthorModel>

  constructor(private route : ActivatedRoute,
    private blogpostService : BlogPostService,
    private publicServie : HomeService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next : (params) => {
        this.url = params.get('url');
      }
    })

    if(this.url){
      this.blogPost$ = this.blogpostService.GetBlogPostByUrl(this.url);
      
      this.blogPost$.subscribe((post : any) => {
        if(post){
          this.authorId = post.authorId
          console.log(this.authorId)
          if(this.authorId){
            this.sendAuthorId(this.authorId)
            console.log(this.authorModel)
          }
        }
        else {
          console.error('ID not found in the response');
        }
      });
    }
  }

  sendAuthorId(id: string) {
    this.authorByid$ =  this.publicServie.GetAuthorById(id)
  }
}
