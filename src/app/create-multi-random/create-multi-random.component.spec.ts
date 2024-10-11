import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMultiRandomComponent } from './create-multi-random.component';

describe('CreateMultiRandomComponent', () => {
  let component: CreateMultiRandomComponent;
  let fixture: ComponentFixture<CreateMultiRandomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateMultiRandomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateMultiRandomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
