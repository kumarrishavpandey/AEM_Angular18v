import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalCardSkeletonComponent } from './approval-card-skeleton.component';

describe('ApprovalCardSkeletonComponent', () => {
  let component: ApprovalCardSkeletonComponent;
  let fixture: ComponentFixture<ApprovalCardSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApprovalCardSkeletonComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalCardSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
