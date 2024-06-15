import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { addBlogPostModel } from '../Models/add-blogPost.model';
import { environment } from 'src/environments/environment';
import { BlogPostModel } from '../Models/blogPost.model';
import { UpdateCategoryModel } from '../../Component/Models/Update-category-request.model';
import { updateBlogPostModel } from '../Models/update-blogPost.model';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private http: HttpClient) {
  }

  AddBlogPost(model: addBlogPostModel) : Observable<BlogPostModel>{
    return this.http.post<BlogPostModel>(`${environment.LocalUrl}/api/Blogpost`, model)
  }

  GetBlogPost() : Observable<BlogPostModel[]>{
    return this.http.get<BlogPostModel[]>(`${environment.LocalUrl}/api/Blogpost`)
  }

  GetBlogPostById(id: string): Observable<BlogPostModel>{
    return this.http.get<BlogPostModel>(`${environment.LocalUrl}/api/Blogpost/${id}`)
  }

  UpdateBlogPostByid(id: string, model: updateBlogPostModel) : Observable<BlogPostModel>{
    return this.http.put<BlogPostModel>(`${environment.LocalUrl}/api/Blogpost/${id}`, model)
  }
}
