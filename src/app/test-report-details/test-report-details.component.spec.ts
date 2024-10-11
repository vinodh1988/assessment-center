import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestReportDetailsComponent } from './test-report-details.component';

describe('TestReportDetailsComponent', () => {
  let component: TestReportDetailsComponent;
  let fixture: ComponentFixture<TestReportDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestReportDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestReportDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
