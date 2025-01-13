import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-maintenance-inspection-modal',
  templateUrl: './maintenance-inspection-modal.component.html',
  styleUrls: ['./maintenance-inspection-modal.component.css'],
})
export class MaintenanceInspectionModalComponent implements OnInit {
  vehicle: any;
  inspectionItems = [
    { label: 'Aceite de motor y filtro', status: '', cost: 0 },
    { label: 'Filtro de aire', status: '', cost: 0 },
    { label: 'Llantas', status: '', cost: 0 },
    { label: 'Alineación', status: '', cost: 0 },
    { label: 'Amortiguadores', status: '', cost: 0 },
    { label: 'Refrigerante', status: '', cost: 0 },
    { label: 'Batería', status: '', cost: 0 },
    { label: 'Faros', status: '', cost: 0 },
    { label: 'Líquido de dirección hidráulica', status: '', cost: 0 },
    { label: 'Líquido de frenos', status: '', cost: 0 },
    { label: 'Correas', status: '', cost: 0 },
    { label: 'Líquido de transmisión', status: '', cost: 0 },
  ];
  totalCost = 0;

  constructor(
    public dialogRef: MatDialogRef<MaintenanceInspectionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.vehicle = data.vehicle;
  }

  ngOnInit(): void {}

  onStatusChange(item: any): void {
    if (item.status === 'Bueno') {
      item.cost = 0;
      this.calculateTotal();
    }
  }

  calculateTotal(): void {
    this.totalCost = this.inspectionItems.reduce((sum, item) => sum + (item.cost || 0), 0);
  }
}
