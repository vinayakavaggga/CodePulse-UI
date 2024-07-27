import { Component, OnDestroy, OnInit } from '@angular/core';
import { addBlogPostModel } from '../Models/add-blogPost.model';
import { BlogPostService } from '../services/blog-post.service';
import { Route, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CategoryService } from '../../Component/Services/category.service';
import { GetAllCategories } from '../../Component/Models/get-category-request.model';
import { ImageService } from 'src/app/Shared/Image-Upload/image-selector/image.service';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnDestroy, OnInit {

  model: addBlogPostModel;
  AddblogPostSubscription?: Subscription;
  categories$?: Observable<GetAllCategories[]>
  isImagePopUpVisible : boolean = false;
  imageSubscription? : Subscription;

  constructor(private blogPostService: BlogPostService,
    private router: Router,
    private imageService : ImageService,
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
    this.imageSubscription = this.imageService.OnSelectImage().subscribe({
      next : (response) => {
        if(this.model){
          this.model.FeaturedImageURL = response.url;
          this.isImagePopUpVisible = false;
        }
      }
    })
  }
  
  OnSubmit(): void{
    this.AddblogPostSubscription = this.blogPostService.AddBlogPost(this.model)
    .subscribe({
      next: (response) =>
        this.router.navigateByUrl('/admin/blogpost')
    })
  }

  OpenImagePopUp() : void{
    this.isImagePopUpVisible = true
  }

  ClosePopup() : void{
    this.isImagePopUpVisible = false
  }

  ngOnDestroy(): void {
    this.AddblogPostSubscription?.unsubscribe();
    this.imageSubscription?.unsubscribe();
  }

}
