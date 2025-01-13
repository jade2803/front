import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  private vehicleApiUrl = 'http://localhost:8080/vehicle';
  private maintenanceApiUrl = 'http://localhost:8080/maintenance'; 

  constructor(private http: HttpClient) {}

  getVehicles(): Observable<any[]> {
    return this.http.get<any[]>(this.vehicleApiUrl);
  }

  getVehicleById(id: string): Observable<any> {
    return this.http.get<any>(`${this.vehicleApiUrl}/${id}`);
  }

  createReservation(reservationData: any): Observable<any> {
    const apiUrl = 'http://localhost:8080/reservations'; // URL del endpoint de reservaciones
    return this.http.post(apiUrl, reservationData);
  }

  updateVehicleStatus(vehicleId: number, status: string) {
    return this.http.put(`${this.vehicleApiUrl}/vehicles/${vehicleId}/status`, { status });
  }

  saveMaintenanceRecord(maintenanceData: any): Observable<any> {
    return this.http.post(`${this.maintenanceApiUrl}/`, maintenanceData);  // Asegúrate de que el backend esté listo para recibir esta solicitud
  }
  
}

