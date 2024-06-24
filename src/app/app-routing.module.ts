import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './Body/Component/category-list/category-list.component';
import {AddCategoryComponent} from './Body/Component/add-category/add-category.component';
import { EditCategoryComponent } from './Body/Component/edit-category/edit-category.component';
import { BlogpostListComponent } from './Body/BlogPost/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './Body/BlogPost/add-blogpost/add-blogpost.component';
import { EditBlogpostComponent } from './Body/BlogPost/edit-blogpost/edit-blogpost.component';
import { HomeComponent } from './Body/Public/home/home.component';
import { BlogDetailsComponent } from './Body/Public/blog-details/blog-details.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'blog/:url',
    component: BlogDetailsComponent
  },
  {
    path: 'admin/categories',
    component: CategoryListComponent
  },
  {
    path: 'admin/categories/add',
    component: AddCategoryComponent
  },
  {
    path: 'admin/categories/:id',
    component: EditCategoryComponent
  },
  {
    path: 'admin/blogpost',
    component : BlogpostListComponent
  },
  {
    path: 'admin/blogpost/add',
    component: AddBlogpostComponent 
  },
  {
    path: 'admin/blogpost/:id',
    component: EditBlogpostComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
