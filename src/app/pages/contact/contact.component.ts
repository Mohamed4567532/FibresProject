import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from '../../services/api-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiServiceService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      company: [''],
      subject: ['', [Validators.required]],
      service: [''],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit() {
    // Pré-remplir le service si passé en paramètre
    this.route.queryParams.subscribe(params => {
      if (params['service']) {
        this.contactForm.patchValue({
          service: params['service'].toLowerCase(),
          subject: `Demande de devis - ${params['service']}`
        });
      }
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      
      this.apiService.sendContactForm(this.contactForm.value).subscribe({
        next: (response) => {
          this.snackBar.open('Message envoyé avec succès !', 'Fermer', {
            duration: 5000,
            panelClass: ['success-snackbar']
          });
          this.contactForm.reset();
          this.isSubmitting = false;
        },
        error: (error) => {
          this.snackBar.open('Erreur lors de l\'envoi du message', 'Fermer', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
          this.isSubmitting = false;
        }
      });
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
