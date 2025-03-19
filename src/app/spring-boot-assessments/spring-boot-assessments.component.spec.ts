import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpringBootAssessmentsComponent } from './spring-boot-assessments.component';

describe('SpringBootAssessmentsComponent', () => {
  let component: SpringBootAssessmentsComponent;
  let fixture: ComponentFixture<SpringBootAssessmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpringBootAssessmentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpringBootAssessmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
