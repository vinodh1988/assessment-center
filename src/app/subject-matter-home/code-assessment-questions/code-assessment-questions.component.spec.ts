import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeAssessmentQuestionsComponent } from './code-assessment-questions.component';

describe('CodeAssessmentQuestionsComponent', () => {
  let component: CodeAssessmentQuestionsComponent;
  let fixture: ComponentFixture<CodeAssessmentQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CodeAssessmentQuestionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CodeAssessmentQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
