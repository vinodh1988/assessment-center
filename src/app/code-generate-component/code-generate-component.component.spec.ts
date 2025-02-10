import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeGenerateComponentComponent } from './code-generate-component.component';

describe('CodeGenerateComponentComponent', () => {
  let component: CodeGenerateComponentComponent;
  let fixture: ComponentFixture<CodeGenerateComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CodeGenerateComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CodeGenerateComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
