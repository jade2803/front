import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleModalComponent } from './vehicle-modal/vehicle-modal.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [VehicleListComponent, VehicleModalComponent, VehicleListComponent], // Declaramos el componente
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    RouterModule,
  ],
  exports: [VehicleListComponent,VehicleModalComponent, VehicleListComponent] // Exponemos el componente si es necesario
})
export class VehiclesModule {}
