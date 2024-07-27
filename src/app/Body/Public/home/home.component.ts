import { Component, OnInit, ViewChild } from '@angular/core';
import { BlogPostService } from '../../BlogPost/services/blog-post.service';
import { catchError, Observable, of } from 'rxjs';
import { BlogPostModel } from '../../BlogPost/Models/blogPost.model';
import { CarouselComponent } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  blogPost$? : Observable<BlogPostModel[]>
  errorMessage: string | null = null;
  blogPost: BlogPostModel[] = [];
  cardGroups: BlogPostModel[][] = [];

  currentStartIndex = 0;
  visibleCardCount = 3;

  @ViewChild('carousel', { static: false }) carousel: CarouselComponent | undefined;

  constructor(private blogpostServices: BlogPostService){}

  ngOnInit(): void {
    this.blogPost$ = this.blogpostServices.GetBlogPost().pipe(
      catchError(error => {
        this.errorMessage = 'Failed to load blogs. Please try again later.';
        return of([]); // Return an empty array to handle the error gracefully
      })
    );

    this.blogPost$.subscribe(data => {
      this.groupCards(data);
    });
    console.log(this.cardGroups);
  }
  
  closeAlert(): void {
    this.errorMessage = null;
  }

  groupCards(cards: BlogPostModel[]): void {
    this.cardGroups = [];
    for (let i = 0; i < cards.length; i += this.visibleCardCount) {
      this.cardGroups.push(cards.slice(i, i + this.visibleCardCount));
    }
  }

  previous(): void {
    this.currentStartIndex =
      (this.currentStartIndex > 0
        ? this.currentStartIndex - 1
        : this.cardGroups.length - 1);
  }

  next(): void {
    this.currentStartIndex =
      (this.currentStartIndex + 1) % this.cardGroups.length;
  }


  
}
