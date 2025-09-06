# FibreOptique Pro - Application Web Vitrine

Une application web moderne développée avec Angular 16 pour une entreprise spécialisée dans la fibre optique.

## 🚀 Fonctionnalités

### 10 Interfaces Principales
1. **Accueil** - Page d'accueil avec hero section, services preview, témoignages
2. **À Propos** - Histoire de l'entreprise, mission, valeurs, équipe
3. **Services** - Présentation des services avec processus détaillé
4. **Produits** - Catalogue des produits fibre optique avec système de panier
5. **Contact** - Formulaire de contact avec validation
6. **Tarifs** - Plans de tarification avec comparaison
7. **FAQ** - Questions fréquemment posées
8. **Équipe** - Présentation de l'équipe
9. **Témoignages** - Avis clients
10. **Pricing** - Plans tarifaires détaillés

### 🛒 Système de Panier
- **Ajout au panier** - Fonctionnalité complète d'ajout de produits
- **Gestion des quantités** - Augmentation/diminution des quantités
- **Persistance** - Sauvegarde dans le localStorage
- **Indicateur visuel** - Badge sur l'icône panier dans le header
- **Résumé du panier** - Affichage du total et nombre d'articles

### Technologies Utilisées
- **Angular 16** - Framework principal
- **Angular Material** - Composants UI modernes
- **Bootstrap 5** - Framework CSS responsive
- **TypeScript** - Langage de programmation
- **RxJS** - Programmation réactive
- **CSS3** - Styles personnalisés avec animations

### Architecture
- **Services** - Gestion des données et communication API
- **Modèles** - Interfaces TypeScript pour la typage
- **Routing** - Navigation entre les pages
- **Responsive Design** - Adaptation mobile/tablette/desktop
- **Animations** - Transitions et effets visuels

## 🛠️ Installation

1. **Cloner le projet**
```bash
git clone <repository-url>
cd FibreProject
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer le serveur de développement**
```bash
ng serve
```

4. **Ouvrir l'application**
Naviguer vers `http://localhost:4200/`

## 📁 Structure du Projet

```
src/
├── app/
│   ├── components/          # Composants réutilisables
│   │   ├── header/         # En-tête avec navigation
│   │   └── footer/         # Pied de page
│   ├── pages/              # Pages principales
│   │   ├── home/           # Page d'accueil
│   │   ├── about/          # À propos
│   │   ├── services/       # Services
│   │   ├── products/       # Produits
│   │   ├── contact/        # Contact
│   │   ├── pricing/        # Tarifs
│   │   ├── portfolio/      # Portfolio
│   │   ├── blog/           # Blog
│   │   ├── faq/            # FAQ
│   │   ├── team/           # Équipe
│   │   └── testimonials/   # Témoignages
│   ├── services/           # Services Angular
│   │   ├── fibre-service.service.ts    # Service métier
│   │   └── api-service.service.ts      # Service API
│   ├── models/             # Modèles de données
│   │   ├── fibre-product.ts
│   │   └── service.ts
│   ├── app-routing.module.ts
│   ├── app.module.ts
│   └── app.component.*
├── assets/                 # Ressources statiques
├── environments/           # Configuration environnement
└── styles.css             # Styles globaux
```

## 🎨 Design

### Palette de Couleurs
- **Primaire** : #667eea (Bleu-violet)
- **Secondaire** : #764ba2 (Violet)
- **Accent** : #ffd700 (Or)
- **Texte** : #2c3e50 (Bleu foncé)
- **Gris** : #666, #f8f9fa

### Typographie
- **Police principale** : Roboto (Google Fonts)
- **Tailles** : Responsive avec rem/em
- **Poids** : 300, 400, 500, 700

### Composants UI
- **Cards** : Ombres et bordures arrondies
- **Boutons** : Dégradés et effets hover
- **Formulaires** : Validation en temps réel
- **Navigation** : Menu responsive avec animations

## 🔧 Services Backend

### API Endpoints
- `GET /api/services` - Liste des services
- `GET /api/products` - Catalogue produits
- `GET /api/blog` - Articles de blog
- `GET /api/team` - Équipe
- `GET /api/testimonials` - Témoignages
- `POST /api/contact` - Envoi formulaire contact
- `POST /api/quotes` - Demande de devis
- `POST /api/newsletter` - Inscription newsletter

### Configuration
Modifier `src/environments/environment.ts` pour l'URL de l'API :
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

## 📱 Responsive Design

- **Mobile** : < 768px
- **Tablet** : 768px - 1024px
- **Desktop** : > 1024px

### Breakpoints CSS
```css
@media (max-width: 768px) { /* Mobile */ }
@media (min-width: 769px) { /* Desktop */ }
```

## 🚀 Déploiement

### Build de Production
```bash
ng build --prod
```

### Serveur Web
Les fichiers générés dans `dist/` peuvent être déployés sur n'importe quel serveur web statique.

## 📝 Fonctionnalités Avancées

### Formulaires
- Validation en temps réel
- Messages d'erreur personnalisés
- Soumission avec feedback utilisateur

### Navigation
- Menu responsive
- Navigation active
- Scroll restoration

### Animations
- Transitions CSS
- Effets hover
- Animations d'entrée

### Performance
- Lazy loading des composants
- Optimisation des images
- Minification CSS/JS

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature
3. Commit les changements
4. Push vers la branche
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

## 📞 Support

Pour toute question ou support technique, contactez l'équipe de développement.

---

**Développé avec ❤️ en Angular 16**
