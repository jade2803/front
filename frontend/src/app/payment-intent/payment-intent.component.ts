import { Component, OnInit } from '@angular/core';
import { StripeCardElement, StripeElements, loadStripe, Stripe } from '@stripe/stripe-js';
import { PaymentService } from '../services/payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment-intent.component.html',
  styleUrls: ['./payment-intent.component.css'],
})
export class PaymentComponent implements OnInit {
  stripeElements: StripeElements | null = null;
  cardElement: StripeCardElement | null = null;
  clientSecret: string = 'pi_3QdvUMHFGCnONXmC09PN1e9a_secret_ZjXKhtW7lGGVtCEej9i1Tui07'; // Reemplaza dinámicamente

  constructor(private paymentService: PaymentService, private router: Router) {}

  async ngOnInit() {
    const stripe = await loadStripe('pk_test_51OYyaeHFGCnONXmCpkLKX5gQFcSaIub80eOS8Q2GWwxpVyrTf9HyVdOsoNDo8SS3kFi6ceARnVz4THFlZRpzKoOW00xw5088Ww'); // Reemplaza con tu llave pública
    if (!stripe) {
      console.error('Stripe no se cargó correctamente.');
      return;
    }

    this.stripeElements = stripe.elements();
    this.cardElement = this.stripeElements.create('card');
    this.cardElement.mount('#card-element'); // Asegúrate de tener un div con id 'card-element'
  }

  async makePayment() {
    if (!this.cardElement) {
      console.error('El elemento de tarjeta no está configurado.');
      return;
    }

    try {
      const result = await this.paymentService.confirmPayment(this.clientSecret, this.cardElement);
      if (result.error) {
        console.error('Error al procesar el pago:', result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        console.log('Pago exitoso');

        console.log('Token antes de redirigir a billing:', localStorage.getItem('accessToken'));

        this.router.navigate(['/employee/billing']);
      }
    } catch (error) {
      console.error('Error inesperado:', error);
    }
  }

   // Aquí puedes realizar la comprobación del rol tras el pago
   onPaymentComplete() {
    const userRole = localStorage.getItem('role');
    if (userRole === 'Employee') {
      console.log('El rol del usuario es Employee, redirigiendo a la página de billing');
      this.router.navigate(['/employee/billing']);
    } else {
      console.log('Rol incorrecto después del pago:', userRole);
      // Aquí puedes hacer una redirección al login o a alguna otra página si el rol no es 'Employee'
      this.router.navigate(['/login']);
    }
  }
}
