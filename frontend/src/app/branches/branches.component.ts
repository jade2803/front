import { Component } from '@angular/core';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent {
  constructor() {
    console.log('BranchesComponent cargado correctamente.');
  }
  // Coordenadas iniciales para centrar el mapa
  center = { lat: -0.180653, lng: -78.467838 }; // Quito, Ecuador
  zoom = 7;

  // Marcadores para las sucursales
  markers = [
    { position: { lat: -0.180653, lng: -78.467838 }, label: 'Quito' },
    { position: { lat: -2.19616, lng: -79.88621 }, label: 'Guayaquil' },
    { position: { lat: -2.90055, lng: -79.00453 }, label: 'Cuenca' },
  ];
}
