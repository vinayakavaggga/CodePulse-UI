import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../Models/add-category-request.model';
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { GetAllCategories } from '../Models/get-category-request.model';
import { environment } from 'src/environments/environment';
import { UpdateCategoryModel } from '../Models/Update-category-request.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  AddCategories(model: AddCategoryRequest): Observable<void> {
    return this.http.post<void>(`${environment.LocalUrl}/api/Categories`, model);
  }

  GetCategories() : Observable<GetAllCategories[]>{
    return this.http.get<GetAllCategories[]>(`${environment.LocalUrl}/api/Categories`);
  }

  GetCategoryById(id: string) : Observable<GetAllCategories>{
    return this.http.get<GetAllCategories>(`${environment.LocalUrl}/api/Categories/${id}`);
  }

  UpdateCategoryById(id: string, updateRequest: UpdateCategoryModel) : Observable<GetAllCategories>{
    return this.http.put<GetAllCategories>(`${environment.LocalUrl}/api/Categories/${id}`, updateRequest);
  }

  DeleteCategory(id: string) : Observable<GetAllCategories>{
    return this.http.delete<GetAllCategories>(`${environment.LocalUrl}/api/Categories/${id}`)
  }
  
}
