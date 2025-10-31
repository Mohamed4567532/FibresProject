import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import { Service } from '../../models/service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  services: Service[] = [];

  constructor(
    private api: ApiServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadServices();
  }

  loadServices() {
    this.api.getServices().subscribe({
      next: (services) => {
        this.services = services;
      },
      error: (error) => {
        console.error('Error loading services:', error);
      }
    });
  }

  requestQuote(service: Service) {
    // Rediriger vers la page de contact avec le service pré-sélectionné
    this.router.navigate(['/contact'], { 
      queryParams: { service: service.title } 
    });
  }
}
