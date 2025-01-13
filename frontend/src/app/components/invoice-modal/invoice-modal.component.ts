interface InvoiceItem {
  description: string;
  price: number;
}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BillingService } from 'src/app/employee/billing/billing.service';
import { StripeService } from 'src/app/services/stripe.service'; 
import { loadStripe } from '@stripe/stripe-js'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-modal',
  templateUrl: './invoice-modal.component.html',
  styleUrls: ['./invoice-modal.component.css'],
})
export class InvoiceModalComponent {
  invoiceData: any;
  currentDate: Date = new Date();
  isSubmitting = false;

  constructor(
    public dialogRef: MatDialogRef<InvoiceModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private billingService: BillingService,
    private stripeService: StripeService,
    private router: Router 
  ) {
    this.invoiceData = { ...data };
    console.log('Datos recibidos en el modal:', this.invoiceData);
  }

  // Método para validar cédula o RUC de Ecuador
  validateIdentification(id: string): boolean {
    if (id.length === 10) {
      return this.validateCedula(id); // Validar cédula
    } else if (id.length === 13) {
      return this.validateRUC(id); // Validar RUC
    }
    return false;
  }

  // Validar cédula (10 dígitos)
  validateCedula(cedula: string): boolean {
    let total = 0;
    const provincia = parseInt(cedula.substring(0, 2), 10);
    if (provincia < 1 || provincia > 24) {
      return false;
    }
    for (let i = 0; i < 9; i++) {
      let digito = parseInt(cedula.charAt(i), 10);
      if (i % 2 === 0) {
        digito *= 2;
        if (digito > 9) {
          digito -= 9;
        }
      }
      total += digito;
    }
    const digitoVerificador = (10 - (total % 10)) % 10;
    return digitoVerificador === parseInt(cedula.charAt(9), 10);
  }

  // Validar RUC (13 dígitos)
  validateRUC(ruc: string): boolean {
    let total = 0;
    if (parseInt(ruc.charAt(0), 10) !== 1) {
      return false;
    }
    for (let i = 0; i < 9; i++) {
      let digito = parseInt(ruc.charAt(i), 10);
      total += digito;
    }
    return total % 11 === parseInt(ruc.charAt(9), 10);
  }

  // Método para calcular totales
  calculateTotals(): { subtotal: number, iva: number, pago: number } {
    const additionalCharge = parseFloat(this.invoiceData.items?.find((item: InvoiceItem) => item.description === 'Cargo Adicional')?.price || '0');
    const total = parseFloat(this.invoiceData.items?.find((item: InvoiceItem) => item.description === 'Total')?.price || '0');
    const warranty = parseFloat(this.invoiceData.items?.find((item: InvoiceItem) => item.description === 'Garantía')?.price || '0');
  
    const subtotal = additionalCharge === 0 ? total - warranty : total + additionalCharge;
    const iva = subtotal * 0.15;
    const pago = subtotal + iva;
  
    return { subtotal, iva, pago };
  }

  // Método para enviar la factura
  onSubmitInvoice(event: Event) {
    event.preventDefault();
    this.isSubmitting = true;

    const fullName = `${this.invoiceData.firstName} ${this.invoiceData.lastName}`;

    const invoiceData = {
      cedula_id: this.invoiceData.identification,
      name: fullName,
      telf: this.invoiceData.phone,
      total: this.calculateTotals().pago.toString(),
      billing_status: this.invoiceData.billing_status || 'No Facturado',
    };

    this.billingService.updateInvoice(this.invoiceData.id, invoiceData).subscribe(
      (updatedInvoice) => {
        this.isSubmitting = false;
        console.log('Factura actualizada:', updatedInvoice);

        this.billingService.getReturnByReturnId(this.invoiceData.returnId).subscribe(
          (returnData) => {
            if (returnData && returnData.reservationId) {
              const updateReservationData = { status: 'Completed' };
              this.billingService.updateReservation(returnData.reservationId, updateReservationData).subscribe(
                (updatedReservation) => {
                  console.log('Reserva actualizada:', updatedReservation);
                  this.dialogRef.close(updatedInvoice);
                },
                (error) => {
                  console.error('Error al actualizar la reserva:', error);
                }
              );
            }
          },
          (error) => {
            console.error('Error al obtener el returnId:', error);
          }
        );
      },
      (error) => {
        this.isSubmitting = false;
        console.error('Error al actualizar la factura:', error);
      }
    );
  }

// Método para facturar la factura
async onFacturar() {
  this.isSubmitting = true;

  // Calcular el monto total desde los datos de la factura
  const total = this.calculateTotals().pago;
  const amountInCents = Math.round(total * 100); // Stripe usa centavos

  // Actualizar el estado de facturación en el backend
  const invoiceData = {
    cedula_id: this.invoiceData.identification,
    name: `${this.invoiceData.firstName} ${this.invoiceData.lastName}`,
    telf: this.invoiceData.phone,
    total: total.toString(),
    billing_status: 'Facturado',
  };

  this.billingService.updateInvoice(this.invoiceData.id, invoiceData).subscribe(
    async (updatedInvoice) => {
      console.log('Factura actualizada:', updatedInvoice);

      // Crear sesión de Stripe
      this.stripeService.createCheckoutSession(amountInCents, 'usd').subscribe(
        async (response) => {
          console.log('Sesión de Stripe creada:', response);

          if (!response.sessionId) {
            console.error('No se recibió un sessionId de Stripe.');
            this.isSubmitting = false;
            return;
          }

          // Redirigir a Stripe
          const stripe = await loadStripe('pk_test_51OYyaeHFGCnONXmCpkLKX5gQFcSaIub80eOS8Q2GWwxpVyrTf9HyVdOsoNDo8SS3kFi6ceARnVz4THFlZRpzKoOW00xw5088Ww');
          if (stripe) {
            const result = await stripe.redirectToCheckout({ sessionId: response.sessionId });
            if (result.error) {
              console.error('Error al redirigir a Stripe:', result.error.message);
            } else {
              console.log('Redirigido exitosamente a Stripe.');
            }
          }
        },
        (error) => {
          console.error('Error al crear la sesión de Stripe:', error);
          this.isSubmitting = false;
        }
      );

      // Actualizar reservas si es necesario
      this.billingService.getReturnByReturnId(this.invoiceData.returnId).subscribe(
        (returnData) => {
          if (returnData && returnData.reservationId) {
            const updateReservationData = { status: 'Completed' };
            this.billingService.updateReservation(returnData.reservationId, updateReservationData).subscribe(
              (updatedReservation) => {
                console.log('Reserva actualizada:', updatedReservation);

                // Redirigir al componente de facturación (BillingComponent)
                this.router.navigate(['/employee/billing']);
                this.dialogRef.close(updatedInvoice);
              },
              (error) => {
                console.error('Error al actualizar la reserva:', error);
              }
            );
          }
        },
        (error) => {
          console.error('Error al obtener el returnId:', error);
        }
      );
    },
    (error) => {
      console.error('Error al actualizar la factura:', error);
      this.isSubmitting = false;
    }
  );
}

  // Cancelar y cerrar el modal sin hacer cambios
  onCancel() {
    this.dialogRef.close();
  }

  get phonePattern() {
    return /^[0-9]{10}$/;
  }
}
