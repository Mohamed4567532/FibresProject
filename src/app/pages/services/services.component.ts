import { Component, OnInit } from '@angular/core';
import { FibreServiceService } from '../../services/fibre-service.service';
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
    private fibreService: FibreServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadServices();
  }

  loadServices() {
    this.fibreService.getServices().subscribe(services => {
      this.services = services;
    });
  }

  requestQuote(service: Service) {
    // Rediriger vers la page de contact avec le service pré-sélectionné
    this.router.navigate(['/contact'], { 
      queryParams: { service: service.title } 
    });
  }
}
