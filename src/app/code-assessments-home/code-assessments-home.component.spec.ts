import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeAssessmentsHomeComponent } from './code-assessments-home.component';

describe('CodeAssessmentsHomeComponent', () => {
  let component: CodeAssessmentsHomeComponent;
  let fixture: ComponentFixture<CodeAssessmentsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CodeAssessmentsHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CodeAssessmentsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
