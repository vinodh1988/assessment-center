import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMultiSameComponent } from './create-multi-same.component';

describe('CreateMultiSameComponent', () => {
  let component: CreateMultiSameComponent;
  let fixture: ComponentFixture<CreateMultiSameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateMultiSameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateMultiSameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
