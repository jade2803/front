import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa el Router de Angular

@Component({
  selector: 'app-employee-layout',
  templateUrl: './employee-layout.component.html',
  styleUrls: ['./employee-layout.component.css']
})
export class EmployeeLayoutComponent {
  // Inyecta el Router en el constructor
  constructor(private router: Router) {}

  // Método para cerrar sesión
  logout() {
    localStorage.removeItem('accessToken'); // Elimina el token de acceso
    localStorage.removeItem('role'); // Elimina el rol, si es necesario
    this.router.navigate(['/login']); // Redirige al login
  }
}
