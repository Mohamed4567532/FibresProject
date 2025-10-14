# Système d'Authentification - FibreOptique Pro

## Vue d'ensemble

Ce document décrit le système d'authentification implémenté pour l'application FibreOptique Pro. Le système permet de protéger l'interface d'administration et de gérer les sessions utilisateur.

## Fonctionnalités

### ✅ Authentification sécurisée
- Connexion avec nom d'utilisateur et mot de passe
- Hachage des mots de passe avec bcrypt
- Tokens JWT pour la gestion des sessions
- Option "Se souvenir de moi" pour les sessions persistantes

### ✅ Protection des routes
- Guard d'authentification pour protéger `/admin`
- Redirection automatique vers la page de connexion
- Vérification des rôles utilisateur

### ✅ Interface utilisateur
- Page de connexion moderne et responsive
- Indicateurs d'état de connexion dans le header
- Bouton de déconnexion accessible
- Messages d'erreur informatifs

## Utilisation

### Identifiants par défaut

Un utilisateur administrateur est créé automatiquement au premier démarrage :

- **Nom d'utilisateur** : `admin`
- **Mot de passe** : `admin123`
- **Rôle** : `admin`

⚠️ **Important** : Changez ces identifiants en production !

### Accès à l'interface admin

1. Naviguez vers `/login` ou cliquez sur "Connexion" dans le header
2. Entrez vos identifiants administrateur
3. Cochez "Se souvenir de moi" si vous voulez rester connecté
4. Cliquez sur "Se connecter"
5. Vous serez redirigé vers `/admin` si la connexion réussit

### Déconnexion

- Cliquez sur "Déconnexion" dans le header (desktop)
- Ou utilisez le bouton "Déconnexion" dans l'interface admin
- Ou utilisez le menu mobile sur les appareils mobiles

## Architecture technique

### Frontend (Angular)

#### Composants
- `LoginComponent` : Page de connexion
- `AuthGuard` : Protection des routes
- `AuthService` : Gestion de l'authentification

#### Services
- `AuthService` : Service principal d'authentification
  - Gestion des tokens JWT
  - Stockage sécurisé des données utilisateur
  - État d'authentification réactif

#### Routes protégées
```typescript
{ 
  path: 'admin', 
  component: AdminComponent,
  canActivate: [AuthGuard]
}
```

### Backend (Node.js/Express)

#### Routes d'authentification
- `POST /api/auth/login` : Connexion
- `POST /api/auth/logout` : Déconnexion
- `POST /api/auth/refresh` : Rafraîchissement du token
- `GET /api/auth/verify` : Vérification du token
- `GET /api/auth/profile` : Profil utilisateur

#### Base de données
- Table `users` avec les champs :
  - `id`, `username`, `email`, `password`
  - `role` (admin/user), `active`
  - `created_at`, `updated_at`, `last_login`

#### Sécurité
- Mots de passe hachés avec bcrypt
- Tokens JWT avec expiration
- Middleware d'authentification
- Validation des données

## Configuration

### Variables d'environnement

Créez un fichier `.env` dans le dossier `backend/` :

```env
# Base de données MySQL
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=fibre_db

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=24h
```

### Démarrage

1. **Backend** :
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Frontend** :
   ```bash
   npm install
   ng serve
   ```

## Sécurité

### Recommandations de production

1. **Changez le secret JWT** :
   ```env
   JWT_SECRET=un-secret-très-long-et-complexe
   ```

2. **Changez les identifiants par défaut** :
   - Connectez-vous avec `admin/admin123`
   - Créez un nouvel utilisateur admin
   - Supprimez l'utilisateur par défaut

3. **Utilisez HTTPS** en production

4. **Configurez CORS** correctement pour votre domaine

5. **Implémentez la limitation de taux** (rate limiting)

### Gestion des erreurs

Le système gère automatiquement :
- Tokens expirés
- Sessions invalides
- Erreurs de connexion
- Redirections appropriées

## Dépannage

### Problèmes courants

1. **Erreur de connexion à la base de données** :
   - Vérifiez les paramètres MySQL
   - Assurez-vous que MySQL est démarré

2. **Token invalide** :
   - Vérifiez le secret JWT
   - Vérifiez l'expiration du token

3. **Redirection en boucle** :
   - Vérifiez la configuration des routes
   - Vérifiez le guard d'authentification

### Logs

Les erreurs sont loggées dans la console du serveur backend. Activez les logs détaillés en développement.

## Évolutions futures

- [ ] Gestion des rôles multiples
- [ ] Réinitialisation de mot de passe
- [ ] Authentification à deux facteurs
- [ ] Audit des connexions
- [ ] Interface de gestion des utilisateurs
- [ ] Intégration OAuth (Google, Facebook, etc.)

## Support

Pour toute question ou problème, consultez les logs du serveur et vérifiez la configuration de la base de données.
