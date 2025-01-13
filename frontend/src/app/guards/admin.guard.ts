import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthGuard } from './auth.guard'; // Importa el AuthGuard
import { Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private authGuard: AuthGuard) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isAuthenticated = this.authGuard.canActivate(route); // Pasa 'route' aquí

    if (!isAuthenticated) {
      return false; // Si no está autenticado, bloquea el acceso
    }

    const role = localStorage.getItem('role');
    if (role === 'Administrator') {
      return true; // Si es administrador, permite el acceso
    } else {
      this.router.navigate(['/login']); // Si no es administrador, lo redirige al login
      return false;
    }
  }
}

