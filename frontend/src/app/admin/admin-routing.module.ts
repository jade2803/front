import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VehicleListComponent } from '../vehicles/vehicle-list/vehicle-list.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { EmployeeRegisterComponent } from './employee-register/employee-register.component';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { MantenimientoComponent } from './mantenimiento/mantenimiento.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  {
    path: '', // Ruta raíz del módulo admin
    component: AdminLayoutComponent, // Layout principal del administrador
    children: [
      { path: '', component: DashboardComponent }, // Ruta para el Dashboard
      { path: 'vehicles', component: VehicleListComponent }, // Ruta para la lista de vehículos
      { path: 'employees', component: EmployeeRegisterComponent },
      { path: 'list', component: EmployeeManagementComponent},
      { path: 'maintenance', component: MantenimientoComponent }, 
      { path: 'reports', component: ReportsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
