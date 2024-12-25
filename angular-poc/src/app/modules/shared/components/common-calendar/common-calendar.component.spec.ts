import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  MSAL_GUARD_CONFIG,
  MsalBroadcastService,
  MsalGuardConfiguration,
  MsalService,
} from '@azure/msal-angular';
import { InteractionType, PopupRequest } from '@azure/msal-browser';
import { CommonService } from '../../services/common.service';
import { CommonCalendarComponent } from './common-calendar.component';
import { DynamicScriptLoaderService } from '../../services/dynamic-script-loader.service';

describe('CommonCalendarComponent', () => {
  let component: CommonCalendarComponent;
  let fixture: ComponentFixture<CommonCalendarComponent>;
  let authServiceStub: jasmine.SpyObj<MsalService>;
  let msalBroadcastService: jasmine.SpyObj<MsalBroadcastService>;
  let commonService: jasmine.SpyObj<CommonService>;
  beforeEach(() => {
    authServiceStub = jasmine.createSpyObj('MsalService', [
      'loginPopup',
      'loginRedirect',
      'instance',
    ]);

    msalBroadcastService = jasmine.createSpyObj('MsalBroadcastService', [
      'inProgress$',
      'msalInstance',
    ]);
    commonService = jasmine.createSpyObj('CommonService', [
      'fetchPersonaInfo',
      'getPickList',
      'isTimeProfileExistsForEmployee',
      'isLoggedInEmpFromIndia',
      'isImageValid',
      'getEmpDataStatus',
      'getDateFormat',
    ]);
    const msalGuardConfigStub: MsalGuardConfiguration = {
      authRequest: {} as PopupRequest,
      interactionType: InteractionType.Popup,
    };
    TestBed.configureTestingModule({
      declarations: [CommonCalendarComponent],
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        DynamicScriptLoaderService,
        { provide: MSAL_GUARD_CONFIG, useValue: msalGuardConfigStub },
        { provide: MsalService, useValue: authServiceStub },
        { provide: MsalBroadcastService, useValue: msalBroadcastService },
        CommonService],
    });
    fixture = TestBed.createComponent(CommonCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit date change event after a timeout', (done) => {
    const eventMock = {};
    component.dateValueChanged.subscribe((emittedEvent) => {
      expect(emittedEvent).toEqual(eventMock);
      done();
    });
    component.onDateValueChange(eventMock);
    fixture.detectChanges();
  });
  it('should set datePlaceholder based on isLoggedInEmpFromIndia is false', () => {
    commonService.isLoggedInEmpFromIndia.and.callFake(() => false);

    commonService.loggedInEmployeeData = { countryA2: 'US' }; // or any other country code that is not 'IN'

    component.ngOnInit();
    expect(component.datePlaceholder).toBe('mm/dd/yyyy');
  });
});
