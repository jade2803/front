import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isAuthenticated = !!localStorage.getItem('accessToken');
    const userRole = localStorage.getItem('role'); // Obtener el rol desde el almacenamiento local

    console.log('Token presente:', isAuthenticated);
    console.log('Rol del usuario:', userRole);
    console.log('Rol esperado para la ruta:', route.data['role']);

    if (!isAuthenticated) {
      this.router.navigate(['/login']); // Si no está autenticado, redirige al login
      return false;
    }

    // Verificar si el rol del usuario es el que se espera para la ruta
    const requiredRole = route.data['role']; // Obtener el rol esperado de la ruta

    if (requiredRole && userRole !== requiredRole) {
      console.log('El rol no coincide. Redirigiendo al login.');
      this.router.navigate(['/login']); // Si el rol no coincide, redirige al login
      return false;
    }

    return true; // Si está autenticado y el rol es adecuado, permite el acceso
  }
}

