import { Component, OnInit } from '@angular/core';
import { BookServiceService } from '../../services/book-service';
import { SearchBar } from '../search-bar/search-bar';
import { RouterModule } from '@angular/router';
import { BookDetails } from '../book-details/book-details';
import { Book } from '../../interfaces/book';
import { WishlistService } from '../../services/wishlist';
import { CommonModule } from '@angular/common'; // <-- nécessaire pour ngClass


@Component({
  imports: [CommonModule, RouterModule, SearchBar, BookDetails],
  selector: 'app-book-list',
  templateUrl: './book-list.html',
  styleUrls: ['./book-list.css'],
})
export class BookList implements OnInit {
  booksList: Book[] = [];
  filteredBooksList: Book[] = [];
  selectedBookKey: string | null = null;

  constructor(
    private bookService: BookServiceService,
    public wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
  this.bookService.getBooks().subscribe((data) => {
    this.booksList = Array.from(new Map(data.map(b => [b.key, b])).values());
    this.filteredBooksList = [...this.booksList];
  });

  // Événement pour ouvrir BookDetails depuis wishlist
  window.addEventListener('openBookDetails', (e: any) => {
    const book: Book = e.detail;
    this.openBookDetails(book);
  });
}


  onTitleSearch(title: string) {
    this.filteredBooksList = this.booksList.filter((book) =>
      book.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  onYearSearch(year: number) {
    this.filteredBooksList = year
      ? this.booksList.filter(book => book.first_publish_year === year)
      : [...this.booksList];
  }

  getCoverUrl(cover_id: number): string {
    return cover_id
      ? `https://covers.openlibrary.org/b/id/${cover_id}-M.jpg`
      : 'assets/no-cover.png';
  }

toggleWishlist(book: Book) {
  if (this.wishlistService.isInWishlist(book)) {
    this.wishlistService.removeFromWishlist(book);
  } else {
    this.wishlistService.addToWishlist(book);
  }

  // Trigger storage event pour HeadBar
  window.dispatchEvent(new Event('storage'));
}

isInWishlist(book: Book): boolean {
  return this.wishlistService.isInWishlist(book);
}


  openBookDetails(book: Book) {
    this.selectedBookKey = book.key.replace('/works/', '');
  }

  closeBookDetails() {
    this.selectedBookKey = null;
  }
}
