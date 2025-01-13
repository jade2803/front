import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CatalogService } from '../catalog.service';
import { ReservationModalComponent } from '../reservation-modal/reservation-modal.component';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css'],
})
export class VehicleDetailsComponent implements OnInit {
  vehicle: any;

  constructor(
    private route: ActivatedRoute,
    private catalogService: CatalogService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const vehicleId = this.route.snapshot.paramMap.get('id');
    if (vehicleId) {
      this.catalogService.getVehicleById(vehicleId).subscribe(
        (data) => {
          this.vehicle = data;
        },
        (error) => {
          console.error('Error fetching vehicle details', error);
        }
      );
    }
  }

  openReservationModal(): void {
    const dialogRef = this.dialog.open(ReservationModalComponent, {
      width: '400px',
      data: { vehicle: this.vehicle }, // El vehículo que se pasa al modal
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Reservation data:', result); // Verifica los datos que se están enviando después de que el modal se cierre
        this.catalogService.createReservation(result).subscribe(
          () => alert('Reservación creada con éxito'),
          (error) => console.error('Error creando reservación', error)
        );
      }
    });
  }  
}
