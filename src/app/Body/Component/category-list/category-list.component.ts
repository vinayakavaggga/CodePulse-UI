import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../Services/category.service';
import { Observable } from 'rxjs';
import { GetAllCategories } from '../Models/get-category-request.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})

export class CategoryListComponent implements OnInit {
[x: string]: any;
  Category$?: Observable<GetAllCategories[]>

  constructor(private categoryService: CategoryService){
  }

  ngOnInit(): void {
    this.Category$ = this.categoryService.GetCategories()
  }

}
