import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service'; // Asegúrate de que el path sea correcto

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  role: string = 'Customer'; // Default role

  alertMessage: string = '';
  alertType: 'success' | 'error' | '' = '';

  get isNameValid(): boolean {
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(this.name);
  }

  get isEmailValid(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }

  constructor(private userService: UserService, private router: Router) {}

  onRegister() {
    if (!this.isNameValid || !this.isEmailValid || !this.password) {
      this.showAlert('Por favor, complete todos los campos correctamente.', 'error');
      return;
    }

    const userData = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role
    };

    this.userService.registerUser(userData).subscribe(
      (response) => {
        this.showAlert('Usuario registrado exitosamente', 'success');
        setTimeout(() => this.router.navigate(['/login']), 2000); // Redirige después de 2 segundos
      },
      (error) => {
        this.showAlert('Error al registrar el usuario', 'error');
        console.error('Error de registro:', error);
      }
    );
  }

  showAlert(message: string, type: 'success' | 'error') {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => {
      this.alertMessage = '';
      this.alertType = '';
    }, 4000); // Ocultar mensaje después de 4 segundos
  }
}
