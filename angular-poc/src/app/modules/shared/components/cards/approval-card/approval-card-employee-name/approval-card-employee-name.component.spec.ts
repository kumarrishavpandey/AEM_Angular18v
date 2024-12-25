import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalCardEmployeeNameComponent } from './approval-card-employee-name.component';

describe('ApprovalCardEmployeeNameComponent', () => {
  let component: ApprovalCardEmployeeNameComponent;
  let fixture: ComponentFixture<ApprovalCardEmployeeNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApprovalCardEmployeeNameComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalCardEmployeeNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
