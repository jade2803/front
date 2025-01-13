import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router) {}

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken'); // Retorna true si hay un token de acceso
  }

  logout() {
    // Eliminar el token de acceso y el rol del usuario
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role');

    // Redirigir al login
    this.router.navigate(['/login']);
  }
}
