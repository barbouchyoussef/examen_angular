import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookServiceService } from '../../services/book-service';
import { Book } from '../../interfaces/book';

@Component({
  selector: 'app-book-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './book-details.html',
  styleUrls: ['./book-details.css'],
})
export class BookDetails implements OnInit, OnChanges {
  @Input() bookKey: string | null = null;
  @Output() close: EventEmitter<void> = new EventEmitter();

  book: Book | null = null;
  wishlist: Book[] = [];

  constructor(private bookService: BookServiceService) {}

  ngOnInit(): void {
    const storedWishlist = localStorage.getItem('wishlist');
    this.wishlist = storedWishlist ? (JSON.parse(storedWishlist) as Book[]) : [];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['bookKey'] && this.bookKey) {
      this.bookService.getBookById(this.bookKey).subscribe((data) => {
        this.book = data;
      });
    }
  }

  getCoverUrl(cover_id: number | undefined): string {
    return cover_id ? `https://covers.openlibrary.org/b/id/${cover_id}-M.jpg` : 'assets/no-cover.png';
  }

  toggleWishlist(book: Book) {
    const index = this.wishlist.findIndex(b => b.key === book.key);
    if (index > -1) this.wishlist.splice(index, 1);
    else this.wishlist.push(book);

    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
  }

  isInWishlist(book: Book): boolean {
    return this.wishlist.some(b => b.key === book.key);
  }

  closeModal() {
    this.close.emit();
  }
}
