import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MSAL_GUARD_CONFIG, MSAL_INSTANCE, MsalBroadcastService, MsalGuardConfiguration, MsalService,
} from '@azure/msal-angular';
import { InteractionStatus, InteractionType, PopupRequest } from '@azure/msal-browser';
import { of, throwError } from 'rxjs';
import { AnalyticsInfoData } from 'src/app/shared/constants';
import { AdobeAnalyticsServiceMock } from 'src/app/shared/services/__mock__/adobe-analytics.service.mock';
import { AdobeAnalyticsService } from 'src/app/shared/services/adobe-analytics.service';
import { DebugService } from 'src/app/shared/services/debug.service';
import { StorageEncryptionService } from 'src/app/shared/services/storage-encryption.service';
import { JOURNEY_TYPES, labelsBaseManagerACMapproval } from '../../base-manager.constant';
import { RequestData } from '../../base-manager.interface';
import { BaseManagerService } from '../../base-manager.service';
import { BaseManagerViewDetailsComponent } from './base-manager-view-details.component';

describe('BaseManagerViewDetailsComponent', () => {
  let component: BaseManagerViewDetailsComponent;
  let fixture: ComponentFixture<BaseManagerViewDetailsComponent>;
  let activatedRoute: any;
  let baseManagerService: jasmine.SpyObj<BaseManagerService>;
  let storageEncryptionService: jasmine.SpyObj<StorageEncryptionService>;
  let authServiceStub: { instance: any };
  let adobeAnalyticsServiceSpy: jasmine.SpyObj<AdobeAnalyticsService>;

  beforeEach(async () => {
    adobeAnalyticsServiceSpy = new AdobeAnalyticsServiceMock().adobeAnalyticsServiceSpy;

    activatedRoute = {
      queryParams: of({
        reqNo: '12345',
        filter: 'Pending',
        selectedReq: '1',
      }),
    };
    authServiceStub = {
      instance: {
        getAllAccounts: jasmine
          .createSpy('getAllAccounts')
          .and.returnValue([{ username: 'testuser' }]),
        setActiveAccount: jasmine.createSpy('setActiveAccount'),
      },
    };
    const baseManagerServiceSpy = jasmine.createSpyObj('BaseManagerService', ['getBaseManagerData', 'getAcmHistoryList']);
    const storageEncryptionServiceSpy = jasmine.createSpyObj('StorageEncryptionService', ['getvalue']);
    const msalInstanceMock = {
      addEventCallback: () => {},
    };

    const msalGuardConfigStub: MsalGuardConfiguration = {
      authRequest: {} as PopupRequest,
      interactionType: InteractionType.Popup,
    };

    const mockMsalBroadcastService = {
      inProgress$: of(InteractionStatus.None),
    };
    await TestBed.configureTestingModule({
      imports: [OverlayModule],
      declarations: [BaseManagerViewDetailsComponent],
      providers: [HttpClient, HttpHandler, MatSnackBar,
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: BaseManagerService, useValue: baseManagerServiceSpy },
        { provide: StorageEncryptionService, useValue: storageEncryptionServiceSpy },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        { provide: MsalService, useValue: authServiceStub },
        { provide: MSAL_INSTANCE, useValue: msalInstanceMock },
        { provide: MSAL_GUARD_CONFIG, useValue: msalGuardConfigStub },
        { provide: MsalBroadcastService, useValue: mockMsalBroadcastService },
        {
          provide: AdobeAnalyticsService,
          useValue: adobeAnalyticsServiceSpy,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseManagerViewDetailsComponent);
    component = fixture.componentInstance;
    component.labelsBaseManagerACMapproval = labelsBaseManagerACMapproval;
    baseManagerService = TestBed.inject(BaseManagerService) as jasmine.SpyObj<BaseManagerService>;
    storageEncryptionService = TestBed.inject(StorageEncryptionService) as jasmine.SpyObj<StorageEncryptionService>;

    adobeAnalyticsServiceSpy.setAnalyticsInfo(AnalyticsInfoData);
  });

  beforeEach(() => {
    storageEncryptionService.getvalue.and.returnValue('{"detailsType": "DOMESTIC"}');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should process query parameters and fetch manager details', () => {
      spyOn(component, 'getManagerDetails');
      fixture.detectChanges();

      expect(component.reqNo).toBe('12345');
      expect(component.selectedBtn).toBe('Pending');
      expect(component.hideDetails).toBe(true);
      expect(component.selectedReq).toBe('1');
      expect(component.getManagerDetails).not.toHaveBeenCalled();
    });

    // it('should process query parameters and fetch manager details without selectedReq', () => {
    //   activatedRoute.queryParams = of({
    //     reqNo: '12345',
    //     filter: 'Pending',
    //   });
    //   spyOn(component, 'getManagerDetails');
    //   component.ngOnInit();
    //    fixture.detectChanges();

    //   expect(component.reqNo).toBe('12345');
    //   expect(component.selectedBtn).toBe('Pending');
    //   expect(component.hideDetails).toBe(false);
    //   expect(component.selectedType).toBe('DOMESTIC');
    //   expect(component.selectedTabIndex).toBe(1);
    //   expect(component.getManagerDetails).toHaveBeenCalledWith('12345');
    // });

    it('should scroll to top of page', () => {
      const scrollToSpy = spyOn(window, 'scrollTo');
      fixture.detectChanges();
      expect(scrollToSpy).toHaveBeenCalledTimes(1);
      expect(scrollToSpy).toHaveBeenCalledWith(0, 0);
    });
  });

  describe('getManagerDetails', () => {
    it('should fetch manager data and update component properties', () => {
      const mockResponse = {
        status: { code: 200 },
        data: {
          generatedRequestNo: 'REQ001',
          tripType: 'Business',
          journeyType: 'DOMESTIC',
          status: 'Active',
          comment: 'Some comment',
          firstName: 'John',
          middleName: 'A.',
          lastName: 'Doe',
          empId: '12345',
          designation: 'Manager',
          lastUpdatedDate: new Date().toISOString(),
          trips: [
            {
              primary: {
                journeyKey: 'J1',
                fromStationCode: 'DEL',
                fromStationName: 'Delhi Airport',
                fromStationCity: 'Delhi',
                fromTerminal: null,
                fromCountry: 'IN',
                toStationCode: 'TRV',
                toStationName: 'Thiruvananthapuram Airport',
                toStationCity: 'Thiruvananthapuram',
                toTerminal: '1',
                toCountry: 'IN',
                amadeusDepartureDate: '2024-08-01',
                amadeusArrivalDate: '2024-08-01',
                departureDate: '2024-08-01',
                departureTime: '10:00',
                flightNo: 'AI123',
                arrivalDate: '2024-08-01',
                arrivalTime: '12:00',
                flyingDuration: '2h',
                stops: 0,
                stopStations: null,
                flightType: 'Non-stop',
                primary: true,
                approved: true,
              },
              alternative: {
                journeyKey: 'J2',
                fromStationCode: 'DEL',
                fromStationName: 'Delhi Airport',
                fromStationCity: 'Delhi',
                fromTerminal: null,
                fromCountry: 'IN',
                toStationCode: 'TRV',
                toStationName: 'Thiruvananthapuram Airport',
                toStationCity: 'Thiruvananthapuram',
                toTerminal: '1',
                toCountry: 'IN',
                amadeusDepartureDate: '2024-08-02',
                amadeusArrivalDate: '2024-08-02',
                departureDate: '2024-08-02',
                departureTime: '14:00',
                flightNo: 'AI124',
                arrivalDate: '2024-08-02',
                arrivalTime: '16:00',
                flyingDuration: '2h',
                stops: 1,
                stopStations: 'BLR',
                flightType: 'One-stop',
                primary: false,
                approved: false,
              },
            },
          ],
          documents: [
            {
              docId: 'DOC001',
              originalFileName: 'document1.pdf',
              docMimeType: 'application/pdf',
            },
            {
              docId: 'DOC002',
              originalFileName: 'document2.jpg',
              docMimeType: 'image/jpeg',
            },
          ],
        } as RequestData, // Cast to RequestData to match the expected type
      };
      baseManagerService.getBaseManagerData.and.returnValue(of(mockResponse));
      spyOn(component, 'getHistoryData');
      component.hideDetails = false;
      component.getManagerDetails('12345');

      expect(baseManagerService.getBaseManagerData).toHaveBeenCalledWith('12345');
      expect(component.managerData).toEqual(mockResponse.data);
      expect(component.title).toBe('');
      expect(component.getHistoryData).toHaveBeenCalledWith(JOURNEY_TYPES.DOMESTIC, '12345', 0, 1);
    });

    it('should fetch manager data but not call getHistoryData when hideDetails is true', () => {
      const mockResponse = {
        status: { code: 200 },
        data: {
          generatedRequestNo: 'REQ001',
          tripType: 'Business',
          journeyType: 'DOMESTIC',
          status: 'Active',
          comment: 'Some comment',
          firstName: 'John',
          middleName: 'A.',
          lastName: 'Doe',
          empId: '12345',
          designation: 'Manager',
          lastUpdatedDate: new Date().toISOString(),
          trips: [
            {
              primary: {
                journeyKey: 'J1',
                fromStationCode: 'DEL',
                fromStationName: 'Delhi Airport',
                fromStationCity: 'Delhi',
                fromTerminal: null,
                fromCountry: 'IN',
                toStationCode: 'TRV',
                toStationName: 'Thiruvananthapuram Airport',
                toStationCity: 'Thiruvananthapuram',
                toTerminal: '1',
                toCountry: 'IN',
                amadeusDepartureDate: '2024-08-01',
                amadeusArrivalDate: '2024-08-01',
                departureDate: '2024-08-01',
                departureTime: '10:00',
                flightNo: 'AI123',
                arrivalDate: '2024-08-01',
                arrivalTime: '12:00',
                flyingDuration: '2h',
                stops: 0,
                stopStations: null,
                flightType: 'Non-stop',
                primary: true,
                approved: true,
              },
            },
          ],
          documents: [
            {
              docId: 'DOC001',
              originalFileName: 'document1.pdf',
              docMimeType: 'application/pdf',
            },
            {
              docId: 'DOC002',
              originalFileName: 'document2.jpg',
              docMimeType: 'image/jpeg',
            },
          ],
        } as RequestData, // Cast to RequestData to match the expected type
      };
      baseManagerService.getBaseManagerData.and.returnValue(of(mockResponse));
      spyOn(component, 'getHistoryData');
      component.hideDetails = true;
      component.getManagerDetails('12345');

      expect(baseManagerService.getBaseManagerData).toHaveBeenCalledWith('12345');
      expect(component.managerData).toEqual(mockResponse.data);
      expect(component.title).toBe('');
      expect(component.getHistoryData).not.toHaveBeenCalled();
    });

    it('should log an error when the service call fails', () => {
      const errorObj = { error: { data: {} } };
      baseManagerService.getBaseManagerData.and.returnValue(throwError(errorObj));
      spyOn(DebugService.prototype, 'log');
      component.getManagerDetails('12345');

      expect(baseManagerService.getBaseManagerData).toHaveBeenCalledWith('12345');
      expect(DebugService.prototype.log).toHaveBeenCalledWith('Error fetching Data:', errorObj);
    });
  });

  describe('getHistoryData', () => {
    it('should fetch history data and update component properties', () => {
      const mockResponse = {
        status: { code: 200 },
        data: {
          acmList: [{ historyId: 1 }],
          isViewMore: true,
        },
      };
      baseManagerService.getAcmHistoryList.and.returnValue(of(mockResponse));
      component.getHistoryData('DOMESTIC', '12345', 0, 1);

      expect(baseManagerService.getAcmHistoryList).toHaveBeenCalledWith('12345', 'DOMESTIC', 0, 1);
      expect(component.historyData).toEqual([{ historyId: 1 }]);
      expect(component.viewMoreData).toBe(true);
    });
  });

  describe('onCountryTypeChange', () => {
    it('should call getHistoryData with the correct parameters', () => {
      spyOn(component, 'getHistoryData');
      const event = { selectedType: 'INTERNATIONAL', offset: 0, limit: 1 };
      component.onCountryTypeChange(event);

      expect(component.getHistoryData).toHaveBeenCalledWith('INTERNATIONAL', component.managerData?.empId, 0, 1);
    });
  });

  describe('getRequestData', () => {
    it('should update title with the provided event string', () => {
      const title = 'New Title';
      component.getRequestData(title);
      expect(component.title).toBe(`${labelsBaseManagerACMapproval.tabCurrentRequests.labelCaptain} ${title}`);
    });
  });
});
