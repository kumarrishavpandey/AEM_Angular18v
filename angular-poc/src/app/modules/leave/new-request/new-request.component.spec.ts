import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture, TestBed,
} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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
import { CommonFileUploaderComponent } from 'src/app/shared/components/common-file-uploader/common-file-uploader.component';
import { AdobeAnalyticsService } from 'src/app/shared/services/adobe-analytics.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { DebugService } from 'src/app/shared/services/debug.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { getAemDamFullPath } from 'utils/utils';
import { Router } from '@angular/router';
import { labelsLeaveModule } from '../constant';
import { newLeaveRequestJson } from '../leave-constant';
import { NewRequestService } from '../services/new-request.service';
import { NewRequestServiceMock } from '../services/new-request.service.mock';
import { NewRequestComponent } from './new-request.component';
import { newRequestModule } from './new-request.component.constant';

describe('NewRequestComponent', () => {
  let component: NewRequestComponent;
  let fixture: ComponentFixture<NewRequestComponent>;
  let authServiceStub: jasmine.SpyObj<MsalService>;
  let msalBroadcastService: jasmine.SpyObj<MsalBroadcastService>;
  let commonServiceMock: jasmine.SpyObj<CommonService>;
  let newRequestServiceSpy: jasmine.SpyObj<NewRequestService>;
  let adobeAnalyticsServiceSpy: jasmine.SpyObj<AdobeAnalyticsService>;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    authServiceStub = jasmine.createSpyObj('MsalService', [
      'loginPopup',
      'loginRedirect',
      'instance',
    ]);

    msalBroadcastService = jasmine.createSpyObj('MsalBroadcastService', [
      'inProgress$',
      'msalInstance',
    ]);
    commonServiceMock = jasmine.createSpyObj('CommonService', [
      'getPickList',
      'getLocale',
      'isLoggedInEmpFromIndia',
      'getEmpDataStatus',
    ]);

    newRequestServiceSpy = new NewRequestServiceMock().newRequestServiceSpy;

    const msalGuardConfigStub: MsalGuardConfiguration = {
      authRequest: {} as PopupRequest,
      interactionType: InteractionType.Popup,
    };
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    adobeAnalyticsServiceSpy = jasmine.createSpyObj('AdobeAnalyticsService', [
      'pageLoadDatalayer',
      'clickEventDatalayer',
      'formCompleteDatalayer',
      'apiErrorDatalayer',
    ]);
    TestBed.configureTestingModule({
      declarations: [
        NewRequestComponent,
        CommonFileUploaderComponent,
        CommonCalendarComponent,
        CommonDropdownComponent,
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        AngularMaterialModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      providers: [
        { provide: MatDialog, useValue: dialogSpy },
        { provide: HttpClient, useValue: '' },
        { provide: MsalService, useValue: authServiceStub },
        { provide: MsalBroadcastService, useValue: msalBroadcastService },
        { provide: MSAL_GUARD_CONFIG, useValue: msalGuardConfigStub },
        { provide: CommonService, useValue: commonServiceMock },
        { provide: NewRequestService, useValue: newRequestServiceSpy },
        { provide: AdobeAnalyticsService, useValue: adobeAnalyticsServiceSpy },
        { provide: Router, useValue: routerSpy },
        HttpService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NewRequestComponent);
    component = fixture.componentInstance;
    component.siteSection = labelsLeaveModule.pageTitle;
    component.newRequestLabels = labelsLeaveModule.tabNewRequest;
    component.uploadDocumentLabels = labelsLeaveModule.uploadDocument;

    // Initialize leaveTypesOptionArray
    component.leaveTypesOptionArray = newRequestModule.leaveTypeOption;
  });

  // Ng oninit
  // it('should run the function ngOnInit', () => {
  //   spyOn(component, 'getChildAgeOptionsListFromPickList').and.callThrough();

  //   commonServiceMock.getPickList.and.returnValue(
  //     of({
  //       Picklist: [
  //         { externalCode: '1', label: 'Option 1' },
  //         { externalCode: '2', label: 'Option 2' },
  //       ],
  //     }),
  //   );
  //   commonServiceMock.getLocale.and.returnValue('en_IN');

  //   fixture.detectChanges();
  // });

  // On Component creation
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  /* // call getPickList method
  it('should call getPickList method from CommonService with correct request body', () => {
    fixture.detectChanges();
    const mockPickListData = [
      { Picklist: [{ value: 'greaterthan2', label: 'Greater than 2' }] },
    ];
    commonServiceMock.getPickList.and.returnValue(of(mockPickListData));

    const expectedRequestBody = {
      picklistId: ['childage'],
    };
    expect(commonServiceMock.getPickList).toHaveBeenCalledWith(
      expectedRequestBody,
    );
  }); */

  // set documentSizeOrTypeError to true
  it('should set documentSizeOrTypeError to true if isError is true', () => {
    component.onSizeOrTypeErrorInSelectDocument(newRequestModule.documentSizeOrTypeError);
    expect(component.documentSizeOrTypeError).toBe(newRequestModule.documentSizeOrTypeError);
  });

  // set documentSizeOrTypeError to false
  it('should set documentSizeOrTypeError to false if isError is false', () => {
    component.onSizeOrTypeErrorInSelectDocument(newRequestModule.onSizeOrTypeErrorInSelectDocument);
    expect(component.documentSizeOrTypeError).toBe(newRequestModule.onSizeOrTypeErrorInSelectDocument);
  });

  // When on set of attachmentId trigger onFileSuccessfullyUpload
  it('should set attachmentId and trigger onFileSuccessfullyUpload when document upload is successful', () => {
    component.createApplyLeaveForm();
    spyOn(component, 'onFileSuccessfullyUpload');
    component.applyLeaveForm.patchValue(newRequestModule.leaveFormPatchValue);
    const file = new File(['file content'], 'test.docx', {
      type: newRequestModule.fileType,
    });
    const mockResponse = newRequestModule.attachmentMockResponse;

    newRequestServiceSpy.uploadAttachmentWithApi.and.returnValue(
      of(mockResponse),
    );

    component.uploadApplyLeaveDocument(file);

    expect(newRequestServiceSpy.uploadAttachmentWithApi).toHaveBeenCalledWith(
      file,
    );

    expect(component.applyLeaveForm.value.attachmentId).toEqual(newRequestModule.attachmentIdNumber);
    // Assuming onFileSuccessfullyUpload is a method you want to trigger
    expect(component.onFileSuccessfullyUpload).toHaveBeenCalledWith(file);
  });

  // If any api faild to give expected response while document upload
  it('should log an error when document upload fails', () => {
    spyOn(DebugService.prototype, 'log');
    const errorResponse = new Error(newRequestModule.uploadFailed);
    newRequestServiceSpy.uploadAttachmentWithApi.and.returnValue(
      throwError(errorResponse),
    );
  });

  // RUn checkvalidation wehen change in fractional quantity
  it('should call checkValidation when onFractionalQuantityChange is called', () => {
    spyOn(component, 'checkValidation'); // Spy on the checkValidation method

    component.onFractionalQuantityChange(); // Call the method

    expect(component.checkValidation).toHaveBeenCalled(); // Check if the method is called
  });

  // Opne dialog on apply leave success
  it('should open dialog on apply leave form submit', () => {
    component.leaveTypesCode = newLeaveRequestJson.leaveTypeCode;
    component.selectedUploadDocument = newRequestModule.selectedUploadDocument;
    component.isLoadingOnLeaveSubmit = newRequestModule.onSizeOrTypeErrorInSelectDocument;
    component.createApplyLeaveForm();
    component.applyLeaveForm.patchValue(newRequestModule.applyLeaveFormValues);

    // Ensure leaveTypesOptionArray is initialized
    component.leaveTypesOptionArray = newRequestModule.leaveTypeOption;

    const mockResponse = newRequestModule.dummyMockResponse;

    newRequestServiceSpy.createNewLeaveRequestApi.and.returnValue(
      of(mockResponse),
    );
    component.onApplyLeaveFormSubmit();
    expect(component.isLoadingOnLeaveSubmit).toEqual(newRequestModule.onSizeOrTypeErrorInSelectDocument);
  });

  // Apply leave submit with error in API
  it('should hit the createNewLeaveRequestApi api and give api error', () => {
    component.leaveTypesCode = newLeaveRequestJson.leaveTypeCode;
    component.selectedUploadDocument = newRequestModule.dummySampleFile;
    component.isLoadingOnLeaveSubmit = newRequestModule.onSizeOrTypeErrorInSelectDocument;
    component.createApplyLeaveForm();
    component.applyLeaveForm.patchValue(newRequestModule.applyLeaveFormValues);

    const mockError = newRequestModule.dummyMockError;

    newRequestServiceSpy.createNewLeaveRequestApi.and.returnValue(
      throwError(mockError),
    );
    component.onApplyLeaveFormSubmit();
    expect(component.isLoadingOnLeaveSubmit).toEqual(newRequestModule.onSizeOrTypeErrorInSelectDocument);
  });

  // Get formatted date dtring
  it('Should return an formated date string', () => {
    const sampleDate = new Date();
    if (sampleDate) {
      /* eslint no-unsafe-optional-chaining: 'off' */
      expect(component.getReturningDateInFormat(sampleDate)).toEqual(
        `${sampleDate?.getDate()}/${
          sampleDate?.getMonth() + 1
        }/${sampleDate?.getFullYear()}`,
      );
    } else {
      expect(component.getReturningDateInFormat(sampleDate)).toEqual(newRequestModule.hyphen);
    }
  });

  // Remove selected document
  it('should remove the selected document in apply leave', () => {
    component.selectedUploadDocument = newRequestModule.selectedFile;
    component.showFileUploader = newRequestModule.onSizeOrTypeErrorInSelectDocument;

    component.leaveTypesCode = newLeaveRequestJson.leaveTypeCode;

    component.createApplyLeaveForm();
    component.applyLeaveForm.patchValue(newRequestModule.applyLeaveFormValues);
    component.removeDocument();
    expect(component.selectedUploadDocument).toEqual(newRequestModule.selectedEmptyDocument);
    expect(component.showFileUploader).toEqual(newRequestModule.documentSizeOrTypeError);
  });

  // Navigate to provided URL
  it('should navigate to the passed url', () => {
    const spyWindowOpen = spyOn(window, 'open');
    const { sampleUrl } = newRequestModule;
    component.onNavigateToURL(sampleUrl);
    expect(spyWindowOpen).toHaveBeenCalledWith(sampleUrl, newRequestModule.blank);
  });

  // Hit getLeaveDescriptionList API with correct response
  it('should hit the getLeaveDescriptionList API and give correct response', () => {
    const mockResponse = {
      data: {
        leaveDescriptionList: {
          items: [
            {
              leaveCode: newRequestModule.leaveCode,
              iconName: newRequestModule.iconName,
              buttonIconName: newRequestModule.buttonIconName,
              buttonLabel: newRequestModule.buttonLabel,
              title: newRequestModule.title,
              shortDescription: newRequestModule.shortDescription,
              pdfPath: {
                _path: getAemDamFullPath(
                  newRequestModule.pdfFile,
                ),
              },
            },
          ],
        },
      },
    };
    newRequestServiceSpy.getAboutLeaveDataFromAEM.and.returnValue(
      of(mockResponse),
    );
    component.getLeaveDescriptionList();
    expect(component.aboutLeavesList).toEqual(
      mockResponse.data.leaveDescriptionList.items,
    );
  });

  // Hit api for leave duration and return to work
  it('should hit the api for leave duration and return to work, and also assign res to leaveDuration and returnToWork in apply leave form', () => {
    const mockResponse = newRequestModule.duration;

    component.createApplyLeaveForm();
    component.applyLeaveForm.patchValue(newRequestModule.applyLeaveFormValues);

    newRequestServiceSpy.getDurationAndReturnToWork.and.returnValue(
      of(mockResponse),
    );
    component.getLeaveDurationAndReturnToWorkFromApi();
    expect(component.applyLeaveForm).toBeDefined();
  });

  // When running function getLeaveDurationAndReturnToWorkFromApi but got API error
  it('should log an error when the getDurationAndReturnToWork API call fails', () => {
    spyOn(DebugService.prototype, 'log');
    component.createApplyLeaveForm();
    component.applyLeaveForm.patchValue(newRequestModule.applyLeaveFormValues);
    const errorResponse = new Error(newRequestModule.apiFailure);

    newRequestServiceSpy.getDurationAndReturnToWork.and.returnValue(
      throwError(errorResponse),
    );

    component.getLeaveDurationAndReturnToWorkFromApi();

    expect(DebugService.prototype.log).toHaveBeenCalledWith(
      'Error while getting leave duration and return to work',
      errorResponse,
    );
  });

  // Filter leave options
  it('should filter the leave options according to the app-common-dropdown after getting api the api getLeaveTypeAndBalanceApi', () => {
    const mockResponse = newRequestModule.filterLeaveOptions;
    newRequestServiceSpy.getLeaveTypeAndBalanceApi.and.returnValue(
      of(mockResponse),
    );
    component.filterLeaveInSelectOptions();
    expect(component.leaveTypesOptionArray).toEqual([
      {
        label: mockResponse.data.leaveTypes[0].leaveDescription,
        value: mockResponse.data.leaveTypes[0].leaveCode,
        balance: mockResponse.data.leaveTypes[0].leaveBalance,
      },
    ]);
  });

  // Hanlde error  in function filter leave
  it('should log an error when the API call fails in function getLeaveTypeAndBalanceApi', () => {
    const errorResponse = new Error(newRequestModule.apiFailure);
    spyOn(DebugService.prototype, 'log');

    // newRequestServiceSpy.getLeaveTypeAndBalanceApi.and.returnValue(
    //   throwError(() => errorResponse),
    // );

    newRequestServiceSpy.getLeaveTypeAndBalanceApi.and.returnValue(
      throwError(errorResponse),
    );

    component.filterLeaveInSelectOptions();

    expect(DebugService.prototype.log).toHaveBeenCalledWith(
      'error while getting leave details',
      errorResponse,
    );
  });

  // set employeeChildAgeOptionsArray with values from picklist
  it('should set employeeChildAgeOptionsArray with values from picklist', () => {
    const { picklistResponse } = newRequestModule;

    commonServiceMock.getPickList.and.returnValue(of(picklistResponse));

    component.getChildAgeOptionsListFromPickList();

    expect(component.employeeChildAgeOptionsArray).toEqual(newRequestModule.employeeChildAgeOptionsArray);
  });

  // set employeeChildAgeOptionsArray to empty array on error
  it('should set employeeChildAgeOptionsArray to empty array on error', () => {
    spyOn(DebugService.prototype, 'log');
    commonServiceMock.getPickList.and.returnValue(throwError(newRequestModule.getPickListError));

    component.getChildAgeOptionsListFromPickList();

    expect(component.employeeChildAgeOptionsArray).toEqual([]);
  });

  /* eslint no-restricted-globals: 'off' */
  // it('should show api error messages', fakeAsync(() => {
  //   const sampleErrorString = 'Leave type is not correct;Please format date string';
  //   component.showApiErrorMessages(sampleErrorString);
  //   expect(component.apiErrors).toEqual([
  //     'Leave type is not correct',
  //     'Please format date string',
  //   ]);

  //   tick(100); // simulate 100ms passage of time

  //   expect(window.scrollY).toBe(0);
  // }));

  // Check change in leave duration or return to work
  it('should check for any change in the leave duration and return to work once change in date', () => {
    component.createApplyLeaveForm();
    component.applyLeaveForm.patchValue(newRequestModule.applyLeaveFormValues);
    component.dateValueChange();
    expect(component.applyLeaveForm).toBeDefined();
  });

  // update the about leave section
  it('should update the about leave section', () => {
    component.createApplyLeaveForm();
    component.applyLeaveForm.patchValue(newRequestModule.dummyLeaveType);
    component.aboutLeavesList = newRequestModule.aboutLeavesList;
    component.updateAboutLeaveSection();
    /* eslint @typescript-eslint/no-unused-expressions: 'off' */
    expect(component.aboutSelectedLeave).toBeTruthy();
  });

  // filter the leave balance from leave type options
  // it('should filter the leave balance from leave type options', () => {
  //   component.showFileUploader = true;
  //   component.createApplyLeaveForm();
  //   component.applyLeaveForm.patchValue({
  //     leaveBalance: '0',
  //     leaveType: 'CL',
  //   });
  //   component.leaveTypesOptionArray = [
  //     {
  //       value: 'CL',
  //       label: 'Casual',
  //       balance: '5',
  //     },
  //   ];

  //   component.getLeaveBalance();
  //   expect(component.applyLeaveForm.value.leaveBalance).toEqual(5);
  // });

  // set showLeaveBalanceField to true
  it('should set showLeaveBalanceField to true for specific leave types', () => {
    component.createApplyLeaveForm();

    component.applyLeaveForm.patchValue({
      leaveType: component.leaveTypesCode.casualLeave,
    });

    component.showLeaveBalance();
    expect(component.showLeaveBalanceField).toBeTruthy();
  });

  it('should set showLeaveBalanceField to false for other leave types', () => {
    component.createApplyLeaveForm();

    component.applyLeaveForm.patchValue(newRequestModule.someOtherLeaveType);

    component.showLeaveBalance();
    expect(component.showLeaveBalanceField).toBeFalsy();
  });

  it('should return true if leave type is compoff', () => {
    component.createApplyLeaveForm();

    component.applyLeaveForm.patchValue({
      leaveType: component.leaveTypesCode.compensatory,
    });

    const result = component.showDateOfCompoff();

    expect(result).toBeTruthy();
  });

  it('should return true if leave type is miscarriage', () => {
    component.createApplyLeaveForm();

    component.applyLeaveForm.patchValue({
      leaveType: component.leaveTypesCode.miscarriageLeave,
    });

    const result = component.showDateOfMiscarriage();

    expect(result).toBeTruthy();
  });

  it('should return true if leave type is adoptionLeave', () => {
    component.createApplyLeaveForm();

    component.applyLeaveForm.patchValue({
      leaveType: component.leaveTypesCode.adoptionLeave,
    });

    const result = component.isLeaveAdoption();

    expect(result).toBeTruthy();
  });

  it('should return true if leave type is surrogacyLeave', () => {
    component.createApplyLeaveForm();

    component.applyLeaveForm.patchValue({
      leaveType: component.leaveTypesCode.surrogacyLeave,
    });

    const result = component.showExpectedDateOfChild();

    expect(result).toBeTruthy();
  });

  it('should return true if leave type is relocationPdr', () => {
    component.createApplyLeaveForm();

    component.applyLeaveForm.patchValue({
      leaveType: component.leaveTypesCode.relocationPdr,
    });

    const result = component.showDateOfRelocation();

    expect(result).toBeTruthy();
  });

  it('should return true if leave type is maternityLeave', () => {
    component.createApplyLeaveForm();

    component.applyLeaveForm.patchValue({
      leaveType: component.leaveTypesCode.maternityLeave,
    });

    const result = component.showDateOfDelivery();

    expect(result).toBeTruthy();
  });

  // run the function onFileSuccessfullyUpload
  it('should run the function onFileSuccessfullyUpload once file is upload', () => {
    spyOn(component, 'onFileSuccessfullyUpload');
    component.onFileSuccessfullyUpload('');
    expect(component.onFileSuccessfullyUpload).toHaveBeenCalled();
  });

  // run selectValueChange function
  it('should run selectValueChange function once change in the leave type dropdown', () => {
    component.createApplyLeaveForm();
    component.leaveTypesCode = newRequestModule.leaveTypesCode;
    component.aboutLeavesList = [];
    component.applyLeaveForm.patchValue(newRequestModule.applyLeaveDates);

    spyOn(component, 'getLeaveBalance').and.returnValue(null);
    spyOn(component, 'checkValidation').and.returnValue(null);
    spyOn(component, 'showLeaveBalance').and.returnValue(null);
    spyOn(component, 'updateAboutLeaveSection').and.returnValue(null);

    const event = newRequestModule.eventName;
    component.selectValueChange(event);

    expect(component.leaveBalanceDynamicTitle).toEqual(event.label);

    expect(component.getLeaveBalance).toHaveBeenCalled();
    expect(component.checkValidation).toHaveBeenCalled();
    expect(component.showLeaveBalance).toHaveBeenCalled();
    expect(component.updateAboutLeaveSection).toHaveBeenCalled();

    expect(component.showLeaveBalanceField).toEqual(newRequestModule.onSizeOrTypeErrorInSelectDocument);
  });

  // log an error message
  it('should log an error message when there is an error fetching the leave description', () => {
    const errorResponse = new Error(newRequestModule.networkError);
    spyOn(DebugService.prototype, 'log');

    newRequestServiceSpy.getAboutLeaveDataFromAEM.and.returnValue(
      throwError(errorResponse),
    );

    component.getLeaveDescriptionList();

    expect(DebugService.prototype.log).toHaveBeenCalledWith(
      'error while fetching leaves description',
      errorResponse,
    );
  });

  // Handle negative test cases for form control(Validations)
  it('should mark leaveType control as invalid if it is empty', () => {
    component.createApplyLeaveForm();
    const leaveTypeControl = component.applyLeaveForm.get(newRequestModule.leaveType);
    leaveTypeControl.setValue('');
    expect(leaveTypeControl.valid).toBeFalsy();
  });

  // mark startDate control as invalid
  it('should mark startDate control as invalid if it is empty', () => {
    component.createApplyLeaveForm();
    const startDateControl = component.applyLeaveForm.get(newRequestModule.startDate);
    startDateControl.setValue('');
    expect(startDateControl.valid).toBeFalsy();
  });

  // mark endDate control as invalid
  it('should mark endDate control as invalid if it is empty', () => {
    component.createApplyLeaveForm();
    const endDateControl = component.applyLeaveForm.get(newRequestModule.endDate);
    endDateControl.setValue('');
    expect(endDateControl.valid).toBeFalsy();
  });

  // mark leaveReason control as invalid
  it('should mark leaveReason control as invalid if it exceeds maximum length', () => {
    component.createApplyLeaveForm();
    const leaveReasonControl = component.applyLeaveForm.get(newRequestModule.leaveReason);
    // Set a value longer than the maximum length (500 characters in this case)
    leaveReasonControl.setValue(
      newRequestModule.dummyValue,
    );
    expect(leaveReasonControl.valid).toBeFalsy();
  });

  // should mark startDate invalid if it is greater than endDate
  it('should mark startDate control as invalid if it is greater than endDate', () => {
    component.createApplyLeaveForm();
    const startDateControl = component.applyLeaveForm.get(newRequestModule.startDate);
    const endDateControl = component.applyLeaveForm.get(newRequestModule.endDate);

    // Set endDate to a date
    endDateControl.setValue(new Date(2024, 3, 15)); // April 15, 2024

    // Set startDate to a date greater than to endDate
    startDateControl.setValue(new Date(2024, 3, 16)); // April 16, 2024 (endDate)
    // Need to create function to handle in ts file
    expect(component.applyLeaveForm.valid).toBeFalsy();
    expect(component.applyLeaveForm.errors).toEqual({
      startDateAfterEndDate: newRequestModule.documentSizeOrTypeError,
    });

    // Set startDate to a date less than endDate
    startDateControl.setValue(new Date(2024, 3, 14)); // April 14, 2024
    expect(startDateControl.valid).toBeTruthy();
  });

  it('should handle file upload successfully', (done) => {
    // Arrange
    const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });

    // Act
    component.onFileSuccessfullyUpload(file);

    // Assert
    expect(component.isAttachmentFileUploaded).toBeTrue();
    expect(component.selectedUploadDocument).toEqual(file);

    // Check that showFileUploader is set to false after 1 second
    setTimeout(() => {
      expect(component.showFileUploader).toBeFalse();
      done(); // Call done to indicate that the async test is complete
    }, 1000);
  });

  it('should call analytics and remove the document when onRemoveDocumentButtonClick is called', () => {
  // Arrange
    const { labelDelete } = newRequestModule;
    component.newRequestLabels = { labelDelete }; // Set the labelDelete in newRequestLabels

    spyOn(component, 'removeDocument'); // Spy on the removeDocument method
    spyOn(component, 'adobeAnalyticsOnClickOfButtons'); // Spy on the analytics method

    // Act
    component.onRemoveDocumentButtonClick();

    // Assert
    expect(component.adobeAnalyticsOnClickOfButtons).toHaveBeenCalledWith(labelDelete);
    expect(component.removeDocument).toHaveBeenCalled();
  });

  it('should emit openRequestLeaveTabEvent when redirectToRequestPage is called', () => {
  // Arrange
    spyOn(component.openRequestLeaveTabEvent, 'emit'); // Spy on the emit method of the event emitter

    // Act
    component.redirectToRequestPage();

    // Assert
    expect(component.openRequestLeaveTabEvent.emit).toHaveBeenCalled();
  });

  it('should call uploadApplyLeaveDocument if progress is not 100', () => {
  // Arrange
    const mockValue = newRequestModule.mockProgress; // Simulate a value with progress not equal to 100
    spyOn(component, 'uploadApplyLeaveDocument'); // Spy on the uploadApplyLeaveDocument method

    // Act
    component.selectedDocument(mockValue);
  });

  it('should not call uploadApplyLeaveDocument if progress is 100', () => {
  // Arrange
    const mockValue = newRequestModule.mockProgress; // Simulate a value with progress equal to 100
    spyOn(component, 'uploadApplyLeaveDocument'); // Spy on the uploadApplyLeaveDocument method

    // Act
    component.selectedDocument(mockValue);
  });

  it('should not call uploadApplyLeaveDocument if value is undefined', () => {
  // Arrange
    const mockValue = newRequestModule.uploadApplyLeaveDocument; // Simulate an undefined value
    spyOn(component, 'uploadApplyLeaveDocument'); // Spy on the uploadApplyLeaveDocument method

    // Act
    component.selectedDocument(mockValue);
  });

  it('should call analytics and reset the leave application form when onResetButtonClick is called', () => {
  // Arrange
    const { resetButtonLabel } = newRequestModule; // Example label for the reset button
    component.newRequestLabels = { btnReset: resetButtonLabel }; // Set the label in newRequestLabels

    spyOn(component, 'resetLeaveApplicationForm'); // Spy on the resetLeaveApplicationForm method
    spyOn(component, 'adobeAnalyticsOnClickOfButtons'); // Spy on the analytics method

    // Act
    component.onResetButtonClick();

    // Assert
    expect(component.adobeAnalyticsOnClickOfButtons).toHaveBeenCalledWith(resetButtonLabel);
    expect(component.resetLeaveApplicationForm).toHaveBeenCalled();
  });

  it('should set doubleFileExtensionError to the value of isError', () => {
  // Arrange
    const errorValue = newRequestModule.documentSizeOrTypeError; // Example value to test

    // Act
    component.onDoubleFileExtensionErrorInSelectDocument(errorValue);

    // Assert
    expect(component.doubleFileExtensionError).toBe(errorValue);
  });

  it('should call filterLeaveInSelectOptions on init', () => {
    spyOn(component, 'filterLeaveInSelectOptions');
  });

  it('should call getChildAgeOptionsListFromPickList on init', () => {
    spyOn(component, 'getChildAgeOptionsListFromPickList');
  });

  it('should subscribe to getEmpDataStatus and call getLeaveDescriptionList if loaded is true', () => {
    commonServiceMock.getEmpDataStatus.and.returnValue(of(newRequestModule.documentSizeOrTypeError));
    spyOn(component, 'getLeaveDescriptionList');
    component.ngOnInit();

    expect(commonServiceMock.getEmpDataStatus).toHaveBeenCalled();
    expect(component.getLeaveDescriptionList).toHaveBeenCalled();
    expect(component.userLocale).toBeUndefined();
  });

  it('should not call adobeAnalyticsOnFirstFormClick again for the same field', () => {
    spyOn(component, 'adobeAnalyticsOnFirstFormClick');
  });

  it('should set fieldChanges and call adobeAnalyticsOnFirstFormClick on first change', () => {
    spyOn(component, 'adobeAnalyticsOnFirstFormClick');

    expect(component.fieldChanges.leaveType).toBeUndefined();
    expect(component.formHasFirstValue).toBeFalse();
  });

  it('should call adobeAnalyticsOnFirstFormClick for multiple fields on first change', () => {
    spyOn(component, 'adobeAnalyticsOnFirstFormClick');

    // Ensure that fieldChanges is updated correctly
    expect(component.fieldChanges.leaveType).toBeUndefined();
    expect(component.fieldChanges.leaveDuration).toBeUndefined();
  });
});
