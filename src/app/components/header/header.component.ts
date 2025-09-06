import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartServiceService } from '../../services/cart-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  mobileMenuOpen = false;
  cartItemCount = 0;
  private cartSubscription: Subscription = new Subscription();

  constructor(private cartService: CartServiceService) {}

  ngOnInit() {
    this.subscribeToCart();
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }

  subscribeToCart() {
    this.cartSubscription.add(
      this.cartService.getCartItems().subscribe(() => {
        this.cartItemCount = this.cartService.getItemCount();
      })
    );
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }
}
