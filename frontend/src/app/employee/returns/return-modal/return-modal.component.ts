// return-modal.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReturnsService } from '../returns.service';
import { RentalsService } from '../../rentals/rentals.service';

@Component({
  selector: 'app-return-modal',
  templateUrl: './return-modal.component.html',
  styleUrls: ['./return-modal.component.css'],
})
export class ReturnModalComponent {
  returnData: any = {
    returnDate: null,
    vehicleCondition: 'Good',
    additionalCharge: 0,
    reservation_id: null,
  };

  minDate: string;
  isSubmitting = false;

  constructor(
    public dialogRef: MatDialogRef<ReturnModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private rentalsService: RentalsService,
    private returnsService: ReturnsService
  ) {
    const now = new Date();
    this.minDate = now.toISOString().slice(0, 16);

    if (data && data.id) {
      this.returnData.reservation_id = data.id;
    }
  }

  // Validación para verificar si la fecha es mayor que la fecha actual
  isDateInPast(): boolean {
    const currentDate = new Date();
    const returnDate = new Date(this.returnData.returnDate);
    return returnDate <= currentDate;
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    if (this.isSubmitting || !this.returnData.returnDate || !this.returnData.vehicleCondition || this.returnData.additionalCharge === null || this.isDateInPast()) {
      return;
    }

    this.isSubmitting = true;

    // Registrar la devolución
    this.returnsService.createReturn(this.returnData).subscribe(
      (returnResponse) => {
        console.log('Devolución registrada exitosamente:', returnResponse);

        // Crear la factura con el ID de la devolución recién creada
        const invoiceData = { returnId: returnResponse.id };

        this.returnsService.createInvoice(invoiceData).subscribe(
          (invoiceResponse) => {
            console.log('Factura creada exitosamente:', invoiceResponse);

            // Actualizar el estado de la reserva a "Facturacion"
            this.rentalsService.updateReservationStatusToFacturacion(returnResponse.reservation_id).subscribe(
              () => {
                console.log('Estado de la reserva actualizado a "Facturacion"');
                this.dialogRef.close(invoiceResponse); // Cerrar el modal
              },
              (statusUpdateError) => {
                console.error('Error al actualizar el estado de la reserva:', statusUpdateError);
                this.isSubmitting = false;
              }
            );
          },
          (invoiceError) => {
            console.error('Error al crear la factura:', invoiceError);
            this.isSubmitting = false;
          }
        );
      },
      (error) => {
        console.error('Error al registrar la devolución:', error);
        this.isSubmitting = false;
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
