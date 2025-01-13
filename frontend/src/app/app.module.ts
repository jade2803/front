import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; // Importa el HttpClientModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserService } from './services/user.service';
import { LoginComponent } from './login/login.component';
import { CatalogModule } from './catalog/catalog.module';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VehiclesModule } from './vehicles/vehicles.module';
import { BranchesModule } from './branches/branches.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { ClienteNavbarModule } from './cliente-navbar/cliente-navbar.module';
import { EmployeeModule } from './employee/employee.module';
import { EmployeeManagementComponent } from './admin/employee-management/employee-management.component';
import { VehicleDetailsComponent } from './catalog/vehicle-details/vehicle-details.component';
import { AuthInterceptor } from './guards/auth.interceptor';
import { ReservationModalComponent } from './catalog/reservation-modal/reservation-modal.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReturnModalComponent } from './employee/returns/return-modal/return-modal.component';
import { HistorialComponent } from './historial/historial.component';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InvoiceModalComponent } from './components/invoice-modal/invoice-modal.component';
import { MantenimientoComponent } from './admin/mantenimiento/mantenimiento.component';
import { MaintenanceInspectionModalComponent } from './admin/mantenimiento/maintenance-inspection-modal/maintenance-inspection-modal.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { ReportsComponent } from './admin/reports/reports.component';

@NgModule({
  declarations: [
    AppComponent,
    UserRegisterComponent,
    LoginComponent,
    MainLayoutComponent,
    EmployeeManagementComponent,
    VehicleDetailsComponent,
    ReservationModalComponent,
    ReturnModalComponent,
    HistorialComponent,
    InvoiceModalComponent,
    MantenimientoComponent,
    MaintenanceInspectionModalComponent,
    PaymentSuccessComponent,
    ReportsComponent,
  ],
  imports: [
    CommonModule, 
    BrowserModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,   // Asegúrate de importar MatDatepickerModule
    MatNativeDateModule,
    MatTableModule,
    MatProgressSpinnerModule, 
    HttpClientModule,
    AppRoutingModule,
    CatalogModule, 
    VehiclesModule,
    ClienteNavbarModule,
    FormsModule,
    BranchesModule,
    GoogleMapsModule,
    BrowserAnimationsModule,
    EmployeeModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
  providers: [UserService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }

