import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceModalComponent } from './invoice-modal.component';

describe('InvoiceModalComponent', () => {
  let component: InvoiceModalComponent;
  let fixture: ComponentFixture<InvoiceModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoiceModalComponent]
    });
    fixture = TestBed.createComponent(InvoiceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
