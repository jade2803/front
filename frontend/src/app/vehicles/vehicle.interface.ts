// src/app/models/vehicle.interface.ts
export interface Vehicle {
    id: number;
    brand: string;
    model: string;
    license_plate: string;
    available: boolean;
    rental_rate: number;
    status: string;
    created_at: string;
    imageUrl: string;
  }
  