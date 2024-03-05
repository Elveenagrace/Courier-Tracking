import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCouriersComponent } from './my-couriers.component';

describe('MyCouriersComponent', () => {
  let component: MyCouriersComponent;
  let fixture: ComponentFixture<MyCouriersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyCouriersComponent]
    });
    fixture = TestBed.createComponent(MyCouriersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
