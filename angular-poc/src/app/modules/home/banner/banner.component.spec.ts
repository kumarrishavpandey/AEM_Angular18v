// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint prefer-promise-reject-errors : 'off' */
// import { DatePipe } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import {
//   ComponentFixture,
//   TestBed,
//   fakeAsync,
//   tick,
// } from '@angular/core/testing';
// import { Router } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
// import {
//   MSAL_GUARD_CONFIG,
//   MsalBroadcastService,
//   MsalGuardConfiguration,
//   MsalService,
// } from '@azure/msal-angular';
// import { InteractionType, PopupRequest } from '@azure/msal-browser';
// import { of, Subject } from 'rxjs';
// import { AzureService } from 'src/app/shared/services/azure.service';
// import { CommonService } from 'src/app/shared/services/common.service';
// import { DynamicScriptLoaderService } from 'src/app/shared/services/dynamic-script-loader.service';
// import { environment } from 'src/environments/environment';
// import { MatDialogModule } from '@angular/material/dialog';
// import { bannerPageTitle, homePageDetails, pageTitle } from '../constant';
// import { BannerComponent } from './banner.component';
// import { NavigationService } from '../../navigation/navigation.service';

// const weatherResp = { results: [{ iconCode: '01d' }] };

// const timezoneResp = {
//   TimeZones: [
//     {
//       ReferenceTime: {
//         WallTime: '2022-10-20T10:00:00',
//         StandardOffset: '03:00',
//       },
//     },
//   ],
// };

// describe('BannerComponent', () => {
//   let component: BannerComponent;
//   let fixture: ComponentFixture<BannerComponent>;
//   let commonService: CommonService;
//   let azureService: AzureService;
//   let authServiceStub: jasmine.SpyObj<MsalService>;
//   let msalBroadcastService: jasmine.SpyObj<MsalBroadcastService>;
//   let router: Router;
//   let datePipe: DatePipe;
//   let personalisedNavigationSubject: Subject<any>;
//   let navigationService: jasmine.SpyObj<NavigationService>;

//   beforeEach(async () => {
//     (window as any).bootstrap = { Carousel: jasmine.createSpy('Carousel') };
//     authServiceStub = jasmine.createSpyObj('MsalService', [
//       'loginPopup',
//       'loginRedirect',
//       'instance',
//     ]);

//     msalBroadcastService = jasmine.createSpyObj('MsalBroadcastService', [
//       'inProgress$',
//       'msalInstance',
//     ]);

//     const spyNavigationService = jasmine.createSpyObj('NavigationService', [
//       'personalisedNavigation',
//     ]);

//     personalisedNavigationSubject = new Subject<any>();

//     spyNavigationService.personalisedNavigation = personalisedNavigationSubject.asObservable();

//     const msalGuardConfigStub: MsalGuardConfiguration = {
//       authRequest: {} as PopupRequest,
//       interactionType: InteractionType.Popup,
//     };

//     await TestBed.configureTestingModule({
//       declarations: [BannerComponent],
//       imports: [RouterTestingModule, HttpClientModule, HttpClientTestingModule, MatDialogModule],
//       providers: [
//         CommonService,
//         AzureService,
//         DynamicScriptLoaderService,
//         { provide: MSAL_GUARD_CONFIG, useValue: msalGuardConfigStub },
//         { provide: MsalService, useValue: authServiceStub },
//         { provide: MsalBroadcastService, useValue: msalBroadcastService },
//         { provide: NavigationService, useValue: spyNavigationService },
//         DatePipe,
//       ],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(BannerComponent);

//     component = fixture.componentInstance;
//     component.bannerLabels = homePageDetails.bannerLabels;
//     component.siteSection = pageTitle;
//     component.siteSubSection = bannerPageTitle;
//     navigationService = TestBed.inject(
//       NavigationService,
//     ) as jasmine.SpyObj<NavigationService>;

//     commonService = TestBed.inject(CommonService);
//     azureService = TestBed.inject(AzureService);
//     router = TestBed.inject(Router);
//     datePipe = TestBed.inject(DatePipe);
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   describe('setRosterApplicable', () => {
//     it('should set isRosterApplicable to true if userPersona is crew', () => {
//       component.setRosterApplicable('crew');
//       expect(component.isRosterApplicable).toBeTrue();
//     });

//     it('should set isRosterApplicable to false if userPersona is not crew', () => {
//       component.setRosterApplicable('other');
//       expect(component.isRosterApplicable).toBeFalse();
//     });
//   });

//   it('should decide greeting message based on hours', () => {
//     const personaSalutationGeneral = homePageDetails.bannerLabels.salutationPersonaDetails[2];
//     const personaGeneralLabel = personaSalutationGeneral.salutationPersona;

//     component.hours = 10;
//     component.decideGreetingMessage(
//       component.bannerLabels,
//       personaGeneralLabel,
//     );
//     expect(component.msg).toEqual(
//       personaSalutationGeneral.salutationText[0].goodMorning,
//     );

//     component.hours = 14;
//     component.decideGreetingMessage(
//       component.bannerLabels,
//       personaGeneralLabel,
//     );
//     expect(component.msg).toEqual(
//       personaSalutationGeneral.salutationText[0].goodAfternoon,
//     );

//     component.hours = 20;
//     component.decideGreetingMessage(
//       component.bannerLabels,
//       personaGeneralLabel,
//     );
//     expect(component.msg).toEqual(
//       personaSalutationGeneral.salutationText[0].goodEvening,
//     );
//   });

//   it('should fetch banner info and set slides', fakeAsync(() => {
//     const bannerData = {
//       data: {
//         bannerDetailsModelList: {
//           items: [{ id: 1, bannerImage: { _path: '/path/to/image.jpg' } }],
//         },
//       },
//     };

//     const dynamicMediaPath = 'https://s7ap1.scene7.com/is/image/myAIstage/image?fmt=webp&resMode=sharp2&qlt=85';
//     spyOn(commonService, 'bannerInfo').and.returnValue(of(bannerData));
//     component.fetchBannerInfo();
//     tick();
//     expect(component.slides).toEqual([
//       {
//         id: 1,
//         bannerImage: { _path: '/path/to/image.jpg' },
//         updatedImagePath: dynamicMediaPath,
//       },
//     ]);
//   }));

//   it('should set userLocation based on geolocation', fakeAsync(() => {
//     const position: GeolocationPosition = {
//       coords: {
//         latitude: 10,
//         longitude: 20,
//         altitude: null,
//         accuracy: 0,
//         altitudeAccuracy: null,
//         heading: null,
//         speed: null,
//       },
//       timestamp: Date.now(),
//     };
//     spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake(
//       (success) => {
//         success(position);
//       },
//     );
//     component.getCurrentLocation().then((location) => {
//       expect(location).toEqual({ latitude: 10, longitude: 20 });
//     });
//     tick();
//   }));

//   it('should handle geolocation error', fakeAsync(() => {
//     const error: GeolocationPositionError = {
//       code: 1,
//       message: 'Geolocation error',
//       PERMISSION_DENIED: 1,
//       POSITION_UNAVAILABLE: 2,
//       TIMEOUT: 3,
//     };
//     spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake(
//       (_, errorCallback) => {
//         errorCallback(error);
//       },
//     );
//     component.getCurrentLocation().catch((err) => {
//       expect(err.message).toEqual('errorCallback is not a function');
//     });
//     tick();
//   }));

//   it('should format time offset correctly', () => {
//     expect(component.formatTimeOffset('03:00')).toEqual('+03');
//     expect(component.formatTimeOffset('-05:00')).toEqual('-05');
//     expect(component.formatTimeOffset('00:00')).toEqual('+00');
//   });

//   it('should format banner time using datePipe', () => {
//     const date = new Date();
//     const format = 'short';
//     const timezone = 'UTC';
//     const formattedTime = datePipe.transform(date, format, timezone);
//     expect(component.formatBannerTime(date, format, timezone)).toEqual(
//       formattedTime,
//     );
//   });

//   it('should initialize bootstrap carousel after view init', fakeAsync(() => {
//     component.ngAfterViewInit();
//     tick(1000);
//     expect((window as any).bootstrap.Carousel).toHaveBeenCalledWith(
//       document.getElementById('home-banner-carouselExample'),
//       { interval: 5000 },
//     );
//   }));

//   it('should unsubscribe from subscriptions on destroy', () => {
//     const nextSpy = spyOn(
//       (component as any)._destroying$,
//       'next',
//     ).and.callThrough();
//     const completeSpy = spyOn(
//       (component as any)._destroying$,
//       'complete',
//     ).and.callThrough();

//     component.ngOnDestroy();

//     expect(nextSpy).toHaveBeenCalled();
//     expect(completeSpy).toHaveBeenCalled();
//   });

//   it('should call bannerCtaRedirection correctly for internal navigation', () => {
//     const slide = {
//       isInternal: true,
//       bannerCtaPath: '/internal-path',
//       bannerDescription: { plaintext: 'SampleText' },
//     };
//     spyOn(router, 'navigate');
//     component.bannerCtaRedirection(slide);
//     expect(router.navigate).toHaveBeenCalledWith(['/internal-path'], {
//       queryParams: null,
//     });
//   });

//   it('should call bannerCtaRedirection correctly for external navigation', () => {
//     const slide = {
//       bannerCtaPath: 'http://external-path',
//       bannerDescription: { plaintext: 'SampleText' },
//     };
//     spyOn(window, 'open');
//     component.bannerCtaRedirection(slide);
//     expect(window.open).toHaveBeenCalledWith('http://external-path', '_blank');
//   });

//   it('should initialize and call required methods when loaded and not initialized', () => {
//     spyOn(component, 'checkLocationPermission');
//     spyOn(component, 'fetchBannerInfo');

//     component.ngOnInit();
//     personalisedNavigationSubject.next({ personalNavList: [] });
//     personalisedNavigationSubject.complete();

//     expect(component.checkLocationPermission).toHaveBeenCalled();
//     expect(component.fetchBannerInfo).toHaveBeenCalled();
//   });

//   describe('getCurrentWeatherInfoBrowserLocationOn', () => {
//     const localName = 'Local Name';

//     const countrySecondarySubdivision = 'Subdivision';

//     const countryCode = 'US';

//     const latitude = 10;

//     const longitude = 20;

//     beforeEach(() => {
//       spyOn(component, 'getCurrentWeatherInfo');
//     });

//     it('should get current weather info and handle success for loacl name address', () => {
//       const locationResp = {
//         addresses: [
//           {
//             address: {
//               localName,
//               countrySecondarySubdivision,
//               countryCode,
//             },
//           },
//         ],
//       };

//       spyOn(azureService, 'fetchAzureLocationInfo').and.returnValue(
//         of(locationResp),
//       );

//       component.getCurrentWeatherInfoBrowserLocationOn({ latitude, longitude });

//       expect(azureService.fetchAzureLocationInfo).toHaveBeenCalledOnceWith(
//         latitude,
//         longitude,
//       );

//       expect(component.userLocation).toEqual(localName);
//     });

//     it('should get current weather info and handle success without loacl name address', () => {
//       const locationResp = {
//         addresses: [
//           {
//             address: {
//               countrySecondarySubdivision,
//               countryCode,
//             },
//           },
//         ],
//       };

//       spyOn(azureService, 'fetchAzureLocationInfo').and.returnValue(
//         of(locationResp),
//       );

//       component.getCurrentWeatherInfoBrowserLocationOn({ latitude, longitude });

//       expect(azureService.fetchAzureLocationInfo).toHaveBeenCalledOnceWith(
//         latitude,
//         longitude,
//       );

//       expect(component.userLocation).toEqual(countrySecondarySubdivision);
//     });
//   });

//   describe('getCurrentWeatherInfoBrowserLocationOff', () => {
//     const location = 'Location';

//     const countryCode = 'US';

//     const employeeData = {
//       locationGroupDesc: location,
//       countryA2: countryCode,
//     };

//     beforeEach(() => {
//       commonService.loggedInEmployeeData = employeeData;

//       spyOn(commonService, 'getEmpDataStatus').and.returnValue(of(true));

//       spyOn(commonService, 'getA2CountryCode').and.returnValue(countryCode);

//       spyOn(component, 'getCurrentWeatherInfo');
//     });

//     it('should set userLocation correctly', () => {
//       spyOn(azureService, 'fetchAzureCrossStreetInfo').and.returnValue(
//         of({
//           results: [
//             { address: { countryCode }, position: { lat: 10, lon: 20 } },
//           ],
//         }),
//       );

//       component.getCurrentWeatherInfoBrowserLocationOff();

//       expect(commonService.getEmpDataStatus).toHaveBeenCalledTimes(1);
//       expect(azureService.fetchAzureCrossStreetInfo).toHaveBeenCalledOnceWith(
//         employeeData.locationGroupDesc,
//       );
//       expect(component.userLocation).toEqual(location);
//     });

//     it('should handle case when matchedCountryCodeObj is found', () => {
//       spyOn(azureService, 'fetchAzureCrossStreetInfo').and.returnValue(
//         of({
//           results: [
//             { address: { countryCode }, position: { lat: 10, lon: 20 } },
//           ],
//         }),
//       );

//       component.getCurrentWeatherInfoBrowserLocationOff();

//       expect(component.getCurrentWeatherInfo).toHaveBeenCalledOnceWith(
//         10,
//         20,
//         countryCode,
//       );
//     });

//     it('should handle case when matchedCountryCodeObj is not found', () => {
//       spyOn(azureService, 'fetchAzureCrossStreetInfo').and.returnValue(
//         of({ results: [] }),
//       );

//       component.getCurrentWeatherInfoBrowserLocationOff();

//       expect(component.getCurrentWeatherInfo).not.toHaveBeenCalled();
//     });
//   });

//   describe('getCurrentWeatherInfo', () => {
//     const latitude = 10;

//     const longitude = 20;

//     const userPersona = 'general';

//     beforeEach(() => {
//       spyOn(commonService, 'getEmployeeRole').and.returnValue(
//         Promise.resolve(userPersona),
//       );

//       spyOn(azureService, 'fetchAzureWeatherInfo').and.returnValue(
//         of(weatherResp),
//       );
//       spyOn(azureService, 'fetchAzureTimezoneInfo').and.returnValue(
//         of(timezoneResp),
//       );

//       spyOn(component, 'setRosterApplicable');
//       spyOn(component, 'decideGreetingMessage');
//     });

//     it('should handle weather and timezone info correctly for US', fakeAsync(() => {
//       const countryCode = 'US';

//       component.getCurrentWeatherInfo(latitude, longitude, countryCode);

//       tick();

//       expect(commonService.getEmployeeRole).toHaveBeenCalledTimes(1);
//       expect(component.setRosterApplicable).toHaveBeenCalledOnceWith(
//         userPersona,
//       );
//       expect(azureService.fetchAzureWeatherInfo).toHaveBeenCalledOnceWith(
//         latitude,
//         longitude,
//         'imperial',
//       );
//       expect(azureService.fetchAzureTimezoneInfo).toHaveBeenCalledOnceWith(
//         latitude,
//         longitude,
//       );
//       expect(component.decideGreetingMessage).toHaveBeenCalledTimes(1);

//       expect(component.weatherData.iconCode).toEqual(
//         weatherResp.results[0].iconCode,
//       );
//       expect(component.timezoneData.ReferenceTime.StandardOffset).toEqual(
//         timezoneResp.TimeZones[0].ReferenceTime.StandardOffset,
//       );
//       expect(Number(component.hours)).toEqual(
//         new Date(timezoneResp.TimeZones[0].ReferenceTime.WallTime).getHours(),
//       );
//       expect(component.isDataLoaded).toBeTrue();
//     }));

//     it('should handle weather and timezone info correctly for other countries', fakeAsync(() => {
//       const countryCode = 'IN';

//       component.getCurrentWeatherInfo(latitude, longitude, countryCode);

//       tick();

//       expect(commonService.getEmployeeRole).toHaveBeenCalledTimes(1);
//       expect(component.setRosterApplicable).toHaveBeenCalledOnceWith(
//         userPersona,
//       );
//       expect(azureService.fetchAzureWeatherInfo).toHaveBeenCalledOnceWith(
//         latitude,
//         longitude,
//         'metric',
//       );
//       expect(azureService.fetchAzureTimezoneInfo).toHaveBeenCalledOnceWith(
//         latitude,
//         longitude,
//       );
//       expect(component.decideGreetingMessage).toHaveBeenCalledTimes(1);

//       expect(component.weatherData.iconCode).toEqual(
//         weatherResp.results[0].iconCode,
//       );
//       expect(component.timezoneData.ReferenceTime.StandardOffset).toEqual(
//         timezoneResp.TimeZones[0].ReferenceTime.StandardOffset,
//       );
//       expect(Number(component.hours)).toEqual(
//         new Date(timezoneResp.TimeZones[0].ReferenceTime.WallTime).getHours(),
//       );
//       expect(component.isDataLoaded).toBeTrue();
//     }));
//   });

//   it('should run the ngOninit', () => {
//     component.ngOnInit();
//   });

//   describe('onLocationPermissionStateChange', () => {
//     beforeEach(() => {
//       spyOn(component, 'getCurrentWeatherInfoBrowserLocationOff');
//       spyOn(component, 'getCurrentLocation').and.returnValue(
//         Promise.resolve({ latitude: 10, longitude: 20 }),
//       );
//       spyOn(component, 'getCurrentWeatherInfoBrowserLocationOn');
//     });
//     it('should call getCurrentWeatherInfoBrowserLocationOff if state is "prompt" or "denied"', () => {
//       component.onLocationPermissionStateChange('prompt');
//       expect(
//         component.getCurrentWeatherInfoBrowserLocationOff,
//       ).toHaveBeenCalled();
//       component.onLocationPermissionStateChange('denied');
//       expect(
//         component.getCurrentWeatherInfoBrowserLocationOff,
//       ).toHaveBeenCalled();
//     });
//     it('should call getCurrentLocation and getCurrentWeatherInfoBrowserLocationOn if state is "granted"', fakeAsync(() => {
//       component.onLocationPermissionStateChange('granted');
//       tick();
//       expect(component.getCurrentLocation).toHaveBeenCalled();
//       expect(
//         component.getCurrentWeatherInfoBrowserLocationOn,
//       ).toHaveBeenCalledWith({ latitude: 10, longitude: 20 });
//     }));
//   });

//   describe('Personal Navigation Actions', () => {
//     beforeEach(() => {
//       spyOn(window, 'open');
//       spyOn(component, 'bannerCtaRedirectionDL');
//       component.personalNavList = {
//         actionList: [
//           { appId: environment.DISPRZ_APP_ID },
//           { appId: environment.TCS_ION_APP_ID },
//         ],
//       };
//     });
//     it('should open DISPRZ external link', () => {
//       const slide = {
//         isTcs_disperz: true,
//         bannerExtCtaPath: 'http://disprz-link',
//       };
//       component.bannerCtaRedirection(slide);
//       expect(component.bannerCtaRedirectionDL).toHaveBeenCalledWith(
//         slide,
//         'http://disprz-link',
//       );
//       expect(window.open).toHaveBeenCalledWith('http://disprz-link', '_blank');
//     });
//     it('should open TCS Ion external link if DISPRZ is absent', () => {
//       const slide = {
//         isTcs_disperz: true,
//         bannerCtaPath: 'http://tcs-ion-link',
//       };
//       component.bannerCtaRedirection(slide);
//       expect(component.bannerCtaRedirectionDL).toHaveBeenCalledWith(
//         slide,
//         'http://tcs-ion-link',
//       );
//       expect(window.open).toHaveBeenCalledWith('http://tcs-ion-link', '_blank');
//     });
//   });

//   describe('Male/Female Uniform Check', () => {
//     beforeEach(() => {
//       spyOn(window, 'open');
//       component.userGender = 'M';
//     });
//     it('should open male uniform form if userGender is M', () => {
//       const slide = {
//         isMaleFemaleCheck: true,
//         maleUniformformPath: 'http://male-form',
//         femaleUniformFormPath: 'http://female-form',
//         bannerCtaPath: 'http://male-form',
//         bannerDescription: { plaintext: 'SampleText' },
//       };
//       component.bannerCtaRedirection(slide);
//       expect(window.open).toHaveBeenCalledWith('http://male-form', '_blank');
//     });
//     it('should open female uniform form if userGender is F', () => {
//       component.userGender = 'F';
//       const slide = {
//         isMaleFemaleCheck: true,
//         maleUniformformPath: 'http://male-form',
//         femaleUniformFormPath: 'http://female-form',
//         bannerCtaPath: 'http://female-form',
//         bannerDescription: { plaintext: 'SampleText' },
//       };
//       component.bannerCtaRedirection(slide);
//       expect(window.open).toHaveBeenCalledWith('http://female-form', '_blank');
//     });
//   });
// });
