import { Component, OnInit } from '@angular/core';
import { RentalsService } from '../rentals/rentals.service';
import { MatDialog } from '@angular/material/dialog';
import { ReturnModalComponent } from './return-modal/return-modal.component';

@Component({
  selector: 'app-returns',
  templateUrl: './returns.component.html',
  styleUrls: ['./returns.component.css']
})
export class ReturnsComponent implements OnInit {
  reservations: any[] = [];
  displayedColumns: string[] = ['customerName', 'vehicleDetails', 'returnDate', 'status', 'action'];
  dataSource: any[] = [];
  isLoading = true;

  constructor(
    private rentalsService: RentalsService, 
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchReservations();
  }

  fetchReservations(): void {
    this.rentalsService.getReservations().subscribe(
      (data) => {
        this.reservations = data.filter(item => item.status === 'Confirmed');
        this.dataSource = this.reservations;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al obtener reservas:', error);
        this.isLoading = false;
      }
    );
  }

  openReturnModal(reservation: any): void {
    const dialogRef = this.dialog.open(ReturnModalComponent, {
      width: '400px',
      data: {
        id: reservation.id,
        initialReturnDate: this.toLocalDateTime(reservation.end_date) // Conversión a local
      }
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchReservations(); // Actualizar la tabla después de cerrar el modal
      }
    });
  }  
  
  // Método para convertir fechas a formato local compatible con datetime-local
  toLocalDateTime(utcDate: string): string {
    const date = new Date(utcDate); // Crear una fecha en UTC
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000); // Ajustar al local
    return localDate.toISOString().slice(0, 16); // Formato compatible con datetime-local
  }
  
}
