import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FibreProduct } from '../models/fibre-product';
import { Service, BlogPost, TeamMember, Testimonial } from '../models/service';

@Injectable({
  providedIn: 'root'
})
export class FibreServiceService {

  constructor() { }

  // Services de fibre optique
  getServices(): Observable<Service[]> {
    const services: Service[] = [
      {
        id: 1,
        title: 'Installation Fibre Optique',
        description: 'Installation professionnelle de réseaux de fibre optique pour entreprises et particuliers',
        icon: 'fiber_optics',
        features: ['Installation complète', 'Test de performance', 'Garantie 5 ans', 'Support 24/7'],
        price: 299,
        duration: '1-3 jours',
        category: 'Installation'
      },
      {
        id: 2,
        title: 'Maintenance Réseau',
        description: 'Services de maintenance préventive et corrective pour vos infrastructures fibre',
        icon: 'build',
        features: ['Maintenance préventive', 'Diagnostic avancé', 'Réparation rapide', 'Rapports détaillés'],
        price: 149,
        duration: 'Sur demande',
        category: 'Maintenance'
      },
      {
        id: 3,
        title: 'Audit Réseau',
        description: 'Analyse complète de votre infrastructure réseau existante',
        icon: 'analytics',
        features: ['Audit complet', 'Recommandations', 'Plan d\'amélioration', 'Rapport détaillé'],
        price: 199,
        duration: '2-5 jours',
        category: 'Audit'
      },
      {
        id: 4,
        title: 'Conseil Technique',
        description: 'Expertise technique pour optimiser vos réseaux de fibre optique',
        icon: 'engineering',
        features: ['Conseil personnalisé', 'Architecture réseau', 'Optimisation', 'Formation équipe'],
        price: 99,
        duration: '1 jour',
        category: 'Conseil'
      }
    ];
    return of(services);
  }

  // Produits de fibre optique
  getProducts(): Observable<FibreProduct[]> {
    const products: FibreProduct[] = [
      // Câbles Fibre Optique
      {
        id: 1,
        name: 'Câble Fibre Monomode OS2',
        description: 'Câble fibre optique monomode haute performance pour longues distances',
        price: 2.50,
        category: 'Câbles',
        image: 'assets/images/products/cable-os2.svg',
        features: ['Monomode OS2', 'Longue distance', 'Haute performance', 'Résistant'],
        specifications: {
          speed: '10-100 Gbps',
          distance: '40-80 km',
          wavelength: '1310/1550 nm',
          connector: 'LC/UPC'
        },
        inStock: true,
        rating: 4.8,
        reviews: 156
      },
      {
        id: 2,
        name: 'Câble Fibre Multimode OM3',
        description: 'Câble fibre optique multimode pour applications courtes distances',
        price: 1.80,
        category: 'Câbles',
        image: 'assets/images/products/cable-om3.svg',
        features: ['Multimode OM3', 'Courte distance', 'Haute vitesse', 'Économique'],
        specifications: {
          speed: '1-10 Gbps',
          distance: '300m-1km',
          wavelength: '850/1300 nm',
          connector: 'LC/UPC'
        },
        inStock: true,
        rating: 4.5,
        reviews: 98
      },
      {
        id: 3,
        name: 'Câble Fibre Multimode OM4',
        description: 'Câble fibre optique multimode haute performance pour data centers',
        price: 2.20,
        category: 'Câbles',
        image: 'assets/images/products/cable-om4.svg',
        features: ['Multimode OM4', 'Data Center', 'Très haute vitesse', 'Faible atténuation'],
        specifications: {
          speed: '10-100 Gbps',
          distance: '400m-1.5km',
          wavelength: '850/1300 nm',
          connector: 'LC/UPC'
        },
        inStock: true,
        rating: 4.7,
        reviews: 124
      },
      {
        id: 4,
        name: 'Câble Fibre Armé Extérieur',
        description: 'Câble fibre optique armé pour installation extérieure',
        price: 3.50,
        category: 'Câbles',
        image: 'assets/images/products/cable-arme.svg',
        features: ['Armé', 'Extérieur', 'Résistant UV', 'Protection renforcée'],
        specifications: {
          speed: '10-100 Gbps',
          distance: '40-80 km',
          wavelength: '1310/1550 nm',
          connector: 'LC/UPC'
        },
        inStock: true,
        rating: 4.6,
        reviews: 87
      },
      
      // Équipements Réseau
      {
        id: 5,
        name: 'Switch Fibre 24 Ports',
        description: 'Commutateur réseau 24 ports fibre optique avec gestion avancée',
        price: 899,
        category: 'Équipements',
        image: 'assets/images/products/switch-24p.svg',
        features: ['24 ports SFP+', 'Gestion Web', 'VLAN', 'PoE+'],
        specifications: {
          speed: '1-10 Gbps',
          distance: '10-40 km',
          wavelength: '850/1310/1550 nm',
          connector: 'SFP+'
        },
        inStock: true,
        rating: 4.6,
        reviews: 89
      },
      {
        id: 6,
        name: 'Switch Fibre 48 Ports',
        description: 'Commutateur réseau 48 ports fibre optique haute densité',
        price: 1299,
        category: 'Équipements',
        image: 'assets/images/products/switch-48p.svg',
        features: ['48 ports SFP+', 'Haute densité', 'Gestion avancée', 'Redondance'],
        specifications: {
          speed: '1-10 Gbps',
          distance: '10-40 km',
          wavelength: '850/1310/1550 nm',
          connector: 'SFP+'
        },
        inStock: true,
        rating: 4.8,
        reviews: 67
      },
      {
        id: 7,
        name: 'Routeur Fibre Optique',
        description: 'Routeur professionnel pour réseaux fibre optique',
        price: 1599,
        category: 'Équipements',
        image: 'assets/images/products/router-fibre.svg',
        features: ['Routage avancé', 'Sécurité intégrée', 'QoS', 'VPN'],
        specifications: {
          speed: '1-100 Gbps',
          distance: 'Illimité',
          wavelength: 'Multi-longueur',
          connector: 'SFP+/QSFP+'
        },
        inStock: true,
        rating: 4.9,
        reviews: 45
      },
      
      // Modules et Transceivers
      {
        id: 8,
        name: 'Module SFP+ 10G',
        description: 'Module transceiver SFP+ 10 Gigabit pour fibre optique',
        price: 89,
        category: 'Modules',
        image: 'assets/images/products/sfp-10g.svg',
        features: ['10 Gigabit', 'SFP+', 'Hot-plug', 'Diagnostic'],
        specifications: {
          speed: '10 Gbps',
          distance: '10-40 km',
          wavelength: '1310 nm',
          connector: 'LC'
        },
        inStock: true,
        rating: 4.4,
        reviews: 203
      },
      {
        id: 9,
        name: 'Module SFP 1G',
        description: 'Module transceiver SFP 1 Gigabit pour fibre optique',
        price: 45,
        category: 'Modules',
        image: 'assets/images/products/sfp-1g.svg',
        features: ['1 Gigabit', 'SFP', 'Hot-plug', 'Économique'],
        specifications: {
          speed: '1 Gbps',
          distance: '10-20 km',
          wavelength: '1310 nm',
          connector: 'LC'
        },
        inStock: true,
        rating: 4.3,
        reviews: 156
      },
      {
        id: 10,
        name: 'Module QSFP+ 40G',
        description: 'Module transceiver QSFP+ 40 Gigabit pour fibre optique',
        price: 299,
        category: 'Modules',
        image: 'assets/images/products/qsfp-40g.svg',
        features: ['40 Gigabit', 'QSFP+', 'Haute performance', 'Data Center'],
        specifications: {
          speed: '40 Gbps',
          distance: '100m-10km',
          wavelength: '850 nm',
          connector: 'MPO'
        },
        inStock: true,
        rating: 4.7,
        reviews: 78
      },
      
      // Accessoires et Connecteurs
      {
        id: 11,
        name: 'Pigtailles LC-LC',
        description: 'Pigtailles fibre optique LC-LC pour connexions',
        price: 12,
        category: 'Accessoires',
        image: 'assets/images/products/pigtail-lc.svg',
        features: ['LC-LC', 'UPC', '1m', 'Qualité professionnelle'],
        specifications: {
          speed: '1-10 Gbps',
          distance: 'Variable',
          wavelength: '1310/1550 nm',
          connector: 'LC/UPC'
        },
        inStock: true,
        rating: 4.2,
        reviews: 234
      },
      {
        id: 12,
        name: 'Coffret de Raccordement',
        description: 'Coffret de raccordement fibre optique 12 ports',
        price: 199,
        category: 'Accessoires',
        image: 'assets/images/products/coffret-12p.svg',
        features: ['12 ports', 'Raccordement', 'Protection', 'Installation facile'],
        specifications: {
          speed: '1-100 Gbps',
          distance: 'Variable',
          wavelength: 'Multi-longueur',
          connector: 'LC/SC'
        },
        inStock: true,
        rating: 4.5,
        reviews: 89
      },
      {
        id: 13,
        name: 'Câble de Raccordement SC-SC',
        description: 'Câble de raccordement fibre optique SC-SC 2m',
        price: 18,
        category: 'Accessoires',
        image: 'assets/images/products/cable-sc-sc.svg',
        features: ['SC-SC', '2m', 'UPC', 'Flexible'],
        specifications: {
          speed: '1-10 Gbps',
          distance: '2m',
          wavelength: '1310/1550 nm',
          connector: 'SC/UPC'
        },
        inStock: true,
        rating: 4.1,
        reviews: 167
      },
      {
        id: 14,
        name: 'Testeur de Fibre Optique',
        description: 'Testeur de puissance et perte de fibre optique',
        price: 599,
        category: 'Outils',
        image: 'assets/images/products/testeur-fibre.svg',
        features: ['Test de puissance', 'Mesure de perte', 'Portable', 'Précis'],
        specifications: {
          speed: 'N/A',
          distance: 'N/A',
          wavelength: '1310/1550 nm',
          connector: 'LC/SC'
        },
        inStock: true,
        rating: 4.8,
        reviews: 34
      },
      {
        id: 15,
        name: 'Kit de Soudure Fibre',
        description: 'Kit complet de soudure pour fibre optique',
        price: 1299,
        category: 'Outils',
        image: 'assets/images/products/kit-soudure.svg',
        features: ['Soudeuse', 'Découpeuse', 'Microscope', 'Accessoires'],
        specifications: {
          speed: 'N/A',
          distance: 'N/A',
          wavelength: 'N/A',
          connector: 'N/A'
        },
        inStock: true,
        rating: 4.9,
        reviews: 23
      }
    ];
    return of(products);
  }

  // Articles de blog
  getBlogPosts(): Observable<BlogPost[]> {
    const posts: BlogPost[] = [
      {
        id: 1,
        title: 'Les Avantages de la Fibre Optique en 2024',
        content: 'Contenu complet de l\'article...',
        excerpt: 'Découvrez pourquoi la fibre optique reste la technologie de choix pour les réseaux modernes',
        author: 'Jean Dupont',
        date: new Date('2024-01-15'),
        image: 'assets/images/blog/fibre-advantages.jpg',
        tags: ['fibre', 'technologie', 'réseau'],
        category: 'Technologie'
      }
    ];
    return of(posts);
  }

  // Équipe
  getTeamMembers(): Observable<TeamMember[]> {
    const members: TeamMember[] = [
      {
        id: 1,
        name: 'Marie Martin',
        position: 'Directrice Technique',
        bio: 'Expert en fibre optique avec 15 ans d\'expérience',
        image: 'assets/images/team/marie-martin.jpg',
        social: {
          linkedin: 'https://linkedin.com/in/marie-martin',
          email: 'marie@fibre-optique.com'
        },
        expertise: ['Installation', 'Audit', 'Formation']
      }
    ];
    return of(members);
  }

  // Témoignages
  getTestimonials(): Observable<Testimonial[]> {
    const testimonials: Testimonial[] = [
      {
        id: 1,
        name: 'Pierre Dubois',
        company: 'TechCorp',
        position: 'Directeur IT',
        content: 'Service exceptionnel, installation parfaite et équipe très professionnelle.',
        rating: 5,
        image: 'assets/images/testimonials/pierre-dubois.jpg',
        date: new Date('2024-01-10')
      }
    ];
    return of(testimonials);
  }
}
