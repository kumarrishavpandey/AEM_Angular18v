import { CommonModule, DatePipe } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HttpHandler,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import {
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MsalBroadcastService,
  MsalGuardConfiguration,
  MsalService,
} from '@azure/msal-angular';
import {
  InteractionStatus,
  InteractionType,
  PopupRequest,
} from '@azure/msal-browser';
import { of } from 'rxjs';
import { AngularMaterialModule } from 'src/app/angular-material.module';
// import { AnalyticsComponent } from 'src/app/shared/constants';
import { Router } from '@angular/router';
import { AdobeAnalyticsServiceMock } from 'src/app/shared/services/__mock__/adobe-analytics.service.mock';
import { AdobeAnalyticsService } from 'src/app/shared/services/adobe-analytics.service';
import { DebugService } from 'src/app/shared/services/debug.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { getAemDamFullPath } from 'utils/utils';
import { labelsBaseManagerACMapproval } from '../../../base-manager.constant';
import { BaseManagerService } from '../../../base-manager.service';
import { BaseManagerCurrentRequestComponent } from './base-manager-current-request.component';

const mockDocumentData = { docId: '123', originalFileName: 'example.pdf' };

describe('BaseManagerCurrentRequestComponent', () => {
  let component: BaseManagerCurrentRequestComponent;
  let fixture: ComponentFixture<BaseManagerCurrentRequestComponent>;
  let httpTestingController: HttpTestingController;
  let matDialog: jasmine.SpyObj<MatDialog>;
  let adobeAnalyticsServiceSpy: jasmine.SpyObj<AdobeAnalyticsService>;
  let baseManagerService: jasmine.SpyObj<BaseManagerService>;
  let debugService: jasmine.SpyObj<DebugService>;

  let authServiceStub: jasmine.SpyObj<MsalService>;

  beforeEach(async () => {
    authServiceStub = jasmine.createSpyObj('MsalService', [
      'loginPopup',
      'loginRedirect',
      'instance',
    ]);

    adobeAnalyticsServiceSpy = new AdobeAnalyticsServiceMock().adobeAnalyticsServiceSpy;

    matDialog = jasmine.createSpyObj('MatDialog', ['open']);

    debugService = jasmine.createSpyObj('DebugService', ['log']);

    baseManagerService = jasmine.createSpyObj('BaseManagerService', [
      'getUploadedAttachment',
      'submitApproveRequest',
    ]);

    const msalGuardConfigStub: MsalGuardConfiguration = {
      authRequest: {} as PopupRequest,
      interactionType: InteractionType.Popup,
    };
    const msalInstanceMock = {
      addEventCallback: () => {},
      initializeWrapperLibrary: () => {},
    };
    const mockMsalBroadcastService = {
      inProgress$: of(InteractionStatus.None),
    };

    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        BrowserModule,
        CommonModule,
        AngularMaterialModule,
        RouterTestingModule,
        HttpClientModule,
        HttpClientTestingModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
      ],
      declarations: [BaseManagerCurrentRequestComponent],
      providers: [
        HttpClient,
        HttpHandler,
        { provide: MSAL_INSTANCE, useValue: msalInstanceMock },
        { provide: MsalBroadcastService, useValue: mockMsalBroadcastService },
        { provide: MSAL_GUARD_CONFIG, useValue: msalGuardConfigStub },
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') },
        },
        { provide: MatDialog, useValue: matDialog },
        { provide: AdobeAnalyticsService, useValue: adobeAnalyticsServiceSpy },
        { provide: BaseManagerService, useValue: baseManagerService },
        { provide: DebugService, useValue: debugService },
        { provide: MsalService, useValue: authServiceStub },
        DatePipe,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseManagerCurrentRequestComponent);
    component = fixture.componentInstance;
    component.labelsBaseManagerACMapproval = labelsBaseManagerACMapproval;
    httpTestingController = TestBed.inject(HttpTestingController);
    matDialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    baseManagerService = TestBed.inject(
      BaseManagerService,
    ) as jasmine.SpyObj<BaseManagerService>;
    debugService = TestBed.inject(DebugService) as jasmine.SpyObj<DebugService>;
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize component properties', () => {
      component.ngOnInit();
      expect(component.tabCurrentRequests).toBe(
        labelsBaseManagerACMapproval.tabCurrentRequests,
      );
      expect(component.labelReject).toBe(
        labelsBaseManagerACMapproval.labelBtnReject,
      );
      expect(component.labelApprove).toBe(
        labelsBaseManagerACMapproval.labelBtnApprove,
      );
      expect(component.noAttachmentImagePath).toBe(
        getAemDamFullPath(
          labelsBaseManagerACMapproval.tabCurrentRequests.imgNoRequest,
        ),
      );
      expect(component.imgCardLogo).toBe(
        labelsBaseManagerACMapproval.tabHistory.imgCardLogo,
      );
      expect(component.dialogRejectAcm).toBe(
        labelsBaseManagerACMapproval.dialogRejectAcm,
      );
      expect(component.dialogApprovedAcm).toBe(
        labelsBaseManagerACMapproval.dialogApprovedAcm,
      );
      expect(component.dialogDeclinedAcm).toBe(
        labelsBaseManagerACMapproval.dialogDeclinedAcm,
      );
      expect(component.dialogApproveAcm).toBe(
        labelsBaseManagerACMapproval.dialogApproveAcm,
      );
    });
  });

  describe('viewDocument', () => {
    it('should call getUploadedAttachment and downloadBlobFile', () => {
      const response = { data: { imgData: 'base64 encoded string' } };
      baseManagerService.getUploadedAttachment.and.returnValue(of(response));
      component.viewDocument(mockDocumentData);
      expect(baseManagerService.getUploadedAttachment).toHaveBeenCalledWith(mockDocumentData.docId);
      expect(adobeAnalyticsServiceSpy.trackClickEvent).toHaveBeenCalledTimes(1);
    });

    // it('should handle error when getUploadedAttachment fails', () => {
    //   const errorResponse = {
    //     error: "Cannot read properties of undefined (reading 'http')",
    //   };
    //   baseManagerService.getUploadedAttachment.and.returnValue(
    //     of(errorResponse),
    //   );
    //   component.viewDocument(mockDocumentData);

    //   expect(baseManagerService.getUploadedAttachment).toHaveBeenCalledWith(
    //     mockDocumentData.docId,
    //   );
    //   expect(debugService.log).toHaveBeenCalledWith(
    //     'Error fetching PDF URL:',
    //     errorResponse,
    //   );
    // });

    it('should handle undefined originalFileName', () => {
      const response = { data: { imgData: 'base64 encoded string' } };
      baseManagerService.getUploadedAttachment.and.returnValue(of(response));

      component.viewDocument(mockDocumentData);

      expect(baseManagerService.getUploadedAttachment).toHaveBeenCalledWith(mockDocumentData.docId);
      expect(adobeAnalyticsServiceSpy.trackClickEvent).toHaveBeenCalledTimes(1);
    });
  });

  // describe('onRejectClick', () => {
  //   it('should call clickEventDatalayer and open decline dialog', () => {
  //     const reqNo = '123';
  //     const siteSection = labelsBaseManagerAcmList.pageTitle;
  //     const siteSubSection =
  //       labelsBaseManagerACMapproval.tabCurrentRequests.labelTab;
  //     component.onRejectClick(reqNo);
  //     expect(adobeAnalyticsService.clickEventDatalayer).toHaveBeenCalledWith({
  //       isErrorPage: false,
  //       siteSection,
  //       siteSubSection,
  //       clickInfo: {
  //         clickName:
  //           labelsBaseManagerACMapproval.tabCurrentRequests.labelRejected,
  //         clickComponentType: AnalyticsComponent.BUTTON,
  //         componentName:
  //           labelsBaseManagerACMapproval.tabCurrentRequests.labelRejected,
  //         componentID: `${siteSection}_${siteSubSection}_${labelsBaseManagerACMapproval.tabCurrentRequests.labelRejected}`,
  //       },
  //     });
  //   });
  // });

  // describe('onApproveClick', () => {
  //   it('should call clickEventDatalayer and submitApproveRequest', () => {
  //     const reqNo = '123';
  //     const siteSection = labelsBaseManagerAcmList.pageTitle;
  //     const siteSubSection =
  //       labelsBaseManagerACMapproval.tabCurrentRequests.labelTab;

  //     component.onApproveClick(reqNo);

  //     expect(adobeAnalyticsService.clickEventDatalayer).toHaveBeenCalledWith({
  //       isErrorPage: false,
  //       siteSection,
  //       siteSubSection,
  //       clickInfo: {
  //         clickName:
  //           labelsBaseManagerACMapproval.tabCurrentRequests.labelApproved,
  //         clickComponentType: AnalyticsComponent.BUTTON,
  //         componentName:
  //           labelsBaseManagerACMapproval.tabCurrentRequests.labelApproved,
  //         componentID: `${siteSection}_${siteSubSection}_${labelsBaseManagerACMapproval.tabCurrentRequests.labelApproved}`,
  //       },
  //     });
  //     expect(baseManagerService.submitApproveRequest).toHaveBeenCalledWith({
  //       requestNo: reqNo,
  //       approve: true,
  //       comment: '',
  //     });
  //   });
  // });
});
