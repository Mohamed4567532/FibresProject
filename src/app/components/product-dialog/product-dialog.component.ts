import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductDialogData,
    private api: ApiServiceService
  ) {
    this.productForm = this.createProductForm();
    this.isEditing = data.isEditing;
  }

  ngOnInit() {
    if (this.isEditing && this.data.product) {
      this.populateForm(this.data.product);
    }
  }

  createProductForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      category: ['Câbles'],
      image: ['assets/images/products/'],
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

  onSave() {
    if (!this.productForm.valid) return;

    const formValue = this.productForm.value;
    const payload: FibreProduct = {
      id: this.isEditing && this.data.product ? this.data.product.id : 0,
      name: formValue.name,
      description: formValue.description,
      price: formValue.price,
      category: formValue.category,
      image: formValue.image,
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
      this.api.updateProduct(this.data.product.id, payload).subscribe(saved => {
        this.dialogRef.close(saved);
      });
    } else {
      this.api.createProduct(payload).subscribe(saved => {
        this.dialogRef.close(saved);
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
