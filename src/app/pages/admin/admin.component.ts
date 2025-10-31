import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiServiceService } from '../../services/api-service.service';
import { FibreProduct } from '../../models/fibre-product';
import { Service } from '../../models/service';
import { ProductDialogComponent, ProductDialogData } from '../../components/product-dialog/product-dialog.component';
import { ServiceDialogComponent, ServiceDialogData } from '../../components/service-dialog/service-dialog.component';
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
  
  services: Service[] = [];
  filteredServices: Service[] = [];
  serviceSearchTerm: string = '';
  
  selectedTabIndex: number = 0;
  currentUser: User | null = null;
  
  displayedColumns: string[] = ['image', 'name', 'price', 'stock', 'rating', 'actions'];
  serviceDisplayedColumns: string[] = ['icon', 'title', 'description', 'price', 'duration', 'actions'];
  
  private authSubscription: Subscription = new Subscription();

  constructor(
    private api: ApiServiceService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  // Méthode helper pour obtenir l'URL complète d'une image
  getImageUrl(imagePath: string): string {
    return this.api.getImageUrl(imagePath);
  }

  ngOnInit() {
    this.loadProducts();
    this.loadServices();
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
    this.api.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = [...products];
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.snackBar.open('Erreur lors du chargement des produits', 'Fermer', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
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
        // Le produit est déjà créé dans la base via le dialog
        // Il suffit de recharger les produits depuis la base
        this.loadProducts();
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
        // Le produit est déjà mis à jour dans la base via le dialog
        // Il suffit de recharger les produits depuis la base
        this.loadProducts();
        this.snackBar.open('Produit modifié avec succès', 'Fermer', { duration: 2000 });
      }
    });
  }

  deleteProduct(product: FibreProduct) {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le produit "${product.name}" ?`)) {
      this.api.deleteProduct(product.id).subscribe({
        next: () => {
          // Recharger les produits depuis la base après suppression
          this.loadProducts();
          this.snackBar.open('Produit supprimé avec succès', 'Fermer', { duration: 2000 });
        },
        error: (error) => {
          console.error('Error deleting product:', error);
          this.snackBar.open('Erreur lors de la suppression du produit', 'Fermer', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }

  // Services Management
  loadServices() {
    this.api.getServices().subscribe({
      next: (services) => {
        this.services = services;
        this.filteredServices = [...services];
      },
      error: (error) => {
        console.error('Error loading services:', error);
        this.snackBar.open('Erreur lors du chargement des services', 'Fermer', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  filterServices() {
    if (!this.serviceSearchTerm) {
      this.filteredServices = [...this.services];
      return;
    }

    const term = this.serviceSearchTerm.toLowerCase();
    this.filteredServices = this.services.filter(service =>
      service.title.toLowerCase().includes(term) ||
      service.description.toLowerCase().includes(term) ||
      service.category.toLowerCase().includes(term) ||
      service.features.some(feature => feature.toLowerCase().includes(term))
    );
  }

  refreshServices() {
    this.loadServices();
    this.snackBar.open('Services actualisés', 'Fermer', { duration: 2000 });
  }

  onTabChange(index: number) {
    this.selectedTabIndex = index;
    if (index === 1) {
      // Charger les services si on passe à l'onglet services
      this.loadServices();
    }
  }

  openAddServiceDialog() {
    this.openServiceDialog(null);
  }

  editService(service: Service) {
    this.openServiceDialog(service);
  }

  private openServiceDialog(service: Service | null) {
    const dialogData: ServiceDialogData = {
      service: service || undefined,
      isEditing: !!service
    };

    const dialogRef = this.dialog.open(ServiceDialogComponent, {
      width: '600px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadServices();
        this.snackBar.open(
          service ? 'Service modifié avec succès' : 'Service ajouté avec succès',
          'Fermer',
          { duration: 2000 }
        );
      }
    });
  }

  deleteService(service: Service) {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le service "${service.title}" ?`)) {
      this.api.deleteService(service.id).subscribe({
        next: () => {
          this.loadServices();
          this.snackBar.open('Service supprimé avec succès', 'Fermer', { duration: 2000 });
        },
        error: (error) => {
          console.error('Error deleting service:', error);
          this.snackBar.open('Erreur lors de la suppression du service', 'Fermer', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }
}
