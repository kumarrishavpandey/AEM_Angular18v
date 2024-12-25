// import { TestBed } from '@angular/core/testing';

// import { HttpClientModule } from '@angular/common/http';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import {
//   MSAL_GUARD_CONFIG,
//   MsalBroadcastService,
//   MsalGuardConfiguration,
//   MsalService,
// } from '@azure/msal-angular;
// import { InteractionType, PopupRequest } from '@azure/msal-browser';
// import { CommonServiceMock } from './__mock__/common.service.mock';
// import { AdobeAnalyticsService } from './adobe-analytics.service';
// import { CommonService } from './common.service';
// import { DebugService } from './debug.service';

// describe('AdobeAnalyticsService', () => {
//   let authServiceStub: jasmine.SpyObj<MsalService>;
//   let msalBroadcastService: jasmine.SpyObj<MsalBroadcastService>;
//   const msalGuardConfigStub: MsalGuardConfiguration = {
//     authRequest: {} as PopupRequest,
//     interactionType: InteractionType.Popup,
//   };
//   let service: AdobeAnalyticsService;
//   let commonServiceSpy: jasmine.SpyObj<CommonService>;

//   beforeEach(() => {
//     commonServiceSpy = new CommonServiceMock().commonServiceSpy;

//     TestBed.configureTestingModule({
//       imports: [HttpClientModule, HttpClientTestingModule, RouterTestingModule],
//       providers: [
//         { provide: MsalService, useValue: authServiceStub },
//         { provide: MSAL_GUARD_CONFIG, useValue: msalGuardConfigStub },
//         { provide: MsalBroadcastService, useValue: msalBroadcastService },
//         { provide: CommonService, useValue: commonServiceSpy },
//         DebugService,
//       ],
//     });
//     service = TestBed.inject(AdobeAnalyticsService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });
