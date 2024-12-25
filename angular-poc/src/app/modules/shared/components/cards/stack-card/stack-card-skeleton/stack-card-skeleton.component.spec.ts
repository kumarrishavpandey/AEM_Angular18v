import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackCardSkeletonComponent } from './stack-card-skeleton.component';

describe('StackCardSkeletonComponent', () => {
  let component: StackCardSkeletonComponent;
  let fixture: ComponentFixture<StackCardSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StackCardSkeletonComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StackCardSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
