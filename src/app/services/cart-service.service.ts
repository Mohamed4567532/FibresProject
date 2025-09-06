import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FibreProduct } from '../models/fibre-product';

export interface CartItem {
  product: FibreProduct;
  quantity: number;
  totalPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>(this.cartItems);
  private totalSubject = new BehaviorSubject<number>(0);

  constructor() {
    this.loadCartFromStorage();
  }

  // Observable pour écouter les changements du panier
  getCartItems(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }

  // Observable pour écouter les changements du total
  getTotal(): Observable<number> {
    return this.totalSubject.asObservable();
  }

  // Ajouter un produit au panier
  addToCart(product: FibreProduct, quantity: number = 1): void {
    const existingItem = this.cartItems.find(item => item.product.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.totalPrice = existingItem.quantity * product.price;
    } else {
      const newItem: CartItem = {
        product: product,
        quantity: quantity,
        totalPrice: quantity * product.price
      };
      this.cartItems.push(newItem);
    }
    
    this.updateCart();
  }

  // Supprimer un produit du panier
  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    this.updateCart();
  }

  // Mettre à jour la quantité d'un produit
  updateQuantity(productId: number, quantity: number): void {
    const item = this.cartItems.find(item => item.product.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        item.totalPrice = item.quantity * item.product.price;
        this.updateCart();
      }
    }
  }

  // Vider le panier
  clearCart(): void {
    this.cartItems = [];
    this.updateCart();
  }

  // Obtenir le nombre total d'articles
  getItemCount(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  // Obtenir le total du panier
  getCartTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.totalPrice, 0);
  }

  // Vérifier si un produit est dans le panier
  isInCart(productId: number): boolean {
    return this.cartItems.some(item => item.product.id === productId);
  }

  // Obtenir la quantité d'un produit dans le panier
  getProductQuantity(productId: number): number {
    const item = this.cartItems.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  }

  // Mettre à jour le panier et sauvegarder
  private updateCart(): void {
    this.cartSubject.next([...this.cartItems]);
    this.totalSubject.next(this.getCartTotal());
    this.saveCartToStorage();
  }

  // Sauvegarder le panier dans le localStorage
  private saveCartToStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  // Charger le panier depuis le localStorage
  private loadCartFromStorage(): void {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        this.cartItems = JSON.parse(savedCart);
        this.updateCart();
      } catch (error) {
        console.error('Erreur lors du chargement du panier:', error);
        this.cartItems = [];
      }
    }
  }
}
