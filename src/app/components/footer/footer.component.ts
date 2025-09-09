import { Component } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  newsletterEmail = '';

  constructor(
    private apiService: ApiServiceService,
    private snackBar: MatSnackBar
  ) {}

  subscribeNewsletter() {
    if (this.newsletterEmail) {
      this.apiService.subscribeNewsletter(this.newsletterEmail).subscribe({
        next: (response) => {
          this.snackBar.open('Inscription réussie !', 'Fermer', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.newsletterEmail = '';
        },
        error: (error) => {
          this.snackBar.open('Erreur lors de l\'inscription', 'Fermer', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }
}
