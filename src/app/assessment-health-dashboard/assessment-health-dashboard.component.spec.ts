import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentHealthDashboardComponent } from './assessment-health-dashboard.component';

describe('AssessmentHealthDashboardComponent', () => {
  let component: AssessmentHealthDashboardComponent;
  let fixture: ComponentFixture<AssessmentHealthDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssessmentHealthDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssessmentHealthDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
