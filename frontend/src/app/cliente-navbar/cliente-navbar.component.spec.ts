import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteNavbarComponent } from './cliente-navbar.component';

describe('ClienteNavbarComponent', () => {
  let component: ClienteNavbarComponent;
  let fixture: ComponentFixture<ClienteNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClienteNavbarComponent]
    });
    fixture = TestBed.createComponent(ClienteNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
