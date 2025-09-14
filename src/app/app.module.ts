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
import { HomeComponent } from './Body/Public/home/home.component';
import { BlogDetailsComponent } from './Body/Public/blog-details/blog-details.component';
import { FooterComponent } from './components/footer/footer/footer.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ConfirmationPopupComponent } from './Shared/Confirmation-popup-message/confirmation-popup/confirmation-popup.component';

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
    ImageSelectorComponent,
    HomeComponent,
    BlogDetailsComponent,
    FooterComponent,
    ConfirmationPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
    CarouselModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
