import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockedTestsComponent } from './locked-tests.component';

describe('LockedTestsComponent', () => {
  let component: LockedTestsComponent;
  let fixture: ComponentFixture<LockedTestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LockedTestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LockedTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
