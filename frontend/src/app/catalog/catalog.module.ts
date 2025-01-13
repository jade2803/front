import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleCatalogComponent } from './vehicle-catalog/vehicle-catalog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [VehicleCatalogComponent],
  imports: [CommonModule,FormsModule],
  exports: [VehicleCatalogComponent]
})
export class CatalogModule { }
