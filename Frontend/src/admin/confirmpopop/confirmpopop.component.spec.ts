import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmpopopComponent } from './confirmpopop.component';

describe('ConfirmpopopComponent', () => {
  let component: ConfirmpopopComponent;
  let fixture: ComponentFixture<ConfirmpopopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmpopopComponent]
    });
    fixture = TestBed.createComponent(ConfirmpopopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
