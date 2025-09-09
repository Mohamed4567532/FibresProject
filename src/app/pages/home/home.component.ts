import { Component, OnInit } from '@angular/core';
import { FibreServiceService } from '../../services/fibre-service.service';
import { Service, Testimonial } from '../../models/service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  services: Service[] = [];
  testimonials: Testimonial[] = [];

  constructor(private fibreService: FibreServiceService) {}

  ngOnInit() {
    this.loadServices();
    this.loadTestimonials();
  }

  loadServices() {
    this.fibreService.getServices().subscribe(services => {
      this.services = services.slice(0, 4); // Afficher seulement 4 services sur la page d'accueil
    });
  }

  loadTestimonials() {
    this.fibreService.getTestimonials().subscribe(testimonials => {
      this.testimonials = testimonials.slice(0, 3); // Afficher seulement 3 témoignages
    });
  }
}
