import { Component, OnInit } from '@angular/core';
import { RentalsService } from './rentals.service';

@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.component.html',
  styleUrls: ['./rentals.component.css']
})
export class RentalsComponent implements OnInit {
  displayedColumns: string[] = ['customerName', 'vehicleDetails', 'startDate', 'endDate', 'status'];
  dataSource: any[] = []; // Inicializa como un array vacío
  isLoading = true;

  constructor(private rentalsService: RentalsService) {}

  ngOnInit(): void {
    this.fetchReservations();
  }

  fetchReservations(): void {
    this.rentalsService.getReservations().subscribe(
      (data) => {
        console.log('Reservaciones recibidas:', data); // Verifica los datos en la consola
        this.dataSource = data; // Asigna los datos directamente al dataSource
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al obtener reservaciones:', error);
        this.isLoading = false;
      }
    );
  }
}
