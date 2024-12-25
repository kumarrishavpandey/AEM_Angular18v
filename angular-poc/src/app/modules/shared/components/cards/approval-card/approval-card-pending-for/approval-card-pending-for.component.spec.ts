import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApprovalCardService } from 'src/app/shared/components/cards/approval-card/approval-card.service';
import { EnumApprovalCardRequestStatus } from 'src/app/shared/components/cards/approval-card/approval-card-status/approval-card-status.enum';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ApprovalCardPendingForComponent } from './approval-card-pending-for.component';

describe('ApprovalCardPendingForComponent', () => {
  let component: ApprovalCardPendingForComponent;
  let fixture: ComponentFixture<ApprovalCardPendingForComponent>;
  let approvalCardServiceSpy: jasmine.SpyObj<ApprovalCardService>;

  beforeEach(async () => {
    approvalCardServiceSpy = jasmine.createSpyObj('ApprovalCardService', ['getDaysDifference']);

    await TestBed.configureTestingModule({
      declarations: [ApprovalCardPendingForComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: ApprovalCardService, useValue: approvalCardServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ApprovalCardPendingForComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('shouldShowPendingForData', () => {
    it('should return true if lastModifiedDateTime is defined and days difference is greater than 0', () => {
      const date = new Date();
      approvalCardServiceSpy.getDaysDifference.and.returnValue(1);
      component.lastModifiedDateTime = date;

      expect(component.shouldShowPendingForData()).toBeTrue();
    });

    it('should return false if lastModifiedDateTime is undefined', () => {
      component.lastModifiedDateTime = undefined;

      expect(component.shouldShowPendingForData()).toBeFalse();
    });

    it('should return false if days difference is 0', () => {
      const date = new Date();
      approvalCardServiceSpy.getDaysDifference.and.returnValue(0);
      component.lastModifiedDateTime = date;

      expect(component.shouldShowPendingForData()).toBeFalse();
    });
  });

  describe('getPendingForData', () => {
    it('should return the days difference as a string', () => {
      const date = new Date();
      approvalCardServiceSpy.getDaysDifference.and.returnValue(5);
      component.lastModifiedDateTime = date;

      expect(component.getPendingForData()).toBe('5');
    });
  });

  describe('getPendingForDayLabel', () => {
    it('should return labelDays if days difference is greater than 1', () => {
      const date = new Date();
      approvalCardServiceSpy.getDaysDifference.and.returnValue(2);
      component.labelDays = 'Days';
      component.labelDay = 'Day';
      component.lastModifiedDateTime = date;

      expect(component.getPendingForDayLabel()).toBe('Days');
    });

    it('should return labelDay if days difference is 1', () => {
      const date = new Date();
      approvalCardServiceSpy.getDaysDifference.and.returnValue(1);
      component.labelDays = 'Days';
      component.labelDay = 'Day';
      component.lastModifiedDateTime = date;

      expect(component.getPendingForDayLabel()).toBe('Day');
    });
  });

  describe('isPendingCancellation', () => {
    it('should return true if requestStatus is PENDING_CANCELLATION', () => {
      component.requestStatus = EnumApprovalCardRequestStatus.PENDING_CANCELLATION;

      expect(component.isPendingCancellation()).toBeTrue();
    });

    it('should return false if requestStatus is not PENDING_CANCELLATION', () => {
      component.requestStatus = 'OTHER_STATUS';

      expect(component.isPendingCancellation()).toBeFalse();
    });

    it('should return false if requestStatus is undefined', () => {
      component.requestStatus = undefined;

      expect(component.isPendingCancellation()).toBeUndefined();
    });
  });

  describe('getPendingForLabel', () => {
    it('should return labelPendingCancellationFor if requestStatus is PENDING_CANCELLATION', () => {
      component.requestStatus = EnumApprovalCardRequestStatus.PENDING_CANCELLATION;
      component.labelPendingCancellationFor = 'Pending Cancellation';
      component.labelPendingFor = 'Pending For';

      expect(component.getPendingForLabel()).toBe('Pending Cancellation');
    });

    it('should return labelPendingFor if requestStatus is not PENDING_CANCELLATION', () => {
      component.requestStatus = 'OTHER_STATUS';
      component.labelPendingCancellationFor = 'Pending Cancellation';
      component.labelPendingFor = 'Pending For';

      expect(component.getPendingForLabel()).toBe('Pending For');
    });
  });
});
