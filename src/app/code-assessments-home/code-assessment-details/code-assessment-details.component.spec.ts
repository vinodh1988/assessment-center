import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeAssessmentDetailsComponent } from './code-assessment-details.component';

describe('CodeAssessmentDetailsComponent', () => {
  let component: CodeAssessmentDetailsComponent;
  let fixture: ComponentFixture<CodeAssessmentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CodeAssessmentDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CodeAssessmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
