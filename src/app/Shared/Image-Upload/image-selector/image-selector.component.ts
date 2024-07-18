import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageService } from './image.service';
import { Observable, Subscription } from 'rxjs';
import { ImageUpload } from '../Models/image.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css']
})

export class ImageSelectorComponent implements OnInit {

   id: string | null = null 
   file? : File
   fileName : string = ''
   title : string = ''
   isImagePopUpVisible : boolean = false;

   editImageSubscription?: Subscription
   model? : ImageUpload;

   images$? : Observable<ImageUpload[]>
   @ViewChild('form',{ static : false})  imageUploadForm? : NgForm
  

  constructor(private imageService: ImageService, private router: Router,
    private route : ActivatedRoute){
    }


  ngOnInit(): void {
    
    this.editImageSubscription = this.route.paramMap.subscribe({
      next: (parms) => {
        this.id = parms.get('id')
        console.log(this.id);
      }
    })

    this.isImagePopUpVisible = false;

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

  ClosePopup(){
    this.isImagePopUpVisible = false
  }

  DeletePhoto(imageid: string) : void{
    if(imageid){
      this.imageService.DeleteImages(imageid).subscribe({
        next: (response) => {
          this.isImagePopUpVisible = true
          window.location.reload();
        }
      })
    }
  }
}
