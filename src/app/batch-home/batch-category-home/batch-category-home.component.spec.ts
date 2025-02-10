import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchCategoryHomeComponent } from './batch-category-home.component';

describe('BatchCategoryHomeComponent', () => {
  let component: BatchCategoryHomeComponent;
  let fixture: ComponentFixture<BatchCategoryHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BatchCategoryHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BatchCategoryHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
