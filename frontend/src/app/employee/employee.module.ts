import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeLayoutComponent } from './employee-layout/employee-layout.component';
import { RentalsComponent } from './rentals/rentals.component';
import { ReturnsComponent } from './returns/returns.component';
import { AvailabilityComponent } from './availability/availability.component';
import { BillingComponent } from './billing/billing.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EmployeeLayoutComponent,
    RentalsComponent,
    ReturnsComponent,
    AvailabilityComponent,
    BillingComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MatTableModule, 
    FormsModule,
    MatProgressSpinnerModule
  ]
})
export class EmployeeModule { }
