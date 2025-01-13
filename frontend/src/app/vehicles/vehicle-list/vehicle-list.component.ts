import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VehiclesService } from '../vehicles.service';
import { VehicleModalComponent } from '../vehicle-modal/vehicle-modal.component';
import { Vehicle } from '../vehicle.interface';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css'],
})
export class VehicleListComponent implements OnInit {
  vehicles: any[] = [];

  constructor(private vehiclesService: VehiclesService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.vehiclesService.getVehicles().subscribe(
      (data) => {
        this.vehicles = data.map((vehicle: Vehicle) => {
          // Si el estado del vehículo es "Mantenimiento", la disponibilidad será false
          if (vehicle.status === 'Mantenimiento') {
            vehicle.available = false;  // Establecer disponibilidad a false
          }
          return vehicle;
        });
      },
      (error) => {
        console.error('Error al cargar los vehículos', error);
      }
    );
  }
  
  onAddVehicle(): void {
    const dialogRef = this.dialog.open(VehicleModalComponent, {
      width: '500px',
      data: { vehicle: null },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.vehiclesService.addVehicle(result).subscribe(() => {
          alert('Vehículo agregado exitosamente');
          this.loadVehicles();
        });
      }
    });
  }

  onEditVehicle(vehicle: any): void {
    const dialogRef = this.dialog.open(VehicleModalComponent, {
      width: '500px',
      data: { vehicle }
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Aquí enviamos el estado actualizado al backend
        this.vehiclesService.updateVehicle(vehicle.id, result).subscribe(() => {
          alert('Vehículo actualizado exitosamente');
          this.loadVehicles(); // Recargar la lista de vehículos
        });
      }
    });
  }  

  onDeleteVehicle(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este vehículo?')) {
      this.vehiclesService.deleteVehicle(id).subscribe(
        () => {
          alert('Vehículo eliminado exitosamente');
          this.loadVehicles(); // Recargar la lista
        },
        (error) => {
          console.error('Error al eliminar el vehículo', error);
          alert('Error al eliminar el vehículo');
        }
      );
    }
  }
}
