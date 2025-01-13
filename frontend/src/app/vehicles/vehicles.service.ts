import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  private apiUrl = 'http://localhost:8080/vehicle';

  constructor(private http: HttpClient) {}

  // Obtener vehículos
  getVehicles(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Agregar vehículo
  addVehicle(vehicle: any): Observable<any> {
    return this.http.post(this.apiUrl, vehicle);
  }

  // Editar vehículo
  updateVehicle(id: number, vehicle: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, vehicle);
  }

  // Eliminar vehículo
  deleteVehicle(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
