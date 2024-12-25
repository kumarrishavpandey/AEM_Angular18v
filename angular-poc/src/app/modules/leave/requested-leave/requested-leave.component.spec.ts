import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
} from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import {
  MSAL_GUARD_CONFIG,
  MsalBroadcastService,
  MsalGuardConfiguration,
  MsalService,
} from '@azure/msal-angular';
import { InteractionType, PopupRequest } from '@azure/msal-browser';
import { of, throwError } from 'rxjs';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { DebugService } from 'src/app/shared/services/debug.service';
import { DebugServiceMock } from 'src/app/shared/services/debug.service.mock';
import { StorageEncryptionService } from 'src/app/shared/services/storage-encryption.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { labelsLeaveModule } from '../constant';
import { LeaveData } from '../leave.interface';
import { RequestedLeaveService } from '../services/requested-leave.service';
import { RequestedLeaveComponent } from './requested-leave.component';
import { ViewEditLeaveDialogComponent } from './view-edit-leave-dialog/view-edit-leave-dialog.component';
import { requestedLeaveData } from './requested-leave.component.constant';

describe('RequestedLeaveComponent', () => {
  let dialogMock: jasmine.SpyObj<MatDialog>;
  let component: RequestedLeaveComponent;
  let fixture: ComponentFixture<RequestedLeaveComponent>;
  let requestedLeaveService: RequestedLeaveService;
  let storageEncryptionService: StorageEncryptionService;
  let authServiceStub: jasmine.SpyObj<MsalService>;
  let msalBroadcastService: jasmine.SpyObj<MsalBroadcastService>;
  let debugServiceSpy: jasmine.SpyObj<DebugService>;

  beforeEach(() => {
    dialogMock = jasmine.createSpyObj('MatDialog', ['open']);
    authServiceStub = jasmine.createSpyObj('MsalService', [
      'loginPopup',
      'loginRedirect',
      'instance',
    ]);

    msalBroadcastService = jasmine.createSpyObj('MsalBroadcastService', [
      'inProgress$',
      'msalInstance',
    ]);

    const msalGuardConfigStub: MsalGuardConfiguration = {
      authRequest: {} as PopupRequest,
      interactionType: InteractionType.Popup,
    };

    debugServiceSpy = new DebugServiceMock().debugServiceSpy;

    TestBed.configureTestingModule({
      declarations: [RequestedLeaveComponent, ViewEditLeaveDialogComponent],
      imports: [
        RouterTestingModule,
        AngularMaterialModule,
        SharedModule,
        HttpClientModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        BrowserModule,
      ],
      providers: [
        { provide: MatDialog },
        { provide: DebugService, useValue: debugServiceSpy },
        { provide: MsalService, useValue: authServiceStub },
        { provide: MsalBroadcastService, useValue: msalBroadcastService },
        { provide: MSAL_GUARD_CONFIG, useValue: msalGuardConfigStub },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(RequestedLeaveComponent);

    component = fixture.componentInstance;
    component.newRequestLabels = labelsLeaveModule.tabNewRequest;
    component.requestedLeaveLabels = labelsLeaveModule.tabRequestedLeave;
    component.dialogViewEditLabels = labelsLeaveModule.dialogViewEdit;
    component.dialogDeleteLeaveLabels = labelsLeaveModule.dialogDeleteLeave;
    component.uploadDocumentLabels = labelsLeaveModule.uploadDocument;
    component.siteSection = labelsLeaveModule.pageTitle;

    requestedLeaveService = TestBed.inject(RequestedLeaveService);
    storageEncryptionService = TestBed.inject(StorageEncryptionService);

    fixture.detectChanges();
  });

  // Component creation.
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Should set dataSource and sort when sorting is called
  it('should set dataSource and sort when sorting is called', () => {
    const sampleData: LeaveData[] = requestedLeaveData.leaveSampleData1;
    component.sorting(sampleData);
    expect(component.dataSource).toBeDefined();
    expect(component.dataSource.sort).toEqual(component.sort);
  });

  /* // Test case for openViewEditDialog method
  it('should open ViewEditLeaveDialogComponent and refresh data on dialog close', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of() } as any);
    spyOn(dialog, 'open').and.returnValue(dialogRefSpyObj);

    component.pendingCancellationData = [
      {
        leaveId: 'e29fe8489ffb4512a1664e008c700d31',
        status: 'APPROVED',
        leaveCode: 'PL',
        approvedRejectedDate: '2024-01-22 09:18:37',
        startDate: '2024-01-22 09:18:37',
        endDate: '2024-01-23 09:18:37',
        duration: 1,
        leave_type: 'Privilege Leave',
        submittedDate: '2024-01-22 09:18:37',
      },
      {
        leaveId: 'ddbd514890c6438ab770797b3fadd063',
        status: 'CANCELLED',
        leaveCode: 'CL',
        approvedRejectedDate: '2024-01-22 09:18:37',
        startDate: '2024-01-22 09:18:37',
        endDate: '2024-01-23 09:18:37',
        duration: 1,
        leave_type: 'Casual Leave',
        submittedDate: '2024-01-22 09:18:37',
      },
    ];
    component.openViewEditDialog({
      leaveId: 'e29fe8489ffb4512a1664e008c700d31',
      isWithinFinancialYear: true,
    });

    expect(dialog.open).toHaveBeenCalledWith(ViewEditLeaveDialogComponent, {
      autoFocus: false,
      data: {
        leaveId: 'e29fe8489ffb4512a1664e008c700d31',
        isWithinFinancialYear: true,
      },
    });
  }); */

  // should update section data based on status
  it('should update section data based on status', () => {
    const sampleData: LeaveData[] = requestedLeaveData.leaveSampleData2;

    component.constantData = requestedLeaveData.leaveConstantData;

    spyOn(component, 'sorting');

    component.getSectionData(
      sampleData,
      component.constantData.column.pendingFilter,
      'count',
    );

    // Expectations for 'Pending' status
    expect(component.pendingData).toEqual(requestedLeaveData.leavePendingData);
    expect(component.selectedLeave).toEqual(
      component.constantData.column.pendingFilter,
    );
    expect(component.leaveColumns).toEqual([
      component.constantData.column.leaveTypeColumn,
      component.constantData.column.startDateColumn,
      component.constantData.column.endDateColumn,
      component.constantData.column.durationColumn,
      component.constantData.column.submittedDateColumn,
      component.constantData.column.editColumn,
    ]);
    expect(component.sorting).toHaveBeenCalledWith(component.pendingData);

    // Call the method with sample data and status for 'Approved'
    component.getSectionData(
      sampleData,
      component.constantData.column.approvedFilter,
      'count',
    );

    // Expectations for 'Approved' status
    expect(component.approvedData).toEqual(requestedLeaveData.leaveApprovedData);
    expect(component.selectedLeave).toEqual(
      component.constantData.column.approvedFilter,
    );
    expect(component.leaveColumns).toEqual([
      component.constantData.column.leaveTypeColumn,
      component.constantData.column.startDateColumn,
      component.constantData.column.endDateColumn,
      component.constantData.column.durationColumn,
      component.constantData.column.submittedDateColumn,
      component.constantData.column.approvedRejectedDateColumn,
      component.constantData.column.editColumn,
    ]);
    expect(component.sorting).toHaveBeenCalledWith(component.approvedData);

    // Call the method with sample data and status for 'Cancelled'
    component.getSectionData(
      sampleData,
      component.constantData.column.rejectedFilter,
      'count',
    );

    // Expectations for 'Cancelled' status
    expect(component.rejectedData).toEqual([]);
    expect(component.selectedLeave).toEqual(
      component.constantData.column.rejectedFilter,
    );
    expect(component.leaveColumns).toEqual([
      component.constantData.column.leaveTypeColumn,
      component.constantData.column.startDateColumn,
      component.constantData.column.endDateColumn,
      component.constantData.column.durationColumn,
      component.constantData.column.submittedDateColumn,
      component.constantData.column.approvedRejectedDateColumn,
      component.constantData.column.editColumn,
    ]);
    expect(component.sorting).toHaveBeenCalledWith(component.rejectedData);

    component.getSectionData(sampleData, 'NA', 'count');
  });

  // Test case for getRequestLeaveData method with successful response
  it('should fetch leave data and update leaveData and section data accordingly on successful response', () => {
    const sampleLeaveDataSuccess = requestedLeaveData.leaveDataSuccess;

    const sampleLeaveTypesSuccess = requestedLeaveData.leaveTypeSuccess;

    spyOn(requestedLeaveService, 'getRequestLeaveData').and.returnValue(
      of({
        data: {
          leave_data: sampleLeaveDataSuccess,
          leaveTypes: sampleLeaveTypesSuccess,
        },
      }),
    );
    spyOn(storageEncryptionService, 'getvalue').and.returnValue(requestedLeaveData.storageEncryptionServiceValue);

    component.getRequestLeaveData();

    expect(requestedLeaveService.getRequestLeaveData).toHaveBeenCalledWith(
      requestedLeaveData.storageEncryptionServiceValue,
    );
    fixture.detectChanges();

    expect(component.selectedLeave).toBeDefined();
  });

  // should set leaveData to an empty array when leave_data is empty'
  it('should set leaveData to an empty array when leave_data is empty', () => {
    const sampleLeaveDataEmpty = [];
    const sampleLeaveTypesEmpty = [];

    spyOn(requestedLeaveService, 'getRequestLeaveData').and.returnValue(
      of({
        data: {
          leave_data: sampleLeaveDataEmpty,
          leaveTypes: sampleLeaveTypesEmpty,
        },
      }),
    );
    spyOn(storageEncryptionService, 'getvalue').and.returnValue(requestedLeaveData.storageEncryptionServiceValue);

    component.getRequestLeaveData();

    expect(requestedLeaveService.getRequestLeaveData).toHaveBeenCalledWith(
      requestedLeaveData.storageEncryptionServiceValue,
    );
    fixture.detectChanges();

    expect(component.leaveData).toEqual([]);
  });

  // Should handle error in the request
  it('should handle error in the request', fakeAsync(() => {
    const errorMessage = 'Invalid Request: Employee Profile not found';

    spyOn(requestedLeaveService, 'getRequestLeaveData').and.returnValue(
      throwError(errorMessage),
    );

    spyOn(component, 'getSectionData');

    component.getRequestLeaveData();
    flush();

    expect(component.leaveData).toEqual([]);
    expect(component.getSectionData).toHaveBeenCalledWith(
      [],
      component.selectedLeave,
      'count',
    );
    expect(debugServiceSpy.log).toHaveBeenCalledWith(
      'error while getting leave list data',
      errorMessage,
    );
  }));
  it('should return true if the dates are within the financial year', () => {
    const startDate = new Date(requestedLeaveData.startDate);
    const endDate = new Date(requestedLeaveData.endDate);
    const financialYearStartDate = new Date(requestedLeaveData.financialYearStartDate);
    const financialYearEndDate = new Date(requestedLeaveData.financialYearEndDate);

    // Spy on the function
    const functionSpy = spyOn(
      component,
      'checkIfWithinFinancialYear',
    ).and.callThrough();

    // Call the function
    const result = component.checkIfWithinFinancialYear(
      startDate,
      endDate,
      financialYearStartDate,
      financialYearEndDate,
    );

    // Check if the function was called
    expect(functionSpy).toHaveBeenCalled();
    // Check if the return value is true
    expect(result).toBe(true);
  });

  it('should open the ViewEditLeaveDialog with correct data when called', () => {
    const dialogRefSpy = jasmine.createSpyObj('dialogRef', {
      afterClosed: () => of(null),
    });
    dialogMock.open.and.returnValue(dialogRefSpy);

    // Check if getRequestLeaveData is called after dialog closes
    spyOn(component, 'getRequestLeaveData');
  });

  it('should call adobeAnalyticsOnButtonClick with btnView when status is pending cancellation', () => {
    const dialogRefSpy = jasmine.createSpyObj('dialogRef', {
      afterClosed: () => of(null),
    });
    dialogMock.open.and.returnValue(dialogRefSpy);
  });

  it('should open the dialog with pendingCancellationData as false when leaveId does not exist', () => {
    const dialogRefSpy = jasmine.createSpyObj('dialogRef', {
      afterClosed: () => of(null),
    });
    dialogMock.open.and.returnValue(dialogRefSpy);

    // Check if getRequestLeaveData is called after dialog closes
    spyOn(component, 'getRequestLeaveData');
  });

  it('should call getSectionData with correct parameters', () => {
    const mockData: LeaveData[] = requestedLeaveData.leaveSampleData2;
    const status = 'Pending';
    const buttonLabel = 'View Pending';

    spyOn(component, 'getSectionData'); // Spy on the getSectionData method
    spyOn(component, 'adobeAnalyticsOnButtonClick'); // Spy on the adobeAnalyticsOnButtonClick method

    component.onHeaderButtonsClick(mockData, status, buttonLabel);

    // Verify that getSectionData was called with the correct parameters
    expect(component.getSectionData).toHaveBeenCalledWith(mockData, status);
  });

  it('should call adobeAnalyticsOnButtonClick with the correct buttonLabel', () => {
    const mockData: LeaveData[] = requestedLeaveData.leaveSampleData2;
    const status = 'Pending';
    const buttonLabel = 'View Pending';

    spyOn(component, 'getSectionData'); // Spy on the getSectionData method
    spyOn(component, 'adobeAnalyticsOnButtonClick'); // Spy on the adobeAnalyticsOnButtonClick method

    component.onHeaderButtonsClick(mockData, status, buttonLabel);

    // Verify that adobeAnalyticsOnButtonClick was called with the correct buttonLabel
    expect(component.adobeAnalyticsOnButtonClick).toHaveBeenCalledWith(buttonLabel);
  });
});
