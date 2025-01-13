import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'http://localhost:8080'; // Cambia a la URL de tu API

  constructor(private http: HttpClient) {}

  // Obtener todos los mantenimientos
  getAllMaintenanceRecords(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/maintenance');  // Asegúrate de que esta URL sea correcta
  }

  // Obtener el reporte de ventas (ahora será un arreglo de facturas)
  getSalesReport(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/invoices');  // Cambié el tipo de respuesta a un arreglo
  }
}
