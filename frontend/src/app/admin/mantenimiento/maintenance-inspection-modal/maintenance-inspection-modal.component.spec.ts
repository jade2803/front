import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceInspectionModalComponent } from './maintenance-inspection-modal.component';

describe('MaintenanceInspectionModalComponent', () => {
  let component: MaintenanceInspectionModalComponent;
  let fixture: ComponentFixture<MaintenanceInspectionModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaintenanceInspectionModalComponent]
    });
    fixture = TestBed.createComponent(MaintenanceInspectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
