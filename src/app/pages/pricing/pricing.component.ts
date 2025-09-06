import { Component, OnInit } from '@angular/core';

interface PricingPlan {
  name: string;
  price: number;
  period: string;
  features: string[];
  popular: boolean;
}

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {
  pricingPlans: PricingPlan[] = [
    {
      name: 'Starter',
      price: 299,
      period: 'par installation',
      features: [
        'Installation fibre optique',
        'Test de performance',
        'Garantie 1 an',
        'Support email'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: 599,
      period: 'par installation',
      features: [
        'Installation fibre optique',
        'Test de performance avancé',
        'Garantie 3 ans',
        'Support téléphonique',
        'Maintenance préventive'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 999,
      period: 'par installation',
      features: [
        'Installation fibre optique',
        'Test de performance complet',
        'Garantie 5 ans',
        'Support 24/7',
        'Maintenance préventive',
        'Formation équipe'
      ],
      popular: false
    }
  ];

  ngOnInit() {}
}
