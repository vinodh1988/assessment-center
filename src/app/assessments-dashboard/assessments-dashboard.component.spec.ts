import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentsDashboardComponent } from './assessments-dashboard.component';

describe('AssessmentsDashboardComponent', () => {
  let component: AssessmentsDashboardComponent;
  let fixture: ComponentFixture<AssessmentsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssessmentsDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssessmentsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
