import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BillingService } from './billing.service';
import { InvoiceModalComponent } from '../../components/invoice-modal/invoice-modal.component';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css'],
})
export class BillingComponent implements OnInit {
  billingData: any[] = [];
  filteredBillingData: any[] = []; // Nueva propiedad para los datos filtrados

  constructor(
    private billingService: BillingService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadBillingData();
  }

  loadBillingData(): void {
    this.billingService.getBillingData().subscribe((data) => {
      this.billingData = data;
      this.cdr.detectChanges();
      // Filtrar los datos para mostrar solo aquellos con estado "No Facturado"
      this.filteredBillingData = this.billingData.filter(
        (bill) => bill.billing_status === 'No Facturado'
      );
    });
  }

  openInvoiceModal(bill: any): void {
    const dialogRef = this.dialog.open(InvoiceModalComponent, {
      width: '600px',
      height: '600px',
      data: {
        ...bill,
        items: [
          { description: 'Cargo Adicional', price: bill.return?.additional_charge || 0 },
          { description: 'Total', price: bill.return?.reservation?.total || 0 },
          { description: 'Garantía', price: bill.return?.reservation?.warranty || 0 },
        ],
        billing_status: bill.billing_status || 'No Facturado',
      },
    });
  
    dialogRef.afterClosed().subscribe((updatedInvoice) => {
      if (updatedInvoice) {
        // Buscar la factura actualizada en billingData y reemplazarla
        const index = this.billingData.findIndex((item) => item.id === updatedInvoice.id);
        if (index !== -1) {
          this.billingData[index] = updatedInvoice;
          
          // Filtrar los datos para mostrar solo los que tienen el estado "No Facturado"
          this.filteredBillingData = this.billingData.filter(
            (bill) => bill.billing_status === 'No Facturado',
            this.cdr.detectChanges()
          );
        }
      }
    });
  }  
}
