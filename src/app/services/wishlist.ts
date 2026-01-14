import { Injectable } from '@angular/core';
import { Book } from '../interfaces/book';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private wishlist: Book[] = [];

  constructor() {
    const stored = localStorage.getItem('wishlist');
    this.wishlist = stored ? JSON.parse(stored) : [];
  }

  getWishlist(): Book[] {
    return this.wishlist;
  }

  addToWishlist(book: Book) {
    if (!this.wishlist.find(b => b.key === book.key)) {
      this.wishlist.push(book);
      this.save();
    }
  }

  removeFromWishlist(book: Book) {
    this.wishlist = this.wishlist.filter(b => b.key !== book.key);
    this.save();
  }

  save() {
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    window.dispatchEvent(new Event('storage')); // pour mise à jour dynamique
  }

  isInWishlist(book: Book): boolean {
    return this.wishlist.some(b => b.key === book.key);
  }
}
