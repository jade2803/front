// src/app/payment-success/payment-success.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StripeService } from '../services/stripe.service';

@Component({
  selector: 'app-payment-success',
  template: '<p>Procesando el pago...</p>',
})
export class PaymentSuccessComponent implements OnInit {
  constructor(private route: ActivatedRoute, private stripeService: StripeService) {}

  ngOnInit(): void {
    const sessionId = this.route.snapshot.queryParamMap.get('session_id');
    if (sessionId) {
      this.stripeService.getSessionStatus(sessionId).subscribe(
        (response) => {
          if (response.status === 'complete') {
            alert('Pago completado exitosamente.');
            // Aquí puedes redirigir o completar la lógica de reservación
          } else {
            alert('El pago no se completó.');
          }
        },
        (error) => console.error('Error verificando el estado del pago', error)
      );
    }
  }
}
