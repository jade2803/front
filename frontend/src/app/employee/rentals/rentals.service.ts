import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RentalsService {
  private apiUrl = 'http://localhost:8080/reservations'; // Ajusta la URL según tu API

  constructor(private http: HttpClient) {}

  getReservations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

    // Método para crear una devolución
    createReturn(returnData: any): Observable<any> {
      return this.http.post<any>(this.apiUrl, returnData);  // Asegúrate de que el backend acepte esta URL
    }

    getReservationsByUserId(userId: string | null): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
    }  
    
    // Método para cancelar la reserva
    cancelReservation(reservationId: number): Observable<any> {
      return this.http.patch<any>(`${this.apiUrl}/${reservationId}`, { status: 'Cancelled' });
    }

    // Nuevo método para actualizar el estado de la reserva a "Facturacion"
    updateReservationStatusToFacturacion(reservationId: number): Observable<any> {
      return this.http.patch<any>(`${this.apiUrl}/${reservationId}`, { status: 'Facturacion' });
    }
}
