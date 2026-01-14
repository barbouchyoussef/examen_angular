import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  styleUrls: ['./search-bar.css'],
})
export class SearchBar {
  searchTitle: string = '';
  searchYear: number | null = null;

  @Output() titleSearch = new EventEmitter<string>();
  @Output() yearSearch = new EventEmitter<number>();

  private titleSubject = new Subject<string>();

  constructor() {
    this.titleSubject.pipe(debounceTime(300)).subscribe((title) => {
      this.titleSearch.emit(title);
    });
  }

  onTitleChange() {
    this.titleSubject.next(this.searchTitle);
  }

  onYearSearch() {
    this.yearSearch.emit(this.searchYear ?? 0);
  }
}
