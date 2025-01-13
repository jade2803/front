import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-vehicle-modal',
  templateUrl: './vehicle-modal.component.html',
  styleUrls: ['./vehicle-modal.component.css'],
})
export class VehicleModalComponent {
  vehicleForm: FormGroup;
  isEditMode: boolean;

  // Lista de marcas y modelos asociados
  carBrands = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan', 'BMW', 'Mercedes-Benz', 'Hyundai', 'Kia', 'Audi'];
  carModels: { [brand: string]: string[] } = {
    Toyota: ['Corolla', 'Camry', 'RAV4', 'Highlander', 'Prius'],
    Honda: ['Civic', 'Accord', 'CR-V', 'Pilot', 'Fit'],
    Ford: ['Focus', 'Fiesta', 'Mustang', 'Explorer', 'F-150'],
    Chevrolet: ['Spark', 'Malibu', 'Equinox', 'Tahoe', 'Silverado'],
    Nissan: ['Sentra', 'Altima', 'Rogue', 'Murano', 'Pathfinder'],
    BMW: ['Series 3', 'Series 5', 'X3', 'X5', 'Z4'],
    'Mercedes-Benz': ['C-Class', 'E-Class', 'GLC', 'GLE', 'S-Class'],
    Hyundai: ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Accent'],
    Kia: ['Rio', 'Forte', 'Sportage', 'Sorento', 'Optima'],
    Audi: ['A3', 'A4', 'Q3', 'Q5', 'A6'],
  };
  filteredModels: string[] = []; // Modelos filtrados según la marca seleccionada

  // Lista de colores comunes de autos
  carColors = ['Negro', 'Blanco', 'Gris', 'Azul', 'Rojo', 'Plateado', 'Verde', 'Amarillo', 'Naranja', 'Marrón'];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<VehicleModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!data.vehicle; // Determina si es edición o creación

    this.vehicleForm = this.fb.group({
      brand: [data.vehicle?.brand || '', Validators.required],
      model: [data.vehicle?.model || '', Validators.required],
      license_plate: [data.vehicle?.license_plate || '', [Validators.required, this.licensePlateValidator]], // Validador de placa
      rental_rate: [data.vehicle?.rental_rate || 0, [Validators.required, Validators.min(0)]],
      status: [data.vehicle?.status || 'Available', Validators.required],
      seats: [data.vehicle?.seats || 0, [Validators.required, Validators.min(1)]],
      doors: [data.vehicle?.doors || 0, [Validators.required, Validators.min(1)]],
      trunk_size: [data.vehicle?.trunk_size || 0, [Validators.required, Validators.min(1)]],
      color: [data.vehicle?.color || '', Validators.required],
      fuel_type: [data.vehicle?.fuel_type || 'Extra', Validators.required],
      imageUrl: [data.vehicle?.imageUrl || '', Validators.required],
    });

    // Filtrar modelos si se está editando un vehículo
    if (this.isEditMode && data.vehicle?.brand) {
      this.filteredModels = this.carModels[data.vehicle.brand] || [];
    }
  }

  // Maneja el cambio de marca seleccionada
  onBrandChange(selectedBrand: string) {
    this.filteredModels = this.carModels[selectedBrand] || [];
    this.vehicleForm.get('model')?.reset(); // Resetear el modelo si cambia la marca
  }

  // Validador de placa para Ecuador (plano de ejemplo)
  licensePlateValidator(control: any) {
    const placaPattern = /^[A-Za-z]{3}-\d{4}$/; // Ejemplo de patrón: ABC-1234
    if (control.value && !placaPattern.test(control.value)) {
      return { invalidLicensePlate: true };
    }
    return null;
  }

  onSubmit() {
    if (this.vehicleForm.valid) {
      this.dialogRef.close(this.vehicleForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}

