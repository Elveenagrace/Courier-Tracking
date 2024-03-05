import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierAnalysisComponent } from './courier-analysis.component';

describe('CourierAnalysisComponent', () => {
  let component: CourierAnalysisComponent;
  let fixture: ComponentFixture<CourierAnalysisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourierAnalysisComponent]
    });
    fixture = TestBed.createComponent(CourierAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
