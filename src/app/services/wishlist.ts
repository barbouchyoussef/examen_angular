import { Injectable } from '@angular/core';
import { Book } from '../interfaces/book';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private wishlist: Book[] = [];

  constructor() {
    const stored = localStorage.getItem('wishlist');
    this.wishlist = stored ? JSON.parse(stored) : [];
  }

  // Retourne toute la wishlist
  getWishlist(): Book[] {
    return this.wishlist;
  }

  // Ajouter un livre
  addToWishlist(book: Book) {
    if (!this.isInWishlist(book)) {
      this.wishlist.push(book);
      this.save();
    }
  }

  // Retirer un livre
  removeFromWishlist(book: Book) {
    this.wishlist = this.wishlist.filter(b => b.key !== book.key);
    this.save();
  }

  // Vérifie si le livre est déjà dans la wishlist
  isInWishlist(book: Book): boolean {
    return this.wishlist.some(b => b.key === book.key);
  }

  // Sauvegarder dans localStorage
  private save() {
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
  }
}
