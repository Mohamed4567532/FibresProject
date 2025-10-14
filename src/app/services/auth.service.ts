import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface User {
  id: number;
  username: string;
  email?: string;
  role: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:3000/api/auth';
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';
  private readonly REMEMBER_KEY = 'remember_me';

  private authStateSubject = new BehaviorSubject<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null
  });

  public authState$ = this.authStateSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.initializeAuthState();
  }

  /**
   * Initialise l'état d'authentification au démarrage
   */
  private initializeAuthState(): void {
    const token = this.getStoredToken();
    const user = this.getStoredUser();

    if (token && user) {
      this.authStateSubject.next({
        isAuthenticated: true,
        user,
        token
      });
    }
  }

  /**
   * Connexion de l'utilisateur
   */
  login(username: string, password: string, rememberMe: boolean = false): Observable<LoginResponse> {
    const loginData = {
      username,
      password,
      rememberMe
    };

    return this.http.post<LoginResponse>(`${this.API_URL}/login`, loginData).pipe(
      map(response => {
        if (response.success && response.user && response.token) {
          this.setAuthState(response.user, response.token, rememberMe);
        }
        return response;
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => ({
          message: error.error?.message || 'Erreur de connexion'
        }));
      })
    );
  }

  /**
   * Déconnexion de l'utilisateur
   */
  logout(): Observable<any> {
    return new Observable(observer => {
      // Appel au backend pour invalider le token (optionnel)
      const token = this.getStoredToken();
      if (token) {
        this.http.post(`${this.API_URL}/logout`, {}, {
          headers: this.getAuthHeaders()
        }).subscribe({
          next: () => {
            console.log('Logout successful');
            this.performLogout();
            observer.next({ success: true, message: 'Déconnexion réussie' });
            observer.complete();
          },
          error: (error) => {
            console.error('Logout error:', error);
            // Même en cas d'erreur, on déconnecte localement
            this.performLogout();
            observer.next({ success: true, message: 'Déconnexion locale réussie' });
            observer.complete();
          }
        });
      } else {
        // Pas de token, déconnexion locale uniquement
        this.performLogout();
        observer.next({ success: true, message: 'Déconnexion réussie' });
        observer.complete();
      }
    });
  }

  /**
   * Effectue la déconnexion locale
   */
  private performLogout(): void {
    // Nettoyer le stockage local
    this.clearAuthData();
    
    // Mettre à jour l'état
    this.authStateSubject.next({
      isAuthenticated: false,
      user: null,
      token: null
    });

    // Rediriger vers la page de connexion
    this.router.navigate(['/login']);
  }

  /**
   * Vérifier si l'utilisateur est authentifié
   */
  isAuthenticated(): boolean {
    const token = this.getStoredToken();
    const user = this.getStoredUser();
    return !!(token && user && !this.isTokenExpired(token));
  }

  /**
   * Obtenir l'utilisateur actuel
   */
  getCurrentUser(): User | null {
    return this.authStateSubject.value.user;
  }

  /**
   * Obtenir le token d'authentification
   */
  getToken(): string | null {
    return this.authStateSubject.value.token;
  }

  /**
   * Vérifier si l'utilisateur a un rôle spécifique
   */
  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user ? user.role === role : false;
  }

  /**
   * Vérifier si l'utilisateur est administrateur
   */
  isAdmin(): boolean {
    return this.hasRole('admin');
  }

  /**
   * Obtenir les headers d'authentification pour les requêtes HTTP
   */
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    });
  }

  /**
   * Rafraîchir le token d'authentification
   */
  refreshToken(): Observable<LoginResponse> {
    const token = this.getStoredToken();
    if (!token) {
      return throwError(() => ({ message: 'No token to refresh' }));
    }

    return this.http.post<LoginResponse>(`${this.API_URL}/refresh`, {}, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(response => {
        if (response.success && response.token) {
          this.updateToken(response.token);
        }
        return response;
      }),
      catchError(error => {
        console.error('Token refresh error:', error);
        this.logout(); // Déconnecter si le refresh échoue
        return throwError(() => ({
          message: 'Session expirée. Veuillez vous reconnecter.'
        }));
      })
    );
  }

  /**
   * Définir l'état d'authentification
   */
  private setAuthState(user: User, token: string, rememberMe: boolean): void {
    // Stocker les données
    this.storeAuthData(user, token, rememberMe);

    // Mettre à jour l'état
    this.authStateSubject.next({
      isAuthenticated: true,
      user,
      token
    });
  }

  /**
   * Stocker les données d'authentification
   */
  private storeAuthData(user: User, token: string, rememberMe: boolean): void {
    if (rememberMe) {
      // Stockage persistant
      localStorage.setItem(this.TOKEN_KEY, token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      localStorage.setItem(this.REMEMBER_KEY, 'true');
    } else {
      // Stockage de session
      sessionStorage.setItem(this.TOKEN_KEY, token);
      sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
  }

  /**
   * Récupérer le token stocké
   */
  private getStoredToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY) || sessionStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Récupérer l'utilisateur stocké
   */
  private getStoredUser(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY) || sessionStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  /**
   * Mettre à jour le token
   */
  private updateToken(newToken: string): void {
    const rememberMe = localStorage.getItem(this.REMEMBER_KEY) === 'true';
    
    if (rememberMe) {
      localStorage.setItem(this.TOKEN_KEY, newToken);
    } else {
      sessionStorage.setItem(this.TOKEN_KEY, newToken);
    }

    // Mettre à jour l'état
    const currentState = this.authStateSubject.value;
    this.authStateSubject.next({
      ...currentState,
      token: newToken
    });
  }

  /**
   * Nettoyer les données d'authentification
   */
  private clearAuthData(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.REMEMBER_KEY);
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.USER_KEY);
  }

  /**
   * Vérifier si le token est expiré (basique)
   */
  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch (error) {
      return true; // Considérer comme expiré si on ne peut pas le décoder
    }
  }
}