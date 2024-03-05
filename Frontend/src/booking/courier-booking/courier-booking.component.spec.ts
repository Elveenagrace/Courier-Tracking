import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierBookingComponent } from './courier-booking.component';

describe('CourierBookingComponent', () => {
  let component: CourierBookingComponent;
  let fixture: ComponentFixture<CourierBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourierBookingComponent]
    });
    fixture = TestBed.createComponent(CourierBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
