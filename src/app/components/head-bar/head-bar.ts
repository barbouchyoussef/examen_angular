import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../../services/wishlist';
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
  wishlist: any[] = []; // on initialise vide d'abord

  constructor(private wishlistService: WishlistService) {
    // Récupérer la wishlist au démarrage
    this.wishlist = this.wishlistService.getWishlist();

    // Écoute le storage pour mettre à jour dynamiquement la wishlist
    window.addEventListener('storage', () => {
      this.wishlist = this.wishlistService.getWishlist();
    });
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
}
