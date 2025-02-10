import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBatchCategoryComponent } from './create-batch-category.component';

describe('CreateBatchCategoryComponent', () => {
  let component: CreateBatchCategoryComponent;
  let fixture: ComponentFixture<CreateBatchCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateBatchCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateBatchCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
