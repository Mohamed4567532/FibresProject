import { Component, OnInit } from '@angular/core';
import { FibreServiceService } from '../../services/fibre-service.service';
import { Testimonial } from '../../models/service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit {
  testimonials: Testimonial[] = [];

  constructor(private fibreService: FibreServiceService) {}

  ngOnInit() {
    this.loadTestimonials();
  }

  loadTestimonials() {
    this.fibreService.getTestimonials().subscribe(testimonials => {
      this.testimonials = testimonials;
    });
  }
}
