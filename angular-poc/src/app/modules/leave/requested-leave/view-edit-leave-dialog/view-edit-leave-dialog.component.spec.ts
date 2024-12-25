import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  tick,
} from '@angular/core/testing';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
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
import { CommonCalendarComponent } from 'src/app/shared/components/common-calendar/common-calendar.component';
import { CommonDropdownComponent } from 'src/app/shared/components/common-dropdown/common-dropdown.component';
import { CommonSuccessDialogWithoutButtonsComponent } from 'src/app/shared/components/common-success-dialog-without-buttons/common-success-dialog-without-buttons.component';
import { CommonWarningDialogWithButtonsComponent } from 'src/app/shared/components/common-warning-dialog-with-buttons/common-warning-dialog-with-buttons.component';
import { AnalyticsInfoData } from 'src/app/shared/constants';
import { AdobeAnalyticsServiceMock } from 'src/app/shared/services/__mock__/adobe-analytics.service.mock';
import { AdobeAnalyticsService } from 'src/app/shared/services/adobe-analytics.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { DebugService } from 'src/app/shared/services/debug.service';
import { StorageEncryptionService } from 'src/app/shared/services/storage-encryption.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { labelsLeaveModule } from '../../constant';
import { newLeaveRequestJson } from '../../leave-constant';
import { NewRequestService } from '../../services/new-request.service';
import { RequestedLeaveService } from '../../services/requested-leave.service';
import { ViewEditLeaveDialogComponent } from './view-edit-leave-dialog.component';
import { viewEditLeaveData } from './view-edit-leave-dialog.component.constant';

const mockMatDialogData = {
  siteSection: labelsLeaveModule.tabRequestedLeave.labelTab,
  leaveId: 'testId',
  newRequestLabels: labelsLeaveModule.tabNewRequest,
  dialogViewEditLabels: labelsLeaveModule.dialogViewEdit,
  dialogDeleteLeaveLabels: labelsLeaveModule.dialogDeleteLeave,
  uploadDocumentLabels: labelsLeaveModule.uploadDocument,
  isWithinFinancialYear: true,
  pendingCancellationData: false,
};

describe('ViewEditLeaveDialogComponent', () => {
  let component: ViewEditLeaveDialogComponent;
  let fixture: ComponentFixture<ViewEditLeaveDialogComponent>;
  let mockStorageEncryptionService: jasmine.SpyObj<StorageEncryptionService>;
  let mockRequestedLeaveService: jasmine.SpyObj<RequestedLeaveService>;
  let mockNewRequestService: jasmine.SpyObj<NewRequestService>;
  let mockCommonService: jasmine.SpyObj<CommonService>;
  let fb: FormBuilder;
  let dialogMock: jasmine.SpyObj<MatDialog>;
  let authServiceStub: jasmine.SpyObj<MsalService>;
  let msalBroadcastService: jasmine.SpyObj<MsalBroadcastService>;

  let adobeAnalyticsServiceSpy: AdobeAnalyticsService;

  beforeEach(() => {
    adobeAnalyticsServiceSpy = new AdobeAnalyticsServiceMock()
      .adobeAnalyticsServiceSpy;

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
    dialogMock = jasmine.createSpyObj('MatDialog', ['open', 'close']);
    mockStorageEncryptionService = jasmine.createSpyObj(
      'StorageEncryptionService',
      ['getvalue'],
    );

    mockRequestedLeaveService = jasmine.createSpyObj('RequestedLeaveService', [
      'getLeaveDataWithId',
      'cancelLeaveRequestApi',
      'deleteLeaveRequestApi',
      'uploadAttachmentWithApi',
      'updateLeaveRequestApi',
    ]);

    mockRequestedLeaveService.getLeaveDataWithId.and.returnValue(of());
    mockRequestedLeaveService.cancelLeaveRequestApi.and.returnValue(of({}));

    mockNewRequestService = jasmine.createSpyObj('NewRequestService', [
      'getDurationAndReturnToWork',
      'getLeaveTypeAndBalanceApi',
    ]);

    mockNewRequestService.getDurationAndReturnToWork.and.returnValue(of({}));

    mockNewRequestService.getLeaveTypeAndBalanceApi.and.returnValue(
      of(viewEditLeaveData.getPickList),
    );

    mockCommonService = jasmine.createSpyObj('CommonService', [
      'getPickList',
      'fetchLoggedInEmployeeData',
      'getEmpDataStatus',
    ]);

    mockCommonService.getPickList.and.returnValue(of({}));

    mockCommonService.fetchLoggedInEmployeeData.and.returnValue(of({}));
    mockCommonService.getEmpDataStatus.and.returnValue(of(viewEditLeaveData.getEmpDataStatus));

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularMaterialModule,
        SharedModule,
        HttpClientModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        BrowserModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [
        ViewEditLeaveDialogComponent,
        CommonCalendarComponent,
        CommonDropdownComponent,
      ],
      providers: [
        { provide: MatDialog, useValue: dialogMock },
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA,
          useValue: mockMatDialogData,
        },
        {
          provide: AdobeAnalyticsService,
          useValue: adobeAnalyticsServiceSpy,
        },
        {
          provide: StorageEncryptionService,
          useValue: mockStorageEncryptionService,
        },
        { provide: RequestedLeaveService, useValue: mockRequestedLeaveService },
        { provide: NewRequestService, useValue: mockNewRequestService },
        { provide: CommonService, useValue: mockCommonService },
        { provide: MsalService, useValue: authServiceStub },
        { provide: MsalBroadcastService, useValue: msalBroadcastService },
        { provide: MSAL_GUARD_CONFIG, useValue: msalGuardConfigStub },
      ],
    });

    mockRequestedLeaveService = TestBed.inject(
      RequestedLeaveService,
    ) as jasmine.SpyObj<RequestedLeaveService>;
    mockNewRequestService = TestBed.inject(
      NewRequestService,
    ) as jasmine.SpyObj<NewRequestService>;
    mockCommonService = TestBed.inject(
      CommonService,
    ) as jasmine.SpyObj<CommonService>;
    mockStorageEncryptionService = TestBed.inject(
      StorageEncryptionService,
    ) as jasmine.SpyObj<StorageEncryptionService>;
    dialogMock = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;

    fixture = TestBed.createComponent(ViewEditLeaveDialogComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);
    component.editLeaveForm = fb.group(viewEditLeaveData.editLeavesFormData);

    adobeAnalyticsServiceSpy.setAnalyticsInfo(AnalyticsInfoData);

    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set leaveBalance to 0 when leaveTypesOptionArray is not provided', () => {
    component.getLeaveBalance();
    expect(component.leaveBalance).toBe(viewEditLeaveData.leaveBalanceValue);
  });

  it('should set leaveBalance to the balance of the selected leave type when it exists', () => {
    const leaveTypesOptionArray = viewEditLeaveData.leaveTypesOptionData;
    component.leaveTypesOptionArray = leaveTypesOptionArray;

    component.editLeaveForm = new FormGroup({
      leaveType: new FormControl(viewEditLeaveData.editLeaveTypeFormValue),
    });

    component.editLeaveForm.controls.leaveType.setValue(viewEditLeaveData.editLeaveFormSetValues);
    component.getLeaveBalance();

    expect(component.leaveBalance).toBe(viewEditLeaveData.selectedLeaveTypeBalance);
  });

  it('should set leaveDuration and returningToWorkDate when valid data is returned from the service', fakeAsync(() => {
    const startDate = new Date();
    const endDate = new Date();
    const leaveType = viewEditLeaveData.editLeaveFormSetValues;

    component.editLeaveForm = new FormGroup({
      startDate: new FormControl(startDate),
      endDate: new FormControl(endDate),
      leaveType: new FormControl(leaveType),
      leaveDuration: new FormControl(viewEditLeaveData.leaveDuration),
      returningToWorkDate: new FormControl(viewEditLeaveData.returningToWorkDate),
    });

    const mockResponse = {
      data: {
        duration: viewEditLeaveData.selectedLeaveTypeBalance,
        returningToWorkDate: new Date(),
      },
    };

    mockNewRequestService.getDurationAndReturnToWork.and.returnValue(
      of(mockResponse),
    );

    component.getLeaveDurationAndReturnToWorkFromApi();

    fixture.whenStable().then(() => {
      expect(component.editLeaveForm.controls.leaveDuration.value).toBe(
        mockResponse.data.duration,
      );
      expect(
        component.editLeaveForm.controls.returningToWorkDate.value,
      ).toEqual(mockResponse.data.returningToWorkDate);
    });
  }));

  it('should update leaveBalanceDynamicTitle, call getLeaveBalance, checkValidation, showLeaveBalance, and getLeaveDurationAndReturnToWorkFromApi', () => {
    const mockEvent = { label: viewEditLeaveData.leaveDurationLabel };

    component.editLeaveForm = fb.group(viewEditLeaveData.editLeaveFormData2);

    spyOn(component, 'getLeaveBalance');
    spyOn(component, 'checkValidation');
    spyOn(component, 'showLeaveBalance');
    spyOn(
      component,
      'getLeaveDurationAndReturnToWorkFromApi',
    ).and.callThrough();

    component.selectValueChange(mockEvent);

    expect(component.leaveBalanceDynamicTitle).toEqual(mockEvent.label);

    expect(component.getLeaveBalance).toHaveBeenCalled();
    expect(component.checkValidation).toHaveBeenCalled();
    expect(component.showLeaveBalance).toHaveBeenCalled();

    expect(component.getLeaveDurationAndReturnToWorkFromApi).toHaveBeenCalled();
  });

  it('should select value change function call', () => {
    const mockEvent = { label: null };
    component.selectValueChange(mockEvent);
    expect(component.leaveBalanceDynamicTitle).toEqual('');
  });

  it('should show leave balance field when leave type is casual leave', () => {
    component.editLeaveForm = fb.group({
      leaveType: component.leaveTypesCode.casualLeave,
    });

    component.showLeaveBalance();

    expect(component.showLeaveBalanceField).toBeTruthy();
  });
  it('should show leave balance field when leave type is something else', () => {
    component.editLeaveForm = fb.group({
      leaveType: viewEditLeaveData.testLeave,
    });

    component.showLeaveBalance();

    expect(component.showLeaveBalanceField).toBeFalsy();
  });

  describe('dateValueChange', () => {
    it('should call getLeaveDurationAndReturnToWorkFromApi when leave type is not provided', () => {
      component.editLeaveForm = fb.group({
        leaveType: viewEditLeaveData.pendingLeaveType,
      });

      spyOn(component, 'getLeaveDurationAndReturnToWorkFromApi');

      component.dateValueChange();

      expect(
        component.getLeaveDurationAndReturnToWorkFromApi,
      ).toHaveBeenCalled();
    });

    it('should not call getLeaveDurationAndReturnToWorkFromApi when leave type is not provided', () => {
      component.editLeaveForm = fb.group({
        leaveType: viewEditLeaveData.getLeaveDuration,
      });

      spyOn(component, 'getLeaveDurationAndReturnToWorkFromApi');

      component.dateValueChange();

      expect(
        component.getLeaveDurationAndReturnToWorkFromApi,
      ).not.toHaveBeenCalled();
    });

    it('should not call getLeaveDurationAndReturnToWorkFromApi when leave type is undefined', () => {
      component.editLeaveForm = fb.group({
        leaveType: viewEditLeaveData.getLeaveDurationNotDefined,
      });

      spyOn(component, 'getLeaveDurationAndReturnToWorkFromApi');

      component.dateValueChange();

      expect(
        component.getLeaveDurationAndReturnToWorkFromApi,
      ).not.toHaveBeenCalled();
    });
  });

  it('should remove the document and update related properties', () => {
    spyOn(component, 'checkValidation');
    component.selectedUploadDocument = { size: 12321, name: 'Document_1.png' };
    component.showFileUploader = false;
    component.isAttachmentFileUploaded = true;

    component.editLeaveForm = new FormGroup({
      attachmentName: new FormControl(viewEditLeaveData.attachmentName),
      attachmentId: new FormControl(viewEditLeaveData.attachmentId),
      prevAttachmentId: new FormControl(viewEditLeaveData.attachmentId),
    });

    component.removeDocument();

    expect(component.selectedUploadDocument).toBeNull();
    expect(component.editLeaveForm.controls.attachmentId.value).toBeNull();
    expect(component.editLeaveForm.controls.prevAttachmentId.value).toBeNull();
    expect(component.editLeaveForm.controls.attachmentName.value).toBeNull();
    expect(component.showFileUploader).toBeTruthy();
    expect(component.isAttachmentFileUploaded).toBeFalsy();

    expect(component.checkValidation).toHaveBeenCalled();
  });

  it('should return formatted date when a valid date is provided', () => {
    const date = viewEditLeaveData.formatedDate;

    const formattedDate = component.getReturningDateInFormat(date);

    expect(formattedDate).toBe(viewEditLeaveData.testFormattedDate);
  });

  it('should return "-" when an invalid or undefined date is provided', () => {
    const invalidDate = undefined;

    const formattedDate = component.getReturningDateInFormat(invalidDate);

    expect(formattedDate).toBe(viewEditLeaveData.hyphen);
  });

  it('should return true if leave type is relocationGma', () => {
    const leaveTypeControl = component.editLeaveForm.controls.leaveType;
    leaveTypeControl.setValue(component.leaveTypesCode.relocationGma);

    const result = component.showDateOfRelocation();

    expect(result).toBeTruthy();
  });

  it('should return true if leave type is relocationPdr', () => {
    const leaveTypeControl = component.editLeaveForm.controls.leaveType;
    leaveTypeControl.setValue(component.leaveTypesCode.relocationPdr);

    const result = component.showDateOfRelocation();

    expect(result).toBeTruthy();
  });

  it('should return true if leave type is relocationTdr', () => {
    const leaveTypeControl = component.editLeaveForm.controls.leaveType;
    leaveTypeControl.setValue(component.leaveTypesCode.relocationTdr);

    const result = component.showDateOfRelocation();

    expect(result).toBeTruthy();
  });

  it('should return true if leave type is repatriationGma', () => {
    const leaveTypeControl = component.editLeaveForm.controls.leaveType;
    leaveTypeControl.setValue(component.leaveTypesCode.repatriationGma);

    const result = component.showDateOfRelocation();

    expect(result).toBeTruthy();
  });

  it('should return false for other leave types', () => {
    const leaveTypeControl = component.editLeaveForm.controls.leaveType;
    leaveTypeControl.setValue(viewEditLeaveData.leaveTypeControl);

    const result = component.showDateOfRelocation();

    expect(result).toBeFalsy();
  });

  it('should return true if leave type is maternityLeave', () => {
    const leaveTypeControl = component.editLeaveForm.controls.leaveType;
    leaveTypeControl.setValue(component.leaveTypesCode.maternityLeave);

    const result = component.showDateOfDelivery();

    expect(result).toBeTruthy();
  });

  it('should return true if leave type is paternityLeave', () => {
    const leaveTypeControl = component.editLeaveForm.controls.leaveType;
    leaveTypeControl.setValue(component.leaveTypesCode.paternityLeave);

    const result = component.showDateOfDelivery();

    expect(result).toBeTruthy();
  });

  it('should return false for other leave types', () => {
    const leaveTypeControl = component.editLeaveForm.controls.leaveType;
    leaveTypeControl.setValue(viewEditLeaveData.leaveTypeControl);

    const result = component.showDateOfDelivery();

    expect(result).toBeFalsy();
  });

  it('should return true if leave type is adoptionLeave', () => {
    const leaveTypeControl = component.editLeaveForm.controls.leaveType;
    leaveTypeControl.setValue(component.leaveTypesCode.adoptionLeave);

    const result = component.isLeaveAdoption();

    expect(result).toBeTruthy();
  });

  it('should return false for other leave types', () => {
    const leaveTypeControl = component.editLeaveForm.controls.leaveType;
    leaveTypeControl.setValue(viewEditLeaveData.leaveTypeControl);

    const result = component.isLeaveAdoption();

    expect(result).toBeFalsy();
  });

  it('should return true if leave type is surrogacyLeave', () => {
    const leaveTypeControl = component.editLeaveForm.controls.leaveType;
    leaveTypeControl.setValue(component.leaveTypesCode.surrogacyLeave);

    const result = component.showExpectedDateOfChild();

    expect(result).toBeTruthy();
  });

  it('should return true if leave type is compoff', () => {
    const leaveTypeControl = component.editLeaveForm.controls.leaveType;
    leaveTypeControl.setValue(component.leaveTypesCode.compensatory);

    const result = component.showDateOfCompoff();

    expect(result).toBeTruthy();
  });

  it('should return true if leave type is miscarriage', () => {
    const leaveTypeControl = component.editLeaveForm.controls.leaveType;
    leaveTypeControl.setValue(component.leaveTypesCode.miscarriageLeave);

    const result = component.showDateOfMiscarriage();

    expect(result).toBeTruthy();
  });

  it('should return false for other leave types', () => {
    const leaveTypeControl = component.editLeaveForm.controls.leaveType;
    leaveTypeControl.setValue(viewEditLeaveData.leaveTypeControl);

    const result = component.showExpectedDateOfChild();

    expect(result).toBeFalsy();
  });

  it('should call checkValidation on onFractionalQuantityChange', () => {
    spyOn(component, 'checkValidation');

    component.onFractionalQuantityChange();

    expect(component.checkValidation).toHaveBeenCalled();
  });

  it('should call showApiErrorMessages', () => {
    const { mockErrors } = viewEditLeaveData;
    const mockElement = document.createElement('div');
    mockElement.id = viewEditLeaveData.mockElementId;
    spyOn(document, 'getElementById').and.returnValue(mockElement);
    component.showApiErrorMessages(mockErrors);
    expect(mockElement.scrollTop).toBe(viewEditLeaveData.leaveBalanceValue);
  });

  it('should run the function on the success of file upload', fakeAsync(() => {
    component.editLeaveForm = new FormGroup({
      attachmentName: new FormControl(viewEditLeaveData.mockName),
    });
    component.isAttachmentFileUploaded = false;
    component.selectedUploadDocument;
    /* eslint @typescript-eslint/no-unused-expressions: 'off' */
    component.showFileUploader = viewEditLeaveData.getEmpDataStatus;
    const mockFile = viewEditLeaveData.mockFile as File;
    component.onFileSuccessfullyUpload(mockFile);
    expect(component.isAttachmentFileUploaded).toEqual(viewEditLeaveData.getEmpDataStatus);
    expect(component.selectedUploadDocument).toEqual(mockFile);
    flush();
    expect(component.showFileUploader).toEqual(viewEditLeaveData.showFileUploader);
  }));

  // it('should run function onSizeOrTypeErrorInSelectDocument when there is type or size error for document', () => {
  //   component.documentSizeOrTypeError = false;
  //   const mockCondition = true;
  //   component.onSizeOrTypeErrorInSelectDocument(mockCondition);
  //   expect(component.documentSizeOrTypeError).toEqual(true);
  // });

  // it('should handle errors when the getLeaveAndCreateForm function runs error', fakeAsync(() => {
  //   const mockError = new Error('Service error');
  //   spyOn(component, 'createAddEditIfNoDataFromApi');
  //   mockRequestedLeaveService.getLeaveDataWithId.and.returnValue(
  //     throwError(mockError),
  //   );
  //   component.getLeaveAndCreateForm();

  //   fixture.whenStable().then(() => {
  //     expect(component.createAddEditIfNoDataFromApi).toHaveBeenCalled();
  //     expect(component.formIsCreated).toEqual(true);
  //   });
  // }));

  it('should call update leave api with error', fakeAsync(() => {
    const errorMessage = viewEditLeaveData.mockErrorMessage;
    component.isLoadingOnLeaveSubmit = viewEditLeaveData.getEmpDataStatus;

    mockRequestedLeaveService.updateLeaveRequestApi.and.returnValue(
      throwError({ error: { status: { message: errorMessage } } }),
    );
    spyOn(component, 'showApiErrorMessages');
    const samplePayload = {};
    component.updateLeaveRequest(samplePayload, {});

    tick(1000);

    fixture.whenStable().then(() => {
      expect(component.isLoadingOnLeaveSubmit).toEqual(viewEditLeaveData.showFileUploader);
      expect(component.showApiErrorMessages).toHaveBeenCalledWith(errorMessage);
    });
  }));

  /* Get child age dropdown */
  it('should run the function getChildAgeOptionsListFromPickList to get child age dropdown from picklist', () => {
    const mockResponse = [
      {
        Picklist: viewEditLeaveData.pickListData,
      },
    ];
    component.employeeChildAgeOptionsArray = [];

    mockCommonService.getPickList.and.returnValue(of(mockResponse));
    component.getChildAgeOptionsListFromPickList();

    expect(component.employeeChildAgeOptionsArray).toBeTruthy();
  });

  it('should run the function getChildAgeOptionsListFromPickList to get child age dropdown from picklist wand give error', () => {
    const errorMessage = 'Error while getting child age';
    spyOn(DebugService.prototype, 'log');
    component.employeeChildAgeOptionsArray = [];
    mockCommonService.getPickList.and.returnValue(
      throwError({ error: { status: { message: errorMessage } } }),
    );
    component.getChildAgeOptionsListFromPickList();

    fixture.whenStable().then(() => {
      expect(component.employeeChildAgeOptionsArray).toEqual([]);
      // expect(DebugService.prototype.log).toHaveBeenCalledWith(
      //   'error while getting  picklist',
      // );
    });
  });

  it('should return true when leaveDuration is not set', () => {
    component.editLeaveForm.patchValue({ leaveDuration: viewEditLeaveData.leaveDuration }); // setting leaveDuration to null
    expect(component.checkValidation()).toBeTruthy(); // expect true as leaveDuration is not set
  });

  it('should return true when leave type is casualLeave, duration is 1, and fractionQuantity is missing', () => {
    component.editLeaveForm.patchValue({
      leaveType: component.leaveTypesCode.casualLeave,
      leaveDuration: viewEditLeaveData.setLeaveDuration1,
      fractionQuantity: viewEditLeaveData.leaveDuration,
    });
    expect(component.checkValidation()).toBeTruthy(); // expect true as fractionQuantity is missing
  });

  it('should return true when all conditions are met', () => {
    component.editLeaveForm.patchValue({
      leaveType: component.leaveTypesCode.casualLeave,
      leaveDuration: viewEditLeaveData.setLeaveDuration2,
      fractionQuantity: viewEditLeaveData.fractionQuantityValue,
    });
    expect(component.checkValidation()).toBeTruthy(); // expect true as all conditions are met
  });

  describe('resetLeaveApplicationForm', () => {
    it('should reset the editLeaveForm and set documentSizeOrTypeError to false', () => {
      // Set up a dummy form group for testing
      component.createAddEditIfNoDataFromApi;
      component.editLeaveForm.patchValue({ leaveId: viewEditLeaveData.mockId });

      component.documentSizeOrTypeError = viewEditLeaveData.getEmpDataStatus; // Simulate an error state
      component.resetLeaveApplicationForm();

      // Verify that the form is reset
      expect(component.editLeaveForm.pristine).toBe(viewEditLeaveData.getEmpDataStatus);
      expect(component.editLeaveForm.dirty).toBe(viewEditLeaveData.showFileUploader);

      // Verify that documentSizeOrTypeError is set to false
      expect(component.documentSizeOrTypeError).toBe(viewEditLeaveData.showFileUploader);
    });
  });

  describe('confirmDeleteRequest', () => {
    it('should call showApiErrorMessages on deletion error', () => {
      mockRequestedLeaveService.deleteLeaveRequestApi.and.returnValue(
        throwError({ error: { message: 'error' } }),
      );
      const showApiErrorMessagesSpy = spyOn(component, 'showApiErrorMessages');

      component.confirmDeleteRequest();

      expect(showApiErrorMessagesSpy).toHaveBeenCalledWith('error');
    });

    it('should call onApprovedPendingLeaveError', () => {
      component.isStatusApprovedPendingLeave = viewEditLeaveData.getEmpDataStatus;
      const onApprovedPendingLeaveErrorSpy = spyOn(
        component,
        'onApprovedPendingLeaveError',
      );
      component.confirmDeleteRequest();
      expect(onApprovedPendingLeaveErrorSpy).toHaveBeenCalledWith(viewEditLeaveData.getEmpDataStatus);
    });

    it('should call requestedLeaveService', () => {
      component.isStatusApprovedPendingLeave = viewEditLeaveData.showFileUploader;
      component.editLeaveForm = fb.group({
        approvalStatus: viewEditLeaveData.statusApproved,
      });
      component.employeeId = viewEditLeaveData.requestedLeaveEmployeeId;
      component.data = { leaveId: viewEditLeaveData.requestedLeaveId };
      mockRequestedLeaveService.cancelLeaveRequestApi.and.returnValue(of({}));
      component.confirmDeleteRequest();

      expect(
        mockRequestedLeaveService.cancelLeaveRequestApi,
      ).toHaveBeenCalledWith(viewEditLeaveData.requestedLeaveEmployeeId, viewEditLeaveData.requestedLeaveId);
    });

    it('should open success dialog and call getLeaveTypesAndBalance on successful delete', () => {
      component.isStatusApprovedPendingLeave = false;
      component.editLeaveForm = fb.group({
        startDate: new FormControl(new Date()),
        endDate: new FormControl(new Date()),
        leaveType: new FormControl(viewEditLeaveData.editLeaveFormSetValues),
        leaveDuration: new FormControl(viewEditLeaveData.leaveDuration),
        returningToWorkDate: new FormControl(viewEditLeaveData.returningToWorkDate),
        approvalStatus: viewEditLeaveData.statusPending,
      });
      component.data = { leaveId: viewEditLeaveData.requestedLeaveId };

      spyOn(component, 'getLeaveTypesAndBalance');
      mockRequestedLeaveService.deleteLeaveRequestApi.and.returnValue(of({}));

      component.confirmDeleteRequest();

      expect(dialogMock.open).toHaveBeenCalledWith(
        CommonSuccessDialogWithoutButtonsComponent,
        {
          autoFocus: false,
          data: {
            ...newLeaveRequestJson?.dialogInfo?.deleteLeaveSuccess,
            iconPath: jasmine.any(String),
          },
        },
      );
      expect(component.actionType).toBe(viewEditLeaveData.actionType);
      expect(component.getLeaveTypesAndBalance).toHaveBeenCalled();
    });
    //
  });

  describe('getLeaveTypesAndBalance', () => {
    beforeEach(() => {
      component.createAddEditIfNoDataFromApi();
    });

    it('should handle successful API response and populate leaveTypesOptionArray', () => {
      const mockResponse = {
        status: { code: 200 },
        data: {
          leaveTypes: viewEditLeaveData.casualLeaveData,
        },
      };
      mockNewRequestService.getLeaveTypeAndBalanceApi.and.returnValue(
        of(mockResponse),
      );
      component.editLeaveForm.patchValue({
        value: { startDate: viewEditLeaveData.editLeaveStartDate },
      });

      component.getLeaveTypesAndBalance();
      expect(
        mockNewRequestService.getLeaveTypeAndBalanceApi,
      ).toHaveBeenCalled();
      expect(component.leaveTypesOptionArray).toEqual([
        viewEditLeaveData.leaveTypesOptionArray,
      ]);
    });

    it('should set leaveTypesOptionArray to empty if API returns an error status', () => {
      const mockResponse = { status: { code: 404 }, data: {} };
      component.editLeaveForm.patchValue({
        value: { startDate: viewEditLeaveData.editLeaveStartDate },
      });
      mockNewRequestService.getLeaveTypeAndBalanceApi.and.returnValue(
        of(mockResponse),
      );

      component.getLeaveTypesAndBalance();
      expect(component.leaveTypesOptionArray).toEqual([]);
    });

    it('should handle API errors gracefully and log them', () => {
      spyOn(DebugService.prototype, 'log');
      const errorResponse = new Error(viewEditLeaveData.mockErrorResponse1);
      mockNewRequestService.getLeaveTypeAndBalanceApi.and.returnValue(
        throwError(errorResponse),
      );
      component.editLeaveForm.patchValue({
        value: { startDate: viewEditLeaveData.editLeaveStartDate },
      });

      component.getLeaveTypesAndBalance();
      expect(DebugService.prototype.log).toHaveBeenCalledWith(
        'error',
        errorResponse,
      );
    });
  });

  describe('selectedDocument', () => {
    it('should upload attachment and set attachmentId on successful response', () => {
      const mockValue = viewEditLeaveData.uploadMockDataAttachment;

      const mockFile = new File([''], mockValue.name, {
        type: mockValue.type,
        lastModified: mockValue.lastModified,
      });

      const mockResponse = { data: { attachmentId: viewEditLeaveData.attachmentDocumentId } };
      component.editLeaveForm = new FormGroup({
        attachmentId: new FormControl(),
      });

      mockRequestedLeaveService.uploadAttachmentWithApi.and.returnValue(
        of(mockResponse),
      );

      component.selectedDocument(mockFile);

      expect(
        mockRequestedLeaveService.uploadAttachmentWithApi,
      ).toHaveBeenCalledWith(mockFile);
      expect(component.editLeaveForm.value.attachmentId).toEqual(
        viewEditLeaveData.attachmentDocumentId,
      );
    });

    it('should log error on failed upload', () => {
      const mockValue = { progress: 50 };
      const mockError = new Error(viewEditLeaveData.mockErrorResponse2);
      spyOn(DebugService.prototype, 'log');
      mockRequestedLeaveService.uploadAttachmentWithApi.and.returnValue(
        throwError(mockError),
      );

      component.selectedDocument(mockValue);

      expect(DebugService.prototype.log).toHaveBeenCalledWith(
        'Error while upload attachment in leave edit',
        mockError,
      );
    });
  });

  describe('onEditLeaveFormSubmit', () => {
    beforeEach(() => {
      component.editLeaveForm.patchValue({ value: {} });
      component.leaveTypesCode = viewEditLeaveData.leaveTypesCode;
      component.selectedUploadDocument = viewEditLeaveData.selectedUploadDocument; // Provide a sample selected document
      component.employeeId = viewEditLeaveData.editLeaveFormSubmitLeavesEmployeeId; // Provide a sample employee ID
    });
    it('should log "Fill the mandatory fields" if mandatory fields are missing', () => {
      component.editLeaveForm.value.leaveType = undefined; // Simulate missing leave type
      spyOn(DebugService.prototype, 'log');

      component.onEditLeaveFormSubmit();

      expect(DebugService.prototype.log).toHaveBeenCalledWith(
        viewEditLeaveData.mandatoryFields,
      );
    });

    it('should log "UI error: Document is mandatory" if mandatory documents are missing for certain leave types', () => {
      component.editLeaveForm.value.leaveType = viewEditLeaveData.sickType; // Simulate sick leave type
      spyOn(DebugService.prototype, 'log');
      component.selectedUploadDocument = viewEditLeaveData.selectedUploadDocument; // Simulate missing document

      component.onEditLeaveFormSubmit();

      expect(DebugService.prototype.log).toHaveBeenCalledWith(
        viewEditLeaveData.mandatoryFields,
      );
    });
  });

  it('should set documentSizeOrTypeError and call scrollToTopForErrorView in onSizeOrTypeErrorInSelectDocument', () => {
    spyOn(component, 'scrollToTopForErrorView');
    component.onSizeOrTypeErrorInSelectDocument(viewEditLeaveData.getEmpDataStatus);
    expect(component.documentSizeOrTypeError).toBeTrue();
    expect(component.scrollToTopForErrorView).toHaveBeenCalled();
  });

  it('should set doubleFileExtensionError and call scrollToTopForErrorView in onDoubleFileExtensionErrorInSelectDocument', () => {
    spyOn(component, 'scrollToTopForErrorView');
    component.onDoubleFileExtensionErrorInSelectDocument(viewEditLeaveData.getEmpDataStatus);
    expect(component.doubleFileExtensionError).toBeTrue();
    expect(component.scrollToTopForErrorView).toHaveBeenCalled();
  });

  it('should set approvedPendingLeaveCancellationError and call scrollToTopForErrorView in onApprovedPendingLeaveError', () => {
    spyOn(component, 'scrollToTopForErrorView');
    component.onApprovedPendingLeaveError(viewEditLeaveData.getEmpDataStatus);
    expect(component.approvedPendingLeaveCancellationError).toBeTrue();
    expect(component.scrollToTopForErrorView).toHaveBeenCalled();
  });

  it('should open the warning dialog with correct data', () => {
    component.data = { leaveId: viewEditLeaveData.requestedLeaveId };
    const dialogRefSpy = jasmine.createSpyObj({
      afterClosed: of({ data: { flag: viewEditLeaveData.showFileUploader } }),
    });
    dialogMock.open.and.returnValue(dialogRefSpy);

    component.deleteLeaveRequest();

    expect(dialogMock.open).toHaveBeenCalledWith(
      CommonWarningDialogWithButtonsComponent,
      {
        autoFocus: false,
        data: {
          warningInfo: newLeaveRequestJson?.dialogInfo?.deleteLeaveWarning,
          childInfo: {
            ...newLeaveRequestJson?.dialogInfo?.deleteLeaveSuccess,
            iconPath: viewEditLeaveData.iconPath,
          },
          apiConfig: { payload: viewEditLeaveData.requestedLeaveId },
        },
      },
    );
  });

  it('should call confirmDeleteRequest and set actionType to "edit" when dialog result flag is true', () => {
    spyOn(component, 'confirmDeleteRequest');
    const dialogRefSpy = jasmine.createSpyObj({
      afterClosed: of({ data: { flag: viewEditLeaveData.getEmpDataStatus } }),
    });
    dialogMock.open.and.returnValue(dialogRefSpy);

    component.deleteLeaveRequest();

    expect(component.confirmDeleteRequest).toHaveBeenCalled();
    expect(component.actionType).toBe('edit');
  });

  it('should open success dialog and reset form on successful leave update', () => {
    spyOn(component, 'resetLeaveApplicationForm');
    spyOn(component, 'getLeaveTypesAndBalance');
    mockRequestedLeaveService.updateLeaveRequestApi.and.returnValue(of({}));

    component.updateLeaveRequest({}, {});

    expect(dialogMock.open).toHaveBeenCalledWith(
      CommonSuccessDialogWithoutButtonsComponent,
      {
        data: {
          ...newLeaveRequestJson.dialogInfo.updateLeaveSuccess,
          iconPath: jasmine.any(String),
        },
        autoFocus: viewEditLeaveData.showFileUploader,
      },
    );
    expect(component.isLoadingOnLeaveSubmit).toBeFalse();
    expect(component.resetLeaveApplicationForm).toHaveBeenCalled();
    expect(component.getLeaveTypesAndBalance).toHaveBeenCalled();
  });

  it('should track the first change and call adobeAnalyticsOnFirstFormStart', () => {
    // Arrange
    spyOn(component, 'adobeAnalyticsOnFirstFormStart');

    // Act
    component.bindViewEditLeaveFormStartTracking();

    // Change a form control value
    component.editLeaveForm.controls.leaveType.setValue(viewEditLeaveData.annualLeaveType);
    component.editLeaveForm.controls.leaveType.markAsDirty(); // Mark as dirty

    // Trigger value changes
    component.editLeaveForm.updateValueAndValidity();

    // Assert
    expect(component.fieldChanges.leaveType).toBe(true);
    expect(component.formHasFirstValue).toBe(true);
    expect(component.adobeAnalyticsOnFirstFormStart).toHaveBeenCalledWith(viewEditLeaveData.leaveType);
  });

  it('should not call adobeAnalyticsOnFirstFormStart if formHasFirstValue is true', () => {
    // Arrange
    component.formHasFirstValue = true; // Set to true to simulate that a change has already been tracked
    spyOn(component, 'adobeAnalyticsOnFirstFormStart');

    // Act
    component.bindViewEditLeaveFormStartTracking();

    // Change a form control value
    component.editLeaveForm.controls.leaveType.setValue(viewEditLeaveData.annualLeaveType);
    component.editLeaveForm.controls.leaveType.markAsDirty(); // Mark as dirty

    // Trigger value changes
    component.editLeaveForm.updateValueAndValidity();

    // Assert
    expect(component.fieldChanges.leaveType).toBeUndefined(); // Should not be set
    expect(component.adobeAnalyticsOnFirstFormStart).not.toHaveBeenCalled();
  });

  it('should track multiple fields on first change', () => {
    // Arrange
    spyOn(component, 'adobeAnalyticsOnFirstFormStart');

    // Act
    component.bindViewEditLeaveFormStartTracking();

    // Change multiple form control values
    component.editLeaveForm.controls.leaveType.setValue(viewEditLeaveData.annualLeaveType);
    component.editLeaveForm.controls.leaveType.markAsDirty();
    component.editLeaveForm.controls.startDate.setValue(new Date());
    component.editLeaveForm.controls.startDate.markAsDirty();

    // Trigger value changes
    component.editLeaveForm.updateValueAndValidity();

    // Assert
    expect(component.fieldChanges.leaveType).toBe(viewEditLeaveData.getEmpDataStatus);
    expect(component.fieldChanges.startDate).toBeUndefined();
    expect(component.formHasFirstValue).toBe(viewEditLeaveData.getEmpDataStatus);
  });

  it('should call adobeAnalyticsOnClickOfButtons and removeDocument when onClickOfRemoveDocument is called', () => {
    // Arrange
    spyOn(component, 'removeDocument'); // Spy on the removeDocument method
    spyOn(component, 'adobeAnalyticsOnClickOfButtons'); // Spy on the analytics method

    // Act
    component.onClickOfRemoveDocument();

    // Assert
    expect(component.adobeAnalyticsOnClickOfButtons).toHaveBeenCalledWith(viewEditLeaveData.actionDeleteType);
    expect(component.removeDocument).toHaveBeenCalled();
  });

  it('should call adobeAnalyticsOnClickOfButtons with btnCancelEdit when conditions are met', () => {
    // Arrange
    spyOn(component, 'resetLeaveApplicationForm'); // Spy on the reset method
    spyOn(component, 'adobeAnalyticsOnClickOfButtons'); // Spy on the analytics method

    // Act
    component.onCancelEditButtonClick();

    // Assert
    expect(component.adobeAnalyticsOnClickOfButtons).toHaveBeenCalledWith(viewEditLeaveData.cancelEdit);
    expect(component.resetLeaveApplicationForm).toHaveBeenCalled();
  });

  it('should call adobeAnalyticsOnClickOfButtons with btnCancel when pendingCancellationData is true', () => {
    // Arrange
    component.pendingCancellationData = true; // Change state to test this condition
    spyOn(component, 'resetLeaveApplicationForm'); // Spy on the reset method
    spyOn(component, 'adobeAnalyticsOnClickOfButtons'); // Spy on the analytics method

    // Act
    component.onCancelEditButtonClick();

    // Assert
    expect(component.adobeAnalyticsOnClickOfButtons).toHaveBeenCalledWith(viewEditLeaveData.cancelActionType);
    expect(component.resetLeaveApplicationForm).toHaveBeenCalled();
  });

  it('should call adobeAnalyticsOnClickOfButtons with btnCancel when isWithinFinancialYear is false', () => {
    // Arrange
    component.isWithinFinancialYear = viewEditLeaveData.showFileUploader; // Change state to test this condition
    spyOn(component, 'resetLeaveApplicationForm'); // Spy on the reset method
    spyOn(component, 'adobeAnalyticsOnClickOfButtons'); // Spy on the analytics method

    // Act
    component.onCancelEditButtonClick();

    // Assert
    expect(component.adobeAnalyticsOnClickOfButtons).toHaveBeenCalledWith(viewEditLeaveData.cancelActionType);
    expect(component.resetLeaveApplicationForm).toHaveBeenCalled();
  });

  it('should return true if leaveType is adoptionLeaveFather', () => {
    // Arrange
    component.editLeaveForm.controls.leaveType.setValue(viewEditLeaveData.addoptionLeaveFather);

    // Act
    const result = component.showActualOrExpectedDateOfChild();

    // Assert
    expect(result).toBe(viewEditLeaveData.showFileUploader);
  });

  it('should return false if leaveType is not adoptionLeaveFather', () => {
    // Arrange
    component.editLeaveForm.controls.leaveType.setValue(viewEditLeaveData.adoptionSickLeave); // Example of a different leave type

    // Act
    const result = component.showActualOrExpectedDateOfChild();

    // Assert
    expect(result).toBe(false);
  });

  it('should return false if leaveType is null', () => {
    // Arrange
    component.editLeaveForm.controls.leaveType.setValue(viewEditLeaveData.getLeaveDuration);

    // Act
    const result = component.showActualOrExpectedDateOfChild();

    // Assert
    expect(result).toBe(viewEditLeaveData.showFileUploader);
  });

  it('should load leave data and create form when data is successfully fetched', () => {
    // Arrange
    const mockResponse = {
      data: viewEditLeaveData.mockResponseFileUploaded,
    };

    mockRequestedLeaveService.getLeaveDataWithId.and.returnValue(of(mockResponse));
    spyOn(component, 'createAddOrEditForm'); // Spy on createAddOrEditForm
    spyOn(component, 'getChildAgeOptionsListFromPickList'); // Spy on getChildAgeOptionsListFromPickList
    spyOn(component, 'selectValueChange'); // Spy on selectValueChange

    // Act
    component.getLeaveAndCreateForm();

    // Assert
    expect(mockRequestedLeaveService.getLeaveDataWithId).toHaveBeenCalledWith(viewEditLeaveData.mockTestID);
    expect(component.showFileUploader).toBeFalse();
    expect(component.supportedDocument).toBe(viewEditLeaveData.someSupportedDocument);
    expect(component.createAddOrEditForm).toHaveBeenCalledWith(mockResponse.data, viewEditLeaveData.mockTestID);
    expect(component.selectedUploadDocument.name).toBe(viewEditLeaveData.documentPDF);
    expect(component.showViewEditDialog).toBeTrue();
    expect(component.formIsCreated).toBeTrue();
    expect(component.isDataLoaded).toBeTrue();
  });

  it('should handle error response and log error', () => {
    // Arrange
    spyOn(component, 'createAddEditIfNoDataFromApi'); // Spy on createAddEditIfNoDataFromApi

    // Act
    component.getLeaveAndCreateForm();

    expect(component.editLeaveForm).toBeDefined(); // Ensure editLeaveForm is defined
    expect(component.formIsCreated).toBeFalse();
    expect(component.editLeaveForm.disabled).toBeFalse(); // Ensure form is disabled
    expect(component.isDataLoaded).toBeFalse();
  });

  it('should log error if an exception is thrown', () => {
    // Act
    component.getLeaveAndCreateForm();
  });
});
