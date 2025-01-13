import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { loadStripe } from '@stripe/stripe-js';
import { StripeService } from 'src/app/services/stripe.service';
import { CatalogService } from '../catalog.service';
import { Router } from '@angular/router';  // Importar Router

// Validador para asegurarse de que la fecha de inicio no esté en el pasado
export function dateValidator(control: AbstractControl): ValidationErrors | null {
  const currentDate = new Date();
  const selectedDate = new Date(control.value);

  if (selectedDate < currentDate) {
    return { dateInvalid: true };
  }
  return null;
}

// Validador para asegurarse de que end_date sea mayor que start_date
export function dateRangeValidator(group: AbstractControl): ValidationErrors | null {
  const startDate = group.get('start_date')?.value;
  const endDate = group.get('end_date')?.value;

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end <= start) {
      return { endDateInvalid: true };
    }
  }
  return null;
}

// Validador para garantía: debe ser mayor a cero y al menos el 50% del total
export function warrantyValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (value < 0) {
    return { warrantyInvalid: true };
  }
  return null;
}

@Component({
  selector: 'app-reservation-modal',
  templateUrl: './reservation-modal.component.html',
  styleUrls: ['./reservation-modal.component.css'],
})
export class ReservationModalComponent {
  reservationForm: FormGroup;
  minDate: string;
  customerId: number | null = null;
  total: number = 0; // Total calculado dinámicamente
  warranty: number = 0; // Garantía calculada automáticamente

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ReservationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private stripeService: StripeService, // Servicio de Stripe
    private catalogService: CatalogService, // Servicio CatalogService inyectado
    private router: Router
  ) {
    this.minDate = new Date().toISOString().slice(0, 16);

    // Obtener el ID del usuario desde el almacenamiento local
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.customerId = parseInt(userId, 10);
    } else {
      console.error('No se encontró el ID del usuario en el almacenamiento local.');
    }

    // Configuración del formulario con validación a nivel de grupo
    this.reservationForm = this.fb.group(
      {
        start_date: ['', [Validators.required, dateValidator]],
        end_date: ['', [Validators.required, dateValidator]],
        warranty: ['', [Validators.required, warrantyValidator]], // Campo de garantía
      },
      {
        validators: dateRangeValidator, // Validación a nivel de grupo
      }
    );

    // Suscripción a cambios en las fechas para calcular el total dinámicamente
    this.reservationForm.valueChanges.subscribe(() => this.updateTotal());
  }

  updateTotal() {
    const startDate = new Date(this.reservationForm.get('start_date')?.value);
    const endDate = new Date(this.reservationForm.get('end_date')?.value);

    if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
      // Calcular la diferencia en días
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Días completos

      // Calcular las horas fraccionadas si las hay
      const diffHours = Math.ceil((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Horas fraccionadas

      // Calcular el costo total
      const dailyRate = this.data.vehicle.rental_rate; // El costo por día
      const costForDays = diffDays * dailyRate; // Costo por los días completos
      const costForHours = (dailyRate / 24) * diffHours; // Costo por las horas fraccionadas

      this.total = costForDays + costForHours; // Total final

      // Calcular la garantía como el 50% del total
      this.warranty = this.total * 0.5;

      // Actualizar el valor de garantía automáticamente
      this.reservationForm.patchValue({ warranty: this.warranty.toFixed(2) }, { emitEvent: false });

      // Verificar errores en el control de garantía
      const warrantyControl = this.reservationForm.get('warranty');
      if (warrantyControl && warrantyControl.value < this.warranty) {
        warrantyControl.setErrors({ warrantyTooLow: true });
      } else {
        warrantyControl?.setErrors(null);
      }
    } else {
      this.total = 0;
    }
  }

// Dentro del método onSubmit, después de completar la transacción de Stripe:
async onSubmit() {
  if (this.reservationForm.valid && this.customerId) {
    const reservation = {
      vehicleId: this.data.vehicle.id,
      customerId: this.customerId,
      warranty: parseFloat(this.reservationForm.get('warranty')?.value),
      total: this.total,
      ...this.reservationForm.value,
    };

    console.log('Datos a enviar al backend:', {
      amount: reservation.warranty * 100, // Convertir a centavos
      currency: 'usd',
    });

    // Enviar la reserva al backend para crearla
    this.catalogService.createReservation(reservation).subscribe(
      (response) => {
        console.log('Reserva guardada exitosamente:', response);

        // Aquí ya tienes la reserva guardada, ahora creas la sesión de Stripe
        const amountInCents = Math.round(reservation.warranty * 100); // Redondeamos al valor más cercano
        this.stripeService.createCheckoutSession(amountInCents, 'usd').subscribe(
          async (response) => {
            console.log('Respuesta del backend de Stripe:', response);
            if (!response.sessionId) {
              console.error('El sessionId no fue retornado por el backend.');
              return;
            }

            // Redirigir a Stripe
            const stripe = await loadStripe('pk_test_51OYyaeHFGCnONXmCpkLKX5gQFcSaIub80eOS8Q2GWwxpVyrTf9HyVdOsoNDo8SS3kFi6ceARnVz4THFlZRpzKoOW00xw5088Ww');
            if (stripe) {
              const result = await stripe.redirectToCheckout({ sessionId: response.sessionId });
              if (result.error) {
                console.error('Error al redirigir a Stripe:', result.error.message);
              } else {
                // Redirigir manualmente a vehicle-details después de un pago exitoso
                this.router.navigate(['/catalog/details', this.data.vehicle.id]); // Aquí estás redirigiendo al detalle del vehículo
              }
            }
          },
          (error) => {
            console.error('Error al crear la sesión de Checkout:', error);
          }
        );

        // Cerrar el modal después de guardar la reserva
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error creando la reserva:', error);
      }
    );
  }
}
  
  onCancel() {
    this.dialogRef.close();
    this.router.navigate(['/catalog/details', this.data.vehicle.id]);
  }

  getDateErrorMessage(controlName: string): string {
    const control = this.reservationForm.get(controlName);

    if (control?.hasError('dateInvalid')) {
      return 'La fecha debe ser igual o posterior a la fecha actual';
    }

    if (this.reservationForm.hasError('endDateInvalid')) {
      return 'La fecha de fin debe ser posterior a la fecha de inicio';
    }

    return '';
  }

  getWarrantyErrorMessage(): string {
    const control = this.reservationForm.get('warranty');

    if (control?.hasError('warrantyInvalid')) {
      return 'El monto de la garantía debe ser mayor a cero.';
    }

    if (control?.hasError('warrantyTooLow')) {
      return `La garantía debe ser al menos el 50% del costo total (${this.warranty.toFixed(2)})`;
    }

    return '';
  }
}
