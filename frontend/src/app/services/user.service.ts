import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/usuario';  // Endpoint de registro
  private authUrl = 'http://localhost:8080/auth';    // Endpoint de login

  constructor(private http: HttpClient) { }

  // Métodos para agregar, editar y eliminar empleados

  // Método para actualizar un empleado (que es lo mismo que un usuario en este caso)
  updateUser(id: number, employee: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, employee);  // Endpoint que usa el mismo API para empleados
  }

  // Método para agregar un nuevo empleado (usuario)
  registerUser(employee: any): Observable<any> {
    return this.http.post(this.apiUrl, employee);  // Usamos el mismo endpoint para agregar empleados/usuarios
  }

  // Método para eliminar un empleado (usuario)
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);  // Endpoint para eliminar un empleado
  }

  // Método para obtener todos los usuarios
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Método para realizar login
  loginUser(loginData: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/login`, loginData); // Login
  }
}
