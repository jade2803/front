import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegisterComponent } from './user-register/user-register.component';
import { LoginComponent } from './login/login.component';
import { VehicleCatalogComponent } from './catalog/vehicle-catalog/vehicle-catalog.component';
import { VehicleListComponent } from './vehicles/vehicle-list/vehicle-list.component';
import { AuthGuard } from './guards/auth.guard'; // Importar AuthGuard
import { BranchesComponent } from './branches/branches.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { VehicleDetailsComponent } from './catalog/vehicle-details/vehicle-details.component';
import { HistorialComponent } from './historial/historial.component';
import { BillingComponent } from './employee/billing/billing.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: UserRegisterComponent },
  
  // Rutas con el layout principal
  {
    path: '',
    component: MainLayoutComponent, // El layout donde debería estar el navegador
    children: [
      { path: 'catalog', component: VehicleCatalogComponent, canActivate: [AuthGuard], data: { role: 'Customer' } },
      { path: 'vehicles', component: VehicleListComponent, canActivate: [AuthGuard], data: { role: 'Administrator' } },
      { path: 'sucursales', component: BranchesComponent, canActivate: [AuthGuard], data: { role: 'Customer' } },
      { path: 'catalog/details/:id', component: VehicleDetailsComponent, canActivate: [AuthGuard], data: { role: 'Customer' } },
      { path: 'historial', component: HistorialComponent, canActivate: [AuthGuard], data: { role: 'Customer' } }, // Nueva ruta  
    ]
  },

  // Ruta para el módulo admin
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard], data: { role: 'Administrator' } },

  // Ruta para el módulo empleado
  { path: 'employee', loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule), canActivate: [AuthGuard], data: { role: 'Employee' } },

  // Ruta para no encontrados
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
