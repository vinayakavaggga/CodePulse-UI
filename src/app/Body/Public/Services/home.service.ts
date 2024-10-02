import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAuthorModel } from '../../Component/Models/get-author.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  GetAuthor(): Observable<GetAuthorModel[]>{
    return this.http.get<GetAuthorModel[]>(`${environment.LocalUrl}/api/Blogpost/GetAuthor`)
  }

  GetAuthorById(id: string): Observable<GetAuthorModel>{
    return this.http.get<GetAuthorModel>(`${environment.LocalUrl}/api/Blogpost/GetAuthor/${id}`)
  }
}
