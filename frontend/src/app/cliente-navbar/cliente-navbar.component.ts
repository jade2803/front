import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-navbar',
  templateUrl: './cliente-navbar.component.html',
  styleUrls: ['./cliente-navbar.component.css']
})
export class ClienteNavbarComponent {

  constructor(private router: Router) {}

  navigateToBranchesS() {
    console.log('Intentando navegar a /sucursales');
    this.router.navigate(['/sucursales']);
  }

  navigateToBranchesC() {
    console.log('Intentando navegar a /catalog');
    this.router.navigate(['/catalog']);
  }

  navigateToHistorial() {
    console.log('Intentando navegar a /historial');
    this.router.navigate(['/historial']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}
