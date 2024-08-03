import { Component, OnInit, ViewChild } from '@angular/core';
import { BlogPostService } from '../../BlogPost/services/blog-post.service';
import { catchError, Observable, of } from 'rxjs';
import { BlogPostModel } from '../../BlogPost/Models/blogPost.model';
import { CarouselComponent } from 'ngx-bootstrap/carousel';
import { GetAllCategories } from '../../Component/Models/get-category-request.model';
import { SearchService } from 'src/app/components/Services/search.service';

interface GroupedBlogs {
  category: string;
  blogs: BlogPostModel[][];
}

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
  groupedBlogs: GroupedBlogs[] = [];
  filteredBlogs: GroupedBlogs[] = [];

  currentStartIndex : { [key: string]: number } = {};
  visibleCardCount = 3;

  @ViewChild('carousel', { static: false }) carousel: CarouselComponent | undefined;

  constructor(private blogpostServices: BlogPostService, private searchService : SearchService){}

  ngOnInit(): void {
    this.blogPost$ = this.blogpostServices.GetBlogPost().pipe(
      catchError(error => {
        this.errorMessage = 'Failed to load blogs. Please try again later.';
        return of([]); // Return an empty array to handle the error gracefully
      })
    );

    this.blogPost$.subscribe(data => {
      this.groupBlogsByCategory(data);
      this.filteredBlogs = this.groupedBlogs;
    });

    this.searchService.searchTerm$.subscribe(term => {
      this.filterBlogs(term);
    });
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

  groupBlogsByCategory(blogs: BlogPostModel[]): void {
    const groups: { [key: string]: BlogPostModel[][] } = {};

    for (const blog of blogs) {
      if (blog.categoryResponse && blog.categoryResponse.length > 0) {
        // Iterate over each category in the blog's categoryResponse
        blog.categoryResponse.forEach((category: GetAllCategories) => {
          const categoryKey = category.name; // Using category name as a string identifier

          if (!groups[categoryKey]) {
            groups[categoryKey] = [];
            this.currentStartIndex[categoryKey] = 0;
          }

          const categoryBlogs = groups[categoryKey];
          if (categoryBlogs.length === 0 || categoryBlogs[categoryBlogs.length - 1].length >= this.visibleCardCount) {
            categoryBlogs.push([]);
          }

          categoryBlogs[categoryBlogs.length - 1].push(blog);
        });
      }
    }

    this.groupedBlogs = Object.keys(groups).map(category => ({
      category,
      blogs: groups[category]
    }));
  }

  filterBlogs(term: string): void {
    if (term) {
      this.filteredBlogs = this.groupedBlogs.map(group => ({
        category: group.category,
        blogs: group.blogs.map(blogArray => blogArray.filter(blog =>
          blog.title.toLowerCase().includes(term.toLowerCase()) ||
          blog.shortDescription.toLowerCase().includes(term.toLowerCase())
        )).filter(blogArray => blogArray.length > 0)
      })).filter(group => group.blogs.length > 0);
    } else {
      this.filteredBlogs = this.groupedBlogs;
    }
  }

  previous(category: string): void {
    const group = this.groupedBlogs.find(group => group.category === category);
    this.currentStartIndex[category] =
      (this.currentStartIndex[category] > 0
        ? this.currentStartIndex[category] - 1
        : (group ? group.blogs.length - 1 : 0));
  }
  next(category: string): void {
    this.currentStartIndex[category] =
      (this.currentStartIndex[category] + 1) %
      (this.groupedBlogs.find(group => group.category === category)?.blogs.length || 1);
  }
}
