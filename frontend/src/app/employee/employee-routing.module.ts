import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeLayoutComponent } from './employee-layout/employee-layout.component';
import { RentalsComponent } from './rentals/rentals.component';
import { ReturnsComponent } from './returns/returns.component';
import { AvailabilityComponent } from './availability/availability.component';
import { BillingComponent } from './billing/billing.component';

const routes: Routes = [
  {
    path: '', // Ruta raíz para el empleado
    component: EmployeeLayoutComponent,
    children: [
      { path: 'rentals', component: RentalsComponent }, // Gestión de Alquileres
      { path: 'returns', component: ReturnsComponent }, // Gestión de Devoluciones
      { path: 'availability', component: AvailabilityComponent }, // Consulta de Disponibilidad
      { path: 'billing', component: BillingComponent }, // Facturación y Pagos
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
