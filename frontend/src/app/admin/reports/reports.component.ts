import { Component, OnInit } from '@angular/core';
import { ReportService } from './report.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  salesTotal: number | null = null;  // Total de ventas
  expensesTotal: number | null = null;  // Total de gastos de mantenimiento
  maintenanceRecords: any[] = [];  // Para almacenar los mantenimientos
  salesInvoices: any[] = [];  // Para almacenar las facturas de ventas

  constructor(private reportService: ReportService) {}

  ngOnInit() {
    this.getMaintenanceRecords();
    this.getSalesReport();  // Obtener el total de ventas al iniciar
  }

  // Obtener el reporte de ventas
  getSalesReport(): void {
    this.reportService.getSalesReport().subscribe((invoices: any[]) => {
      // Asignar las facturas para mostrarlas en la tabla
      this.salesInvoices = invoices;

      // Calcular el total de ventas sumando todos los 'total' de las facturas
      this.salesTotal = invoices.reduce((sum, invoice) => sum + parseFloat(invoice.total), 0);
    });
  }
  
  // Obtener los registros de mantenimiento
  getMaintenanceRecords(): void {
    this.reportService.getAllMaintenanceRecords().subscribe(records => {
      this.maintenanceRecords = records.map(record => ({
        ...record,
        total_gastos: parseFloat(record.total_gastos) || 0
      }));
      this.calculateTotalGastos();
    });
  }

  // Calcular el total de gastos de los mantenimientos
  calculateTotalGastos(): void {
    this.expensesTotal = this.maintenanceRecords.reduce((sum, record) => sum + record.total_gastos, 0);
  }
}
