import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteNavbarComponent } from './cliente-navbar.component';

@NgModule({
  declarations: [ClienteNavbarComponent],
  imports: [CommonModule],
  exports: [ClienteNavbarComponent] // Exportar para que pueda ser usado en otros módulos
})
export class ClienteNavbarModule {}
