import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent, ProductDialogData } from '../../components/product-dialog/product-dialog.component';
import { FibreServiceService } from '../../services/fibre-service.service';
import { CartServiceService } from '../../services/cart-service.service';
import { FibreProduct } from '../../models/fibre-product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: FibreProduct[] = [];
  filteredProducts: FibreProduct[] = [];
  categories: string[] = [];
  
  // Filtres et recherche
  searchTerm: string = '';
  selectedCategory: string = '';
  sortBy: string = 'name';
  viewMode: 'grid' | 'list' = 'grid';
  
  // Panier
  cartItemCount: number = 0;
  cartTotal: number = 0;
  private cartSubscription: Subscription = new Subscription();

  constructor(
    private fibreService: FibreServiceService,
    private cartService: CartServiceService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.subscribeToCart();
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }

  loadProducts() {
    this.fibreService.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = [...products];
      this.extractCategories();
    });
  }

  extractCategories() {
    this.categories = [...new Set(this.products.map(product => product.category))];
  }

  subscribeToCart() {
    this.cartSubscription.add(
      this.cartService.getCartItems().subscribe(items => {
        this.cartItemCount = this.cartService.getItemCount();
        this.cartTotal = this.cartService.getCartTotal();
      })
    );
  }

  filterProducts() {
    let filtered = [...this.products];

    // Filtre par recherche
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        product.features.some(feature => feature.toLowerCase().includes(term))
      );
    }

    // Filtre par catégorie
    if (this.selectedCategory) {
      filtered = filtered.filter(product => product.category === this.selectedCategory);
    }

    this.filteredProducts = filtered;
    this.sortProducts();
  }

  sortProducts() {
    if (!this.sortBy) return;

    this.filteredProducts.sort((a, b) => {
      switch (this.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }

  setViewMode(mode: 'grid' | 'list') {
    this.viewMode = mode;
  }

  addToCart(product: FibreProduct) {
    const quantity = this.getProductQuantity(product.id) + 1;
    this.cartService.addToCart(product, quantity);
  }

  increaseQuantity(productId: number) {
    const product = this.products.find(p => p.id === productId);
    if (product) {
      this.cartService.addToCart(product, 1);
    }
  }

  decreaseQuantity(productId: number) {
    const currentQuantity = this.getProductQuantity(productId);
    if (currentQuantity > 0) {
      this.cartService.updateQuantity(productId, currentQuantity - 1);
    }
  }

  isInCart(productId: number): boolean {
    return this.cartService.isInCart(productId);
  }

  getProductQuantity(productId: number): number {
    return this.cartService.getProductQuantity(productId);
  }

  viewCart() {
    // TODO: Implémenter la navigation vers le panier
    console.log('Voir le panier');
  }

  checkout() {
    // TODO: Implémenter le processus de commande
    console.log('Commander');
  }

  openAddProductDialog() {
    const dialogData: ProductDialogData = { isEditing: false };
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '800px',
      maxHeight: '90vh',
      autoFocus: false,
      restoreFocus: false,
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Generate a new id based on current list
        const nextId = this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
        result.id = nextId;
        this.products.push(result);
        this.filteredProducts = [...this.products];
        this.extractCategories();
        this.filterProducts();
      }
    });
  }
}
