import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCouriersComponent } from './view-couriers.component';

describe('ViewCouriersComponent', () => {
  let component: ViewCouriersComponent;
  let fixture: ComponentFixture<ViewCouriersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCouriersComponent]
    });
    fixture = TestBed.createComponent(ViewCouriersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
