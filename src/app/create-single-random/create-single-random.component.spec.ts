import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSingleRandomComponent } from './create-single-random.component';

describe('CreateSingleRandomComponent', () => {
  let component: CreateSingleRandomComponent;
  let fixture: ComponentFixture<CreateSingleRandomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateSingleRandomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateSingleRandomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
