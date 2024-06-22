import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageUpload } from '../Models/image.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  UploadImage(file: File, fileName: string, title: string) : Observable<ImageUpload> {
    const formdata = new FormData();
    formdata.append('file', file)
    formdata.append('fileName', fileName)
    formdata.append('title', title)

    return this.http.post<ImageUpload>(`${environment.LocalUrl}/api/Images`, formdata)
  }
}
