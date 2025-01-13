import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';  // Asegúrate de que el path sea correcto

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  alertMessage: string = '';
  alertType: 'success' | 'error' | '' = ''; // Define el tipo de alerta

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    // Verifica si el token está presente al cargar el componente de Login
    const token = localStorage.getItem('accessToken');
    if (token) {
      // Si ya hay un token, redirige al catálogo o a la página correspondiente
      this.router.navigate(['/catalog']); // O a la página que prefieras
    }
  }

  onLogin() {
    const loginData = {
      email: this.email,
      password: this.password
    };

    this.userService.loginUser(loginData).subscribe(
      (response) => {
        this.showAlert('Inicio de sesión exitoso', 'success');
        
        // Guardar el token, el rol y el ID del usuario en localStorage
        localStorage.setItem('accessToken', response.accessToken); // Guardar token
        localStorage.setItem('role', response.role); // Guardar rol del usuario
        localStorage.setItem('userId', response.userId); // Guardar ID del usuario
        
        // Verificar si el userId se guardó correctamente
        console.log('userId guardado en localStorage:', localStorage.getItem('userId'));

        // Redirigir según el rol
        const role = response.role;
        setTimeout(() => {
          if (role === 'Administrator') {
            this.router.navigate(['/admin']);
          } else if (role === 'Customer') {
            this.router.navigate(['/catalog']);
          } else if (role === 'Employee') {
            this.router.navigate(['/employee']);
          } else {
            this.showAlert('Rol desconocido', 'error');
          }
        }, 2000); // Esperar 2 segundos antes de redirigir
      },
      (error) => {
        this.showAlert('Credenciales inválidas', 'error');
        console.error('Error de login:', error);
      }
    );
  }

  showAlert(message: string, type: 'success' | 'error') {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => {
      this.alertMessage = '';
      this.alertType = '';
    }, 4000); // Ocultar alerta después de 4 segundos
  }
}
