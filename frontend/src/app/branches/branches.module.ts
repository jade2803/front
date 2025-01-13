import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchesComponent } from './branches.component';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [BranchesComponent],
  imports: [
    CommonModule,
    GoogleMapsModule
  ],
  exports: [BranchesComponent],
})
export class BranchesModule {}
