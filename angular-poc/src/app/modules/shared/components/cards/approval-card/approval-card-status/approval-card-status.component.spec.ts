import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalCardStatusComponent } from './approval-card-status.component';

describe('ApprovalCardStatusComponent', () => {
  let component: ApprovalCardStatusComponent;
  let fixture: ComponentFixture<ApprovalCardStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApprovalCardStatusComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalCardStatusComponent);
    component = fixture.componentInstance;

    component.requestStatus = 'Approved';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should convert request status to title case', () => {
    component.requestStatus = 'test status';
    expect(component.getRequestStatus()).toBe('Test Status');
  });

  it('should handle empty request status', () => {
    component.requestStatus = '';
    expect(component.getRequestStatus()).toBe('');
    expect(component.getRequestStatusClass()).toBe('');
  });
});
