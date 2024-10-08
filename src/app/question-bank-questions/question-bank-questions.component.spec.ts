import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionBankQuestionsComponent } from './question-bank-questions.component';

describe('QuestionBankQuestionsComponent', () => {
  let component: QuestionBankQuestionsComponent;
  let fixture: ComponentFixture<QuestionBankQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionBankQuestionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionBankQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
