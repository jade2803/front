import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentIntentComponent } from './payment-intent.component';

describe('PaymentIntentComponent', () => {
  let component: PaymentIntentComponent;
  let fixture: ComponentFixture<PaymentIntentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentIntentComponent]
    });
    fixture = TestBed.createComponent(PaymentIntentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
