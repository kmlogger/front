import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardNumbersComponent } from './dashboard-numbers.component';

describe('DashboardNumbersComponent', () => {
  let component: DashboardNumbersComponent;
  let fixture: ComponentFixture<DashboardNumbersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardNumbersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
