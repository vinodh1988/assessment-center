import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentResultsDashboardComponent } from './assessment-results-dashboard.component';

describe('AssessmentResultsDashboardComponent', () => {
  let component: AssessmentResultsDashboardComponent;
  let fixture: ComponentFixture<AssessmentResultsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssessmentResultsDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssessmentResultsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
