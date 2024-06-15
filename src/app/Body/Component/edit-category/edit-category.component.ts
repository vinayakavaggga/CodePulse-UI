import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscribable, Subscription } from 'rxjs';
import { CategoryService } from '../Services/category.service';
import { GetAllCategories } from '../Models/get-category-request.model';
import { UpdateCategoryModel } from '../Models/Update-category-request.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  id: string | null = null;
  paramsSubscrption?: Subscription
  editCategorySubscrption?: Subscription
  deleteSubscription? : Subscription
  category? : GetAllCategories

  constructor(private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router){
  }
  
  ngOnInit(): void {
    this.paramsSubscrption = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id')
        if(this.id != null){
          this.categoryService.GetCategoryById(this.id)
          .subscribe({
            next: (Response) =>{
              this.category = Response;
            }
          })
        }
      }
    })
  }

  OnFormSubmit() : void{
    const updateCategory: UpdateCategoryModel = {
      name: this.category?.name ?? '',
      urlHandle: this.category?.urlHandle ?? ''
    }

    if(this.id){
      this.deleteSubscription = this.editCategorySubscrption =  this.categoryService.UpdateCategoryById(this.id, updateCategory)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/categories')
        }
      })
    }
    
  }

  Deletecategory() : void{

    if(this.id){
      this.categoryService.DeleteCategory(this.id)
      .subscribe({
        next: (Response) => {
          this.router.navigateByUrl('/admin/categories')
        }
      })
    }
    
  }

  BackCategory() : void{
    this.router.navigateByUrl('/admin/categories')
  }

  ngOnDestroy(): void {
    this.paramsSubscrption?.unsubscribe();
    this.editCategorySubscrption?.unsubscribe();
    this.deleteSubscription?.unsubscribe();
  }


}
