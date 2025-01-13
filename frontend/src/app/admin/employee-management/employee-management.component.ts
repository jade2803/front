import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeModalComponent } from '../employee-modal/employee-modal.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.css'], 
})
export class EmployeeManagementComponent implements OnInit {
  employees: any[] = []; // Almacena la lista de usuarios

  constructor(private userService: UserService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadEmployees(); // Cargar los empleados al iniciar el componente
  }

  loadEmployees(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.employees = data;
      },
      (error) => {
        console.error('Error al cargar empleados:', error);
      }
    );
  }
  
  onAddEmployee(): void {
    const dialogRef = this.dialog.open(EmployeeModalComponent, {
      width: '500px',
      data: { employee: null }, // Nuevo registro
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.registerUser(result).subscribe(
          () => {
            alert('Empleado agregado exitosamente');
            this.loadEmployees();
          },
          (error) => {
            console.error('Error al agregar empleado:', error);
          }
        );
      }
    });
  }

  onEditEmployee(employee: any): void {
    const dialogRef = this.dialog.open(EmployeeModalComponent, {
      width: '500px',
      data: { employee }, // Pasamos el empleado a editar
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.updateUser(employee.id, result).subscribe(
          () => {
            alert('Empleado actualizado exitosamente');
            this.loadEmployees();
          },
          (error) => {
            console.error('Error al actualizar empleado:', error);
          }
        );
      }
    });
  }

  onDeleteUser(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.userService.deleteUser(id).subscribe(
        () => {
          alert('Usuario eliminado exitosamente');
          this.loadEmployees(); // Recargar la lista después de eliminar
        },
        (error) => {
          console.error('Error al eliminar el usuario', error);
          alert('Error al eliminar el usuario');
        }
      );
    }
  }
  
  
}

