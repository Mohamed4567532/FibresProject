import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FibreServiceService } from '../../services/fibre-service.service';
import { FibreProduct } from '../../models/fibre-product';
import { ProductDialogComponent, ProductDialogData } from '../../components/product-dialog/product-dialog.component';
import { AuthService, User } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {
  products: FibreProduct[] = [];
  filteredProducts: FibreProduct[] = [];
  searchTerm: string = '';
  currentUser: User | null = null;
  
  displayedColumns: string[] = ['image', 'name', 'price', 'stock', 'rating', 'actions'];
  
  private authSubscription: Subscription = new Subscription();

  constructor(
    private fibreService: FibreServiceService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.loadCurrentUser();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  loadCurrentUser() {
    this.authSubscription = this.authService.authState$.subscribe(authState => {
      this.currentUser = authState.user;
    });
  }

  logout() {
    // Confirmation avant déconnexion
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ? Vous perdrez l\'accès à l\'interface d\'administration.')) {
      this.authService.logout().subscribe({
        next: (response) => {
          this.snackBar.open(response.message, 'Fermer', { 
            duration: 3000,
            panelClass: ['success-snackbar']
          });
        },
        error: (error) => {
          console.error('Logout error:', error);
          this.snackBar.open('Erreur lors de la déconnexion', 'Fermer', { 
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }


  loadProducts() {
    this.fibreService.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = [...products];
    });
  }

  filterProducts() {
    if (!this.searchTerm) {
      this.filteredProducts = [...this.products];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term) ||
      product.features.some(feature => feature.toLowerCase().includes(term))
    );
  }

  refreshProducts() {
    this.loadProducts();
    this.snackBar.open('Produits actualisés', 'Fermer', { duration: 2000 });
  }

  openAddProductDialog() {
    const dialogData: ProductDialogData = {
      isEditing: false
    };

    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '800px',
      maxHeight: '90vh',
      autoFocus: false,
      restoreFocus: false,
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.id = this.getNextId();
        this.products.push(result);
        this.filterProducts();
        this.snackBar.open('Produit ajouté avec succès', 'Fermer', { duration: 2000 });
      }
    });
  }

  editProduct(product: FibreProduct) {
    const dialogData: ProductDialogData = {
      product: product,
      isEditing: true
    };

    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '800px',
      maxHeight: '90vh',
      autoFocus: false,
      restoreFocus: false,
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.products.findIndex(p => p.id === result.id);
        if (index > -1) {
          this.products[index] = result;
          this.filterProducts();
          this.snackBar.open('Produit modifié avec succès', 'Fermer', { duration: 2000 });
        }
      }
    });
  }

  deleteProduct(product: FibreProduct) {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le produit "${product.name}" ?`)) {
      const index = this.products.findIndex(p => p.id === product.id);
      if (index > -1) {
        this.products.splice(index, 1);
        this.filterProducts();
        this.snackBar.open('Produit supprimé avec succès', 'Fermer', { duration: 2000 });
      }
    }
  }


  private getNextId(): number {
    return Math.max(...this.products.map(p => p.id)) + 1;
  }
}
