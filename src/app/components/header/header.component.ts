import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartServiceService } from '../../services/cart-service.service';
import { AuthService, User } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  mobileMenuOpen = false;
  cartItemCount = 0;
  currentUser: User | null = null;
  isAuthenticated = false;
  
  private cartSubscription: Subscription = new Subscription();
  private authSubscription: Subscription = new Subscription();

  constructor(
    private cartService: CartServiceService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.subscribeToCart();
    this.subscribeToAuth();
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
  }

  subscribeToCart() {
    this.cartSubscription.add(
      this.cartService.getCartItems().subscribe(() => {
        this.cartItemCount = this.cartService.getItemCount();
      })
    );
  }

  subscribeToAuth() {
    this.authSubscription.add(
      this.authService.authState$.subscribe(authState => {
        this.isAuthenticated = authState.isAuthenticated;
        this.currentUser = authState.user;
      })
    );
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }

  logout() {
    // Confirmation avant déconnexion
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      this.authService.logout().subscribe({
        next: (response) => {
          console.log('Logout successful:', response.message);
        },
        error: (error) => {
          console.error('Logout error:', error);
        }
      });
    }
  }
}
