import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BillingService {
  private apiUrl = 'http://localhost:8080/invoices'; // Ajusta la URL según tu API

  constructor(private http: HttpClient) {}

  getBillingData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getReturnByReturnId(returnId: number): Observable<any> {
    return this.http.get(`http://localhost:8080/returns/${returnId}`); // Asegúrate de que esta ruta esté configurada en tu backend
  }

  updateInvoice(id: number, invoiceData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, invoiceData);
  }

  updateReservation(reservationId: number, updateData: any): Observable<any> {
    return this.http.put(`http://localhost:8080/reservations/${reservationId}`, updateData);
  }
  
}
