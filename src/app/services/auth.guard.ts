import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return this.authService.authState$.pipe(
      take(1),
      map(authState => {
        if (authState.isAuthenticated && authState.user) {
          // Vérifier si l'utilisateur a le rôle admin
          if (authState.user.role === 'admin') {
            return true;
          } else {
            // Rediriger vers la page d'accueil si l'utilisateur n'est pas admin
            this.router.navigate(['/home']);
            return false;
          }
        } else {
          // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
          this.router.navigate(['/login'], { 
            queryParams: { returnUrl: state.url } 
          });
          return false;
        }
      })
    );
  }
}