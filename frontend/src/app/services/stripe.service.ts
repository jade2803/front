import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  private backendUrl = 'http://localhost:8080/stripe/create-checkout-session'; // Actualiza la URL a la ruta correcta

  constructor(private http: HttpClient) {}

  // Cambia la URL de la llamada HTTP para usar la ruta de 'create-checkout-session'
  createCheckoutSession(amount: number, currency: string): Observable<any> {
    return this.http.post(this.backendUrl, {
      amount: amount,
      currency: currency,
    });
  }

  getSessionStatus(sessionId: string): Observable<{ status: string }> {
    return this.http.get<{ status: string }>(`${this.backendUrl}/session-status/${sessionId}`);
  }

}
