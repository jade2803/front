import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReturnsService {
  private apiUrl = 'http://localhost:8080/returns'; // Ajusta la URL según tu backend
  private invoicesApiUrl = 'http://localhost:8080/invoices'; // Nueva URL para facturas

  constructor(private http: HttpClient) {}

  // Método para crear una devolución
  createReturn(returnData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, returnData);
  }

  // Método para crear una factura
  createInvoice(invoiceData: any): Observable<any> {
    return this.http.post<any>(this.invoicesApiUrl, invoiceData);
  }
}
