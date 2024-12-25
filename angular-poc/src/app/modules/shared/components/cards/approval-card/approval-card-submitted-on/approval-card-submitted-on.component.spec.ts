import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ApprovalCardSubmittedOnComponent } from './approval-card-submitted-on.component';

describe('ApprovalCardSubmittedOnComponent', () => {
  let component: ApprovalCardSubmittedOnComponent;
  let fixture: ComponentFixture<ApprovalCardSubmittedOnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApprovalCardSubmittedOnComponent],
      providers: [DatePipe],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalCardSubmittedOnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should format date correctly', () => {
    component.submittedOn = new Date('2024-10-08T14:46:43Z');
    const formattedDate = component.formatDate(component.submittedOn);
    expect(formattedDate).toBe('08 Oct 2024');
  });

  it('should return null string when submittedOn is null', () => {
    component.submittedOn = null;
    const formattedDate = component.formatDate(component.submittedOn);
    expect(formattedDate).toBe(null);
  });

  it('should return null string when submittedOn is undefined', () => {
    component.submittedOn = undefined;
    expect(component.formatDate(component.submittedOn)).toBe(null);
  });
});
