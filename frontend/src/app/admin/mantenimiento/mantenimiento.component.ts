interface InspectionItem {
  label: string;
  status: string;
  cost: number;
}

import { Component, OnInit } from '@angular/core';
import { CatalogService } from 'src/app/catalog/catalog.service';
import { MaintenanceInspectionModalComponent } from './maintenance-inspection-modal/maintenance-inspection-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';  // Para mostrar mensajes de éxito o error

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.css'],
})
export class MantenimientoComponent implements OnInit {
  vehicles: any[] = [];
  inspections: InspectionItem[] = [];  // Aquí definimos el tipo de inspección

  constructor(
    private catalogService: CatalogService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar  // Agregado para mostrar notificaciones
  ) {}

  ngOnInit(): void {
    this.fetchMaintenanceVehicles();
  }

  openInspectionModal(vehicle: any): void {
    const dialogRef = this.dialog.open(MaintenanceInspectionModalComponent, {
      width: '600px',
      data: { vehicle },  // Pasamos el vehículo
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Inspección completada:', result);
        this.saveMaintenanceRecord(vehicle, result);  // Ahora pasamos el vehicle y los resultados
      }
    });
  }
  
  saveMaintenanceRecord(vehicle: any, inspections: InspectionItem[]): void {  // Ahora pasamos vehicle como parámetro
    if (vehicle && inspections && inspections.length > 0) {
      const vehicleId = vehicle.id;  // Usamos el vehicle recibido como parámetro
      const maintenanceData = {
        vehicle_id: vehicleId,
        aceite_motor_filtro: inspections.find(item => item.label === 'Aceite de motor y filtro')?.status,
        filtro_aire: inspections.find(item => item.label === 'Filtro de aire')?.status,
        llantas: inspections.find(item => item.label === 'Llantas')?.status,
        alineacion: inspections.find(item => item.label === 'Alineación')?.status,
        amortiguadores: inspections.find(item => item.label === 'Amortiguadores')?.status,
        refrigerante: inspections.find(item => item.label === 'Refrigerante')?.status,
        bateria: inspections.find(item => item.label === 'Batería')?.status,
        faros: inspections.find(item => item.label === 'Faros')?.status,
        liquido_direccion_hidraulica: inspections.find(item => item.label === 'Líquido de dirección hidráulica')?.status,
        liquido_frenos: inspections.find(item => item.label === 'Líquido de frenos')?.status,
        correas: inspections.find(item => item.label === 'Correas')?.status,
        liquido_transmision: inspections.find(item => item.label === 'Líquido de transmisión')?.status,
        total_gastos: inspections.reduce((sum, item) => sum + (item.cost || 0), 0),  // Calcular el costo total
      };
  
      // Ahora, envíalo al servicio backend
      this.catalogService.saveMaintenanceRecord(maintenanceData).subscribe(
        (response) => {
          console.log('Registro de mantenimiento guardado:', response);
          this.snackBar.open('Mantenimiento guardado con éxito', 'Cerrar', {
            duration: 3000,
          });
          this.fetchMaintenanceVehicles();
        },
        (error) => {
          console.error('Error al guardar el mantenimiento', error);
          this.snackBar.open('Error al guardar el mantenimiento', 'Cerrar', {
            duration: 3000,
          });
        }
      );
    } else {
      console.error('Datos del vehículo no válidos o incompletos');
      this.snackBar.open('Error: Datos del vehículo no válidos', 'Cerrar', {
        duration: 3000,
      });
    }
  }  

  fetchMaintenanceVehicles(): void {
    this.catalogService.getVehicles().subscribe(
      (data) => {
        this.vehicles = data.filter((vehicle: any) => vehicle.status == 'Maintenance');
      },
      (error) => {
        console.error('Error fetching vehicles', error);
      }
    );
  }
}
