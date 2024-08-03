import { Component } from '@angular/core';
import { SearchService } from '../Services/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private searchService: SearchService){}

  onSearch(term: string) {
    this.searchService.setSearchTerm(term);
  }
}
