import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectMatterHomeComponent } from './subject-matter-home.component';

describe('SubjectMatterHomeComponent', () => {
  let component: SubjectMatterHomeComponent;
  let fixture: ComponentFixture<SubjectMatterHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubjectMatterHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubjectMatterHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
