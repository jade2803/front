import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.css']
})
export class EmployeeRegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  role: string = 'Employee'; // Valor predeterminado, se puede cambiar a "Admin" o "Employee"

  constructor(private userService: UserService, private router: Router) {}

  onRegister() {
    const employeeData = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role // El rol es seleccionado por el administrador
    };

    // Llamada al servicio de registro
    this.userService.registerUser(employeeData).subscribe(
      (response) => {
        alert('Empleado registrado exitosamente');
        this.router.navigate(['/admin/employees']); // Redirige a la página de empleados después del registro
      },
      (error) => {
        alert('Error al registrar el empleado');
        console.error('Error de registro:', error);
      }
    );
  }
}
