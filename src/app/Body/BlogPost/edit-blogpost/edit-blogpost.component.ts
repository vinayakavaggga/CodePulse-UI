import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPostModel } from '../Models/blogPost.model';
import { CategoryService } from '../../Component/Services/category.service';
import { CategoryListComponent } from '../../Component/category-list/category-list.component';
import { GetAllCategories } from '../../Component/Models/get-category-request.model';
import { UpdateCategoryModel } from '../../Component/Models/Update-category-request.model';
import { updateBlogPostModel } from '../Models/update-blogPost.model';
import { ImageService } from 'src/app/Shared/Image-Upload/image-selector/image.service';
import { GetAuthorModel } from '../../Component/Models/get-author.model';
import { HomeService } from '../../Public/Services/home.service';
import { ConfirmationPopupComponent } from 'src/app/Shared/Confirmation-popup-message/confirmation-popup/confirmation-popup.component';

declare var bootstrap: any; 

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css']
})
export class EditBlogpostComponent implements OnInit, OnDestroy {

  @ViewChild(ConfirmationPopupComponent) confirmationPopup?: ConfirmationPopupComponent;

  selectedPostId: number | null = null;

  id: string | null = null
  selectedCat?: string[]
  isImagePopUpVisible : boolean = false;
  maxWords = 500;
  wordCount = 0;
  author? : string
  authorId? : string

  categorysub$?: Observable<GetAllCategories[]>
  authorsub$? : Observable<GetAuthorModel[]>
  
  model?:BlogPostModel
  authorModel? : GetAuthorModel[]

  editSubscription?: Subscription
  updateSubscription?: Subscription
  getSubscrption?: Subscription
  deleteSubscrption? : Subscription
  imageSubscription? : Subscription
  authorSubscription? : Subscription

  isLoading = false;
  successMessage = '';
  deleteMessage = '';
  redirectingMessage = '';
  errorMessage = '';


  constructor(private route: ActivatedRoute,
    private editservices: BlogPostService,
    private categoryServices: CategoryService,
    private router: Router,
    private imageService : ImageService,
    private publicService: HomeService)
  { }
  
  ngOnInit(): void {

    this.categorysub$ =  this.categoryServices.GetCategories();
    this.authorsub$ = this.publicService.GetAuthor()

    this.authorSubscription = this.publicService.GetAuthor().subscribe({
      next: (resp) =>{
        this.authorModel = resp
      }
    });
    this.authorId = this.model?.id

    this.editSubscription = this.route.paramMap.subscribe({
      next: (parms) => {
        this.id = parms.get('id')

        if (this.id){
          this.getSubscrption = this.editservices.GetBlogPostById(this.id).subscribe({
            next: (response) => {
              this.model = response;
              this.selectedCat = response.categoryResponse.map(x => x.id)
            }
          })
        }

        this.imageSubscription = this.imageService.OnSelectImage().subscribe({
          next : (response) => {
            if(this.model){
              this.model.featuredImageURL = response.url;
              this.isImagePopUpVisible = false;
            }
          }
        })
      }
    })
  }

  OnSubmit() : void{
    this.isLoading = true;
    if(this.model && this.id && this.authorId && this.author){
      var updateblogpost: updateBlogPostModel = {
        Title: this.model.title,
        ShortDescription: this.model.shortDescription,
        Content: this.model.content,
        UrlHandle: this.model.urlHandle,
        FeaturedImageURL: this.model.featuredImageURL,
        DateCreated: this.model.dateCreated,
        Author: this.author,
        authorId: this.authorId,
        IsVisible: this.model.isVisible,
        Category: this.selectedCat ?? []
      }
      
      this.updateSubscription = this.editservices.UpdateBlogPostByid(this.id, updateblogpost).subscribe({
        next: (response) => {
          this.isLoading = false;
            this.successMessage = 'BlogPost Updated Sucessfully!';
            let secondsLeft = 3;
            this.redirectingMessage = `You are being redirected to blogpost page in ${secondsLeft} seconds......`;
            const interval = setInterval(() => {
            secondsLeft--;
            this.redirectingMessage = `You are being redirected to blogpost page in ${secondsLeft} seconds......`;
            if (secondsLeft === 0) {
              clearInterval(interval);
            }
            }, 1000);
          setTimeout(() =>{
            this.successMessage = ''
            this.router.navigateByUrl('/admin/blogpost');
          }, 3000)
          
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = 'An error occured while updating data';
          setTimeout (() => {
            this.errorMessage = '';
          }, 3000)
        }
      })
    }
  }

  openDeleteConfirm() {
    //this.id = postId;

    const modalElement = document.getElementById('confirmModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  // handle Yes / No from modal
  handleConfirmation(choice: boolean) {
    if (choice) {
      this.DeleteBlogPost();
    } else {
    this.isLoading = false;
    this.deleteMessage = '';
    this.redirectingMessage = '';
    }
  }

  onPopupClose() {
    this.isLoading = false;   // Reset loader if closed with X
  }

  DeleteBlogPost(): void{
    if(this.id){
      this.deleteSubscrption = this.editservices.DeleteBlogPost(this.id).subscribe({
        next: (response) => {
          this.isLoading = false;
            this.deleteMessage = 'BlogPost Deleted Sucessfully!';
            let secondsLeft = 3;
            this.redirectingMessage = `You are being redirected to blogpost page in ${secondsLeft} seconds......`;
            const interval = setInterval(() => {
            secondsLeft--;
            this.redirectingMessage = `You are being redirected to blogpost page in ${secondsLeft} seconds......`;
            if (secondsLeft === 0) {
              clearInterval(interval);
            }
            }, 1000);
          setTimeout(() =>{
            this.deleteMessage = ''
            this.router.navigateByUrl('/admin/blogpost');
          }, 3000)
          
        }
      })
    }
  }

  OpenImagePopUp() : void{
    this.isImagePopUpVisible = true
  }

  ClosePopup() : void{
    this.isImagePopUpVisible = false
  }

  ngOnDestroy(): void {
    this.editSubscription?.unsubscribe();
    this.getSubscrption?.unsubscribe();
    this.updateSubscription?.unsubscribe();
    this.deleteSubscrption?.unsubscribe();
    this.imageSubscription?.unsubscribe();
  }


  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;

    this.wordCount = value.length;

    if (this.wordCount > this.maxWords) {
      // Truncate characters if they exceed the maximum limit
      inputElement.value = value.substring(0, this.maxWords);
      if(this.model){
        this.model.shortDescription = inputElement.value;
      }
      
      this.wordCount = this.maxWords; // Update character count to max limit
    } else {
      if(this.model){
        this.model.shortDescription = inputElement.value;
      }
      
    }
  }

  onAuthorChange(authorId: string) {
    const selectedAuthor = this.authorModel?.find(author => author.id === authorId);
    if (selectedAuthor) {
      this.authorId = selectedAuthor.id;         // Save author ID
      this.author = selectedAuthor.authorName; // Save author name
    }
  }
}
