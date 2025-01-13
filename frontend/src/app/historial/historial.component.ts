import { Component, OnInit } from '@angular/core';
import { RentalsService } from '../employee/rentals/rentals.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  displayedColumns: string[] = ['vehicle', 'startDate', 'endDate', 'status', 'action']; // Agrega 'action'
  dataSource: any[] = [];
  isLoading = true;

  constructor(private rentalsService: RentalsService) {}

  ngOnInit(): void {
    this.fetchReservations();
  }

  fetchReservations(): void {
    const userId = localStorage.getItem('userId'); // Supongamos que el ID está almacenado
    this.rentalsService.getReservationsByUserId(userId).subscribe(
      (data) => {
        this.dataSource = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al cargar el historial:', error);
        this.isLoading = false;
      }
    );
  }

  // Método para mostrar la confirmación y cancelar la reserva
  confirmCancel(reservation: any): void {
    const confirmation = window.confirm('¿Estás seguro de cancelar esta reserva?');
    if (confirmation) {
      this.cancelReservation(reservation);
    }
  }

  // Método para cancelar la reserva y actualizar su estado
  cancelReservation(reservation: any): void {
    this.rentalsService.cancelReservation(reservation.id).subscribe(
      () => {
        // Actualizamos el estado en la tabla
        reservation.status = 'Cancelled';
      },
      (error) => {
        console.error('Error al cancelar la reserva:', error);
      }
    );
  }  
}
