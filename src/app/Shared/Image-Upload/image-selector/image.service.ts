import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ImageUpload } from '../Models/image.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

selectedImage: BehaviorSubject<ImageUpload> = new BehaviorSubject<ImageUpload>({
  id: '',
  fileExtension : '',
  fileName : '',
  url : '',
  title : ''
}) 

  constructor(private http: HttpClient) { }

  UploadImage(file: File, fileName: string, title: string) : Observable<ImageUpload> {
    const formdata = new FormData();
    formdata.append('file', file)
    formdata.append('fileName', fileName)
    formdata.append('title', title)

    return this.http.post<ImageUpload>(`${environment.LocalUrl}/api/Images`, formdata)
  }

  GetAllImages() : Observable<ImageUpload[]>{
    return this.http.get<ImageUpload[]>(`${environment.LocalUrl}/api/Images`)
  }

  selectImage(Image : ImageUpload) : void{
    this.selectedImage.next(Image);
  }

  OnSelectImage() : Observable<ImageUpload>{
    return this.selectedImage.asObservable();
  }
}
