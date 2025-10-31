import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FibreProduct } from '../../models/fibre-product';
import { ApiServiceService } from '../../services/api-service.service';

export interface ProductDialogData {
  product?: FibreProduct;
  isEditing: boolean;
}

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {
  productForm: FormGroup;
  isEditing: boolean = false;
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  isUploading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductDialogData,
    private api: ApiServiceService,
    private snackBar: MatSnackBar
  ) {
    this.productForm = this.createProductForm();
    this.isEditing = data.isEditing;
  }

  ngOnInit() {
    if (this.isEditing && this.data.product) {
      this.populateForm(this.data.product);
      // Si une image existe déjà, l'afficher en aperçu
      if (this.data.product.image) {
        this.imagePreview = this.api.getImageUrl(this.data.product.image);
      }
    }
  }

  createProductForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      category: ['Câbles'],
      image: [''], // Ce champ sera rempli automatiquement après l'upload
      features: [''],
      specifications: this.fb.group({
        speed: [''],
        distance: [''],
        wavelength: [''],
        connector: ['']
      }),
      inStock: [true],
      rating: [4.0, [Validators.min(1), Validators.max(5)]],
      reviews: [0, [Validators.min(0)]]
    });
  }

  populateForm(product: FibreProduct) {
    this.productForm.patchValue({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      features: product.features.join(', '),
      specifications: {
        speed: product.specifications.speed,
        distance: product.specifications.distance,
        wavelength: product.specifications.wavelength,
        connector: product.specifications.connector
      },
      inStock: product.inStock,
      rating: product.rating,
      reviews: product.reviews
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Vérifier le type de fichier
      if (!file.type.match(/image\/(jpeg|jpg|png|gif|svg|webp)/)) {
        this.snackBar.open('Veuillez sélectionner une image valide (jpeg, jpg, png, gif, svg, webp)', 'Fermer', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        return;
      }

      // Vérifier la taille (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        this.snackBar.open('L\'image ne doit pas dépasser 5MB', 'Fermer', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        return;
      }

      this.selectedFile = file;
      
      // Créer un aperçu de l'image
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.selectedFile = null;
    if (this.isEditing && this.data.product?.image) {
      // En mode édition, garder l'image existante si pas de nouvelle image
      this.imagePreview = this.api.getImageUrl(this.data.product.image);
    } else {
      this.imagePreview = null;
    }
    this.productForm.patchValue({ image: '' });
  }

  onSave() {
    if (!this.productForm.valid) {
      this.snackBar.open('Veuillez remplir tous les champs requis', 'Fermer', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    this.isUploading = true;

    // Si une nouvelle image est sélectionnée, l'uploader d'abord
    if (this.selectedFile) {
      this.api.uploadImage(this.selectedFile).subscribe({
        next: (response) => {
          // Une fois l'image uploadée, sauvegarder le produit avec le chemin de l'image
          // Utiliser l'URL complète pour la sauvegarde en base
          this.saveProduct(response.url || response.path);
        },
        error: (error) => {
          console.error('Upload error:', error);
          this.snackBar.open('Erreur lors de l\'upload de l\'image. Veuillez réessayer.', 'Fermer', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          this.isUploading = false;
        }
      });
    } else {
      // Pas de nouvelle image, utiliser celle existante ou celle du formulaire
      const imagePath = this.productForm.value.image || (this.data.product?.image || '');
      this.saveProduct(imagePath);
    }
  }

  private saveProduct(imagePath: string) {
    const formValue = this.productForm.value;
    const payload: FibreProduct = {
      id: this.isEditing && this.data.product ? this.data.product.id : 0,
      name: formValue.name,
      description: formValue.description,
      price: formValue.price,
      category: formValue.category,
      image: imagePath,
      features: String(formValue.features || '')
        .split(',')
        .map((f: string) => f.trim())
        .filter((f: string) => f.length > 0),
      specifications: {
        speed: formValue.specifications.speed,
        distance: formValue.specifications.distance,
        wavelength: formValue.specifications.wavelength,
        connector: formValue.specifications.connector
      },
      inStock: formValue.inStock,
      rating: formValue.rating,
      reviews: formValue.reviews
    };

    if (this.isEditing && this.data.product) {
      this.api.updateProduct(this.data.product.id, payload).subscribe({
        next: (saved) => {
          this.isUploading = false;
          this.dialogRef.close(saved);
        },
        error: (error) => {
          console.error('Update error:', error);
          this.isUploading = false;
          this.snackBar.open('Erreur lors de la modification du produit', 'Fermer', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    } else {
      this.api.createProduct(payload).subscribe({
        next: (saved) => {
          this.isUploading = false;
          this.dialogRef.close(saved);
        },
        error: (error) => {
          console.error('Create error:', error);
          this.isUploading = false;
          this.snackBar.open('Erreur lors de la création du produit', 'Fermer', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
