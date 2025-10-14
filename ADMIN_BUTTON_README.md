# Bouton "Ajouter un produit" - Restriction Administrateur

## Vue d'ensemble

Le bouton "Ajouter un produit" dans la page des produits (`/products`) est maintenant restreint aux administrateurs uniquement. Cette fonctionnalité garantit que seuls les utilisateurs avec le rôle `admin` peuvent ajouter de nouveaux produits au catalogue.

## Fonctionnalités implémentées

### ✅ Affichage conditionnel
- Le bouton "Ajouter un produit" n'est visible que pour les administrateurs connectés
- Utilise la directive `*ngIf="isAdmin"` pour contrôler l'affichage

### ✅ Protection de la fonction
- La méthode `openAddProductDialog()` vérifie le rôle utilisateur
- Bloque l'exécution si l'utilisateur n'est pas administrateur
- Affiche un message d'avertissement dans la console

### ✅ Message informatif
- Affiche un message discret pour les utilisateurs connectés non-administrateurs
- Indique que seuls les administrateurs peuvent ajouter des produits
- Design cohérent avec l'interface utilisateur

### ✅ Gestion de l'état d'authentification
- Souscription aux changements d'état d'authentification
- Mise à jour automatique de l'affichage lors de la connexion/déconnexion
- Nettoyage des souscriptions lors de la destruction du composant

## Code implémenté

### TypeScript (products.component.ts)

```typescript
// Propriétés d'authentification
currentUser: User | null = null;
isAuthenticated = false;
isAdmin = false;
private authSubscription: Subscription = new Subscription();

// Souscription à l'état d'authentification
subscribeToAuth() {
  this.authSubscription.add(
    this.authService.authState$.subscribe(authState => {
      this.isAuthenticated = authState.isAuthenticated;
      this.currentUser = authState.user;
      this.isAdmin = authState.user?.role === 'admin';
    })
  );
}

// Protection de la fonction
openAddProductDialog() {
  if (!this.isAdmin) {
    console.warn('Accès refusé: Seuls les administrateurs peuvent ajouter des produits');
    return;
  }
  // ... reste du code
}
```

### HTML (products.component.html)

```html
<!-- Bouton visible uniquement pour les admins -->
<button mat-raised-button class="btn-primary" 
        (click)="openAddProductDialog()" 
        *ngIf="isAdmin">
  <mat-icon>add</mat-icon>
  Ajouter un produit
</button>

<!-- Message informatif pour les non-admins -->
<div class="admin-info" *ngIf="isAuthenticated && !isAdmin">
  <mat-icon>info</mat-icon>
  <span>Seuls les administrateurs peuvent ajouter des produits</span>
</div>
```

### CSS (products.component.css)

```css
.admin-info {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  font-size: 0.9rem;
  background: #f8f9fa;
  padding: 8px 12px;
  border-radius: 20px;
  border: 1px solid #e0e0e0;
}
```

## Comportement selon le rôle

### 👤 Utilisateur non connecté
- Le bouton "Ajouter un produit" n'est **pas visible**
- Aucun message informatif affiché
- Peut naviguer et voir les produits normalement

### 👤 Utilisateur connecté (rôle: user)
- Le bouton "Ajouter un produit" n'est **pas visible**
- Message informatif affiché : "Seuls les administrateurs peuvent ajouter des produits"
- Peut naviguer et voir les produits normalement

### 👑 Administrateur connecté (rôle: admin)
- Le bouton "Ajouter un produit" est **visible et fonctionnel**
- Aucun message informatif affiché
- Peut ajouter, modifier et gérer les produits

## Sécurité

### Protection côté client
- Vérification du rôle dans le composant Angular
- Affichage conditionnel basé sur l'état d'authentification
- Protection de la fonction d'ouverture du dialogue

### Protection côté serveur
- L'API backend doit également vérifier les permissions
- Les routes d'administration sont protégées par le guard d'authentification
- Validation des tokens JWT pour toutes les opérations sensibles

## Test de la fonctionnalité

### Scénarios de test

1. **Test utilisateur non connecté** :
   - Aller sur `/products`
   - Vérifier que le bouton "Ajouter un produit" n'est pas visible

2. **Test utilisateur connecté (non-admin)** :
   - Se connecter avec un compte utilisateur normal
   - Aller sur `/products`
   - Vérifier que le bouton n'est pas visible
   - Vérifier que le message informatif est affiché

3. **Test administrateur** :
   - Se connecter avec le compte admin (`admin` / `admin123`)
   - Aller sur `/products`
   - Vérifier que le bouton "Ajouter un produit" est visible
   - Cliquer sur le bouton et vérifier que le dialogue s'ouvre

4. **Test de déconnexion** :
   - Se connecter en tant qu'admin
   - Vérifier que le bouton est visible
   - Se déconnecter
   - Vérifier que le bouton disparaît

## Évolutions futures

- [ ] Ajouter des permissions plus granulaires (lecture seule, modification, suppression)
- [ ] Implémenter un système de rôles multiples
- [ ] Ajouter des logs d'audit pour les actions d'administration
- [ ] Créer une interface de gestion des utilisateurs et rôles

## Notes importantes

- Cette restriction s'applique uniquement à l'interface utilisateur
- L'API backend doit également implémenter des vérifications de sécurité
- Les utilisateurs peuvent toujours voir et acheter les produits
- Seule la fonction d'ajout de produits est restreinte
