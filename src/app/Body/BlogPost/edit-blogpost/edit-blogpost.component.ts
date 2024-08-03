import { Component, OnDestroy, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css']
})
export class EditBlogpostComponent implements OnInit, OnDestroy {

  id: string | null = null
  selectedCat?: string[]
  isImagePopUpVisible : boolean = false;
  maxWords = 500;
  wordCount = 0;

  categorysub$?: Observable<GetAllCategories[]>
  
  updateModel? : UpdateCategoryModel
  model?:BlogPostModel

  editSubscription?: Subscription
  updateSubscription?: Subscription
  getSubscrption?: Subscription
  deleteSubscrption? : Subscription
  imageSubscription? : Subscription

  constructor(private route: ActivatedRoute,
    private editservices: BlogPostService,
    private categoryServices: CategoryService,
    private router: Router,
    private imageService : ImageService)
  { }
  
  ngOnInit(): void {

    this.categorysub$ =  this.categoryServices.GetCategories();

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
    if(this.model && this.id){
      var updateblogpost: updateBlogPostModel = {
        Title: this.model.title,
        ShortDescription: this.model.shortDescription,
        Content: this.model.content,
        UrlHandle: this.model.urlHandle,
        FeaturedImageURL: this.model.featuredImageURL,
        DateCreated: this.model.dateCreated,
        Author: this.model.author,
        IsVisible: this.model.isVisible,
        Category: this.selectedCat ?? []
      }

      this.updateSubscription = this.editservices.UpdateBlogPostByid(this.id, updateblogpost).subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/blogpost');
        }
      })
    }

  }

  DeleteBlogPost(): void{
    if(this.id){
      this.deleteSubscrption = this.editservices.DeleteBlogPost(this.id).subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/blogpost');
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
}
