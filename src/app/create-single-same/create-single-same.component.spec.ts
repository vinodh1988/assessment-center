import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSingleSameComponent } from './create-single-same.component';

describe('CreateSingleSameComponent', () => {
  let component: CreateSingleSameComponent;
  let fixture: ComponentFixture<CreateSingleSameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateSingleSameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateSingleSameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
