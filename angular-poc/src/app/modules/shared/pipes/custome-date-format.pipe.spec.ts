import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
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
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { DebugService } from 'src/app/shared/services/debug.service';
import { DebugServiceMock } from 'src/app/shared/services/debug.service.mock';
import { SharedModule } from '../shared.module';
import { CustomDatePipe } from './custome-date-format.pipe';

describe('CustomDatePipe', () => {
  let pipe: CustomDatePipe;
  let authServiceStub: jasmine.SpyObj<MsalService>;
  let msalBroadcastService: jasmine.SpyObj<MsalBroadcastService>;
  let debugServiceSpy: jasmine.SpyObj<DebugService>;

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

    const msalGuardConfigStub: MsalGuardConfiguration = {
      authRequest: {} as PopupRequest,
      interactionType: InteractionType.Popup,
    };

    debugServiceSpy = new DebugServiceMock().debugServiceSpy;

    TestBed.configureTestingModule({
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
        CustomDatePipe,
        HttpClient,
        { provide: MsalService, useValue: authServiceStub },
        { provide: MsalBroadcastService, useValue: msalBroadcastService },
        { provide: MSAL_GUARD_CONFIG, useValue: msalGuardConfigStub },
        {
          provide: DebugService,
          useValue: debugServiceSpy,
        },
      ],
    });
    pipe = TestBed.inject(CustomDatePipe);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the input value when invalid input is passed', () => {
    const invalidInput = false;
    const result = pipe.transform(invalidInput);
    expect(result).toBe(invalidInput);
  });

  it('should log error and return input value when invalid Date object is passed', () => {
    const result = pipe.transform(false);
    expect(debugServiceSpy.error).toHaveBeenCalled();
    expect(result).toBe(false);
  });

  it('should return input value if it is not a valid date', () => {
    const invalidDate = false;
    const expectedResult = invalidDate;

    const formattedDate = pipe.transform(invalidDate);

    expect(formattedDate).toBe(expectedResult);
    expect(debugServiceSpy.error).toHaveBeenCalledWith(
      'Invalid date provided to customDate pipe:',
      invalidDate,
    );
  });

  // it('should return input value if an error occurs during date formatting', () => {
  //   const inputDate = new Date('2024-04-10T12:00:00');
  //   const expectedResult = inputDate;

  //   spyOn(Date.prototype, 'getTime').and.returnValue(1621771200000);
  //   spyOn(DatePipe.prototype, 'transform').and.throwError(
  //     'Mock DatePipe Error',
  //   );

  //   spyOn(console, 'error');

  //   const formattedDate = pipe.transform(inputDate);

  //   expect(formattedDate).toBe(expectedResult);
  //   expect(console.error).toHaveBeenCalledWith(
  //     'Error formatting date:',
  //     jasmine.any(Error),
  //   );
  // });
});
