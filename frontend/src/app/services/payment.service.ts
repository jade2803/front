import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private stripe: Stripe | null = null;

  constructor() {
    this.initializeStripe();
  }

  private async initializeStripe() {
    this.stripe = await loadStripe('pk_test_51OYyaeHFGCnONXmCpkLKX5gQFcSaIub80eOS8Q2GWwxpVyrTf9HyVdOsoNDo8SS3kFi6ceARnVz4THFlZRpzKoOW00xw5088Ww'); // Reemplaza con tu llave pública de Stripe
  }

  async confirmPayment(clientSecret: string, cardElement: any): Promise<any> {
    if (!this.stripe) {
      throw new Error('Stripe no se ha inicializado correctamente.');
    }

    const result = await this.stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: 'Nombre del cliente', // Cambia esto dinámicamente si tienes un formulario
        },
      },
    });

    return result;
  }
}
