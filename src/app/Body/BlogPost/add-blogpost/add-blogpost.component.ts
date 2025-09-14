import { Component, OnDestroy, OnInit } from '@angular/core';
import { addBlogPostModel } from '../Models/add-blogPost.model';
import { BlogPostService } from '../services/blog-post.service';
import { Route, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CategoryService } from '../../Component/Services/category.service';
import { GetAllCategories } from '../../Component/Models/get-category-request.model';
import { ImageService } from 'src/app/Shared/Image-Upload/image-selector/image.service';
import { GetAuthorModel } from '../../Component/Models/get-author.model';
import { HomeService } from '../../Public/Services/home.service';

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
  authorsub$? : Observable<GetAuthorModel[]>
  authorSubscription? : Subscription
  authorModel? : GetAuthorModel[]
  author : string | any
  authorId : string | any
  isLoading = false;
  successMessage = '';
  redirectingMessage = '';
  errorMessage = '';


  constructor(private blogPostService: BlogPostService,
    private router: Router,
    private imageService : ImageService,
    private publicService: HomeService,
    private categoryservices: CategoryService){
    this.model = {
      Title: '',
      ShortDescription: '',
      Content: '',
      UrlHandle: '',
      FeaturedImageURL: '',
      DateCreated: new Date,
      Author: '',
      authorId: '',
      IsVisible: true,
      Category:[]
    }
  }

  ngOnInit(): void {
    this.categories$ = this.categoryservices.GetCategories()
    this.authorsub$ = this.publicService.GetAuthor()
    this.authorSubscription = this.publicService.GetAuthor().subscribe({
      next: (resp) =>{
        this.authorModel = resp
      }
    });
    this.authorId = this.model?.authorId

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
    this.isLoading = true;
    this.model.authorId = this.authorId
    this.model.Author = this.author
    this.AddblogPostSubscription = this.blogPostService.AddBlogPost(this.model)
    .subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = 'Blog post added successfully!';
        let secondsLeft = 3;
            this.redirectingMessage = `You are being redirected to blogpost page in ${secondsLeft} seconds......`;
            const interval = setInterval(() => {
            secondsLeft--;
            this.redirectingMessage = `You are being redirected to blogpost page in ${secondsLeft} seconds......`;
            if (secondsLeft === 0) {
              clearInterval(interval);
            }
            }, 1000);
        setTimeout(()=> {
          this.successMessage = '';
          this.router.navigateByUrl('/admin/blogpost');
        }, 3000);
      },
      error: (err) => {
          this.isLoading = false;
          this.errorMessage = 'Failed to add blog post.';
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000)
      }
    })
  }

  OpenImagePopUp() : void{
    this.isImagePopUpVisible = true
  }

  ClosePopup() : void{
    this.isImagePopUpVisible = false
  }

  onAuthorChange(authorId: string) {
    const selectedAuthor = this.authorModel?.find(author => author.id === authorId);
    if (selectedAuthor) {
      this.authorId = selectedAuthor.id;         // Save author ID
      this.author = selectedAuthor.authorName; // Save author name
      console.log(selectedAuthor.id , selectedAuthor.authorName)
    }
  }

  ngOnDestroy(): void {
    this.AddblogPostSubscription?.unsubscribe();
    this.imageSubscription?.unsubscribe();
    this.authorSubscription?.unsubscribe();
  }

}
