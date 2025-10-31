import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Service } from '../../models/service';
import { ApiServiceService } from '../../services/api-service.service';

export interface ServiceDialogData {
  service?: Service;
  isEditing: boolean;
}

@Component({
  selector: 'app-service-dialog',
  templateUrl: './service-dialog.component.html',
  styleUrls: ['./service-dialog.component.css']
})
export class ServiceDialogComponent {
  serviceForm: FormGroup;
  isEditing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ServiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ServiceDialogData,
    private api: ApiServiceService
  ) {
    this.isEditing = data.isEditing;
    this.serviceForm = this.createServiceForm();
  }

  createServiceForm(): FormGroup {
    return this.fb.group({
      title: [this.data.service?.title || '', Validators.required],
      description: [this.data.service?.description || '', Validators.required],
      icon: [this.data.service?.icon || 'fiber_optics', Validators.required],
      category: [this.data.service?.category || 'Installation', Validators.required],
      price: [this.data.service?.price || null],
      duration: [this.data.service?.duration || ''],
      features: [this.data.service?.features?.join(', ') || '']
    });
  }

  onSave() {
    if (!this.serviceForm.valid) return;

    const formValue = this.serviceForm.value;
    const service: Service = {
      id: this.data.service?.id || 0,
      title: formValue.title,
      description: formValue.description,
      icon: formValue.icon,
      category: formValue.category,
      price: formValue.price || undefined,
      duration: formValue.duration || undefined,
      features: formValue.features ? formValue.features.split(',').map((f: string) => f.trim()).filter((f: string) => f.length > 0) : []
    };

    if (this.isEditing && this.data.service) {
      this.api.updateService(this.data.service.id, service).subscribe({
        next: (saved) => this.dialogRef.close(saved),
        error: (error) => {
          console.error('Error updating service:', error);
          alert('Erreur lors de la modification du service');
        }
      });
    } else {
      this.api.createService(service).subscribe({
        next: (saved) => this.dialogRef.close(saved),
        error: (error) => {
          console.error('Error creating service:', error);
          alert('Erreur lors de la création du service');
        }
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}

