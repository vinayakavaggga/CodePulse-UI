import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageService } from './image.service';
import { Observable } from 'rxjs';
import { ImageUpload } from '../Models/image.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css']
})
export class ImageSelectorComponent implements OnInit {

   file? : File
   fileName : string = ''
   title : string = ''

   images$? : Observable<ImageUpload[]>
   @ViewChild('form',{ static : false})  imageUploadForm? : NgForm

  constructor(private imageService: ImageService){}


  ngOnInit(): void {
    this.ImagesServiceCall();
  }

  onFileUploadChange(event: Event) : void{
    const element = event.currentTarget as HTMLInputElement
    this.file = element.files?.[0];
  }

  OnSubmit() : void{
    if(this.file && this.fileName !== '' && this.title !== '')
      {
        this.imageService.UploadImage(this.file, this.fileName,this.title).subscribe({
          next: (Response) => {
            this.imageUploadForm?.resetForm();
            this.ImagesServiceCall();
          }
        })
      }
  }

  SelectImages(image: ImageUpload){
    this.imageService.selectImage(image)
  }

  private ImagesServiceCall(){
    this.images$ = this.imageService.GetAllImages();
  }
}
