import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../../services/wishlist';
import { Book } from '../../interfaces/book';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-head-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './head-bar.html',
  styleUrls: ['./head-bar.css'],
})
export class HeadBar {
  showDropdown = false;
  wishlist: Book[] = [];

  constructor(private wishlistService: WishlistService) {
    this.loadWishlist();

    // Mise à jour dynamique si le storage change
    window.addEventListener('storage', () => this.loadWishlist());
  }

  loadWishlist() {
    this.wishlist = this.wishlistService.getWishlist();
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  removeBook(book: Book) {
    this.wishlistService.removeFromWishlist(book);
    this.loadWishlist();
  }

  openBook(book: Book) {
    // Émettre un événement global pour BookList
    const event = new CustomEvent('openBookDetails', { detail: book });
    window.dispatchEvent(event);

    this.showDropdown = false; // fermer le dropdown
  }
}
