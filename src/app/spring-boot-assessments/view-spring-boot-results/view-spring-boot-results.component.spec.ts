import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSpringBootResultsComponent } from './view-spring-boot-results.component';

describe('ViewSpringBootResultsComponent', () => {
  let component: ViewSpringBootResultsComponent;
  let fixture: ComponentFixture<ViewSpringBootResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewSpringBootResultsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewSpringBootResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
