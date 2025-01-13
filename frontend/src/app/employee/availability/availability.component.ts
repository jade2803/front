import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CatalogService } from 'src/app/catalog/catalog.service';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent {
  vehicles: any[] = [];
  filteredVehicles: any[] = [];
  brands: string[] = [];
  models: string[] = [];

  filters = {
    brand: '',
    model: '',
    price: 40, // Precio mínimo inicial
  };

  // Inyecta el servicio Router en el constructor
  constructor(private catalogService: CatalogService, private router: Router) {}

  viewDetails(vehicle: any) {
    this.router.navigate(['/catalog/details', vehicle.id]); // Envía el ID como parámetro
  }
  

  ngOnInit(): void {
    this.catalogService.getVehicles().subscribe(
      (data) => {
        // Filtra los vehículos para excluir aquellos cuyo estado es "Maintenance"
        this.vehicles = data.filter(vehicle => vehicle.status !== 'Maintenance');
        this.filteredVehicles = [...this.vehicles];
        this.initializeFilters();
      },
      (error) => {
        console.error('Error fetching vehicles', error);
      }
    );
  }
  

  initializeFilters() {
    this.brands = [...new Set(this.vehicles.map((vehicle) => vehicle.brand))];
    this.models = [...new Set(this.vehicles.map((vehicle) => vehicle.model))];
  }

  applyFilters() {
    const { brand, model, price } = this.filters;
  
    this.filteredVehicles = this.vehicles.filter((vehicle) => {
      const matchesBrand = brand ? vehicle.brand === brand : true;
      const matchesModel = model ? vehicle.model === model : true;
      const matchesPrice = vehicle.rental_rate >= price;
      const isAvailable = vehicle.status !== 'Maintenance'; // Asegúrate de excluir los vehículos en mantenimiento
      return matchesBrand && matchesModel && matchesPrice && isAvailable;
    });
  
    // Actualiza los modelos disponibles si se selecciona una marca
    if (brand) {
      this.models = [
        ...new Set(
          this.vehicles
            .filter((vehicle) => vehicle.brand === brand)
            .map((vehicle) => vehicle.model)
        ),
      ];
    } else {
      this.models = [...new Set(this.vehicles.map((vehicle) => vehicle.model))];
    }
  }
}
