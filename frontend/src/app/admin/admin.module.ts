import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component'; // Importar correctamente
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { EmployeeRegisterComponent } from './employee-register/employee-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeModalComponent } from './employee-modal/employee-modal.component';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    AdminLayoutComponent,
    EmployeeRegisterComponent,
    EmployeeModalComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule, // Para formularios Template-Driven
    ReactiveFormsModule, // IMPORTANTE: Para formularios Reactivos
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ]
})
export class AdminModule {}
