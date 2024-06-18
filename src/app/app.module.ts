import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CategoryListComponent } from './Body/Component/category-list/category-list.component';
import { AddCategoryComponent } from './Body/Component/add-category/add-category.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EditCategoryComponent } from './Body/Component/edit-category/edit-category.component';
import { BlogpostListComponent } from './Body/BlogPost/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './Body/BlogPost/add-blogpost/add-blogpost.component'
import { MarkdownModule } from 'ngx-markdown';
import { EditBlogpostComponent } from './Body/BlogPost/edit-blogpost/edit-blogpost.component';
import { ImageSelectorComponent } from './Shared/Image-Upload/image-selector/image-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CategoryListComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    BlogpostListComponent,
    AddBlogpostComponent,
    EditBlogpostComponent,
    ImageSelectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MarkdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
