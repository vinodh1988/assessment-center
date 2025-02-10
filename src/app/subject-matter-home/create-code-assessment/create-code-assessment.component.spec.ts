import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCodeAssessmentComponent } from './create-code-assessment.component';

describe('CreateCodeAssessmentComponent', () => {
  let component: CreateCodeAssessmentComponent;
  let fixture: ComponentFixture<CreateCodeAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateCodeAssessmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateCodeAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
