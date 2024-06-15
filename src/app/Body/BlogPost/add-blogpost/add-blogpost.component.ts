import { Component, OnDestroy, OnInit } from '@angular/core';
import { addBlogPostModel } from '../Models/add-blogPost.model';
import { BlogPostService } from '../services/blog-post.service';
import { Route, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CategoryService } from '../../Component/Services/category.service';
import { GetAllCategories } from '../../Component/Models/get-category-request.model';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnDestroy, OnInit {

  model: addBlogPostModel;
  AddblogPostSubscription?: Subscription;
  categories$?: Observable<GetAllCategories[]>

  constructor(private blogPostService: BlogPostService,
    private router: Router,
    private categoryservices: CategoryService){
    this.model = {
      Title: '',
      ShortDescription: '',
      Content: '',
      UrlHandle: '',
      FeaturedImageURL: '',
      DateCreated: new Date,
      Author: '',
      IsVisible: true,
      Category:[]
    }
  }

  ngOnInit(): void {
    this.categories$ = this.categoryservices.GetCategories()
  }
  
  OnSubmit(): void{
    this.AddblogPostSubscription = this.blogPostService.AddBlogPost(this.model)
    .subscribe({
      next: (response) =>
        this.router.navigateByUrl('/admin/blogpost')
    })
  }

  ngOnDestroy(): void {
    this.AddblogPostSubscription?.unsubscribe();
  }

}
