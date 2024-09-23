import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentSuccessComponent } from './assessment-success.component';

describe('AssessmentSuccessComponent', () => {
  let component: AssessmentSuccessComponent;
  let fixture: ComponentFixture<AssessmentSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssessmentSuccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssessmentSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
