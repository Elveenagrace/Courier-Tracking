import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierDetailsComponent } from './courier-details.component';

describe('CourierDetailsComponent', () => {
  let component: CourierDetailsComponent;
  let fixture: ComponentFixture<CourierDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourierDetailsComponent]
    });
    fixture = TestBed.createComponent(CourierDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
