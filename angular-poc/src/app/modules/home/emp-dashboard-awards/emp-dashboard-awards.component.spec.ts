// import { HttpClientModule } from '@angular/common/http';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { RouterTestingModule } from '@angular/router/testing';
// import {
//   MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService,
// } from '@azure/msal-angular';
// import { InteractionType, PopupRequest } from '@azure/msal-browser';
// import { of } from 'rxjs';
// import { AngularMaterialModule } from 'src/app/angular-material.module';
// import { SkeletonLoaderComponent } from 'src/app/shared/components/skeleton-loader/skeleton-loader.component';
// import { AdobeAnalyticsServiceMock } from 'src/app/shared/services/__mock__/adobe-analytics.service.mock';
// import { CommonServiceMock } from 'src/app/shared/services/__mock__/common.service.mock';
// import { MsalServiceMock } from 'src/app/shared/services/__mock__/msal.service.mock';
// import { AdobeAnalyticsService } from 'src/app/shared/services/adobe-analytics.service';
// import { CommonService } from 'src/app/shared/services/common.service';
// import { SharedModule } from 'src/app/shared/shared.module';
// import { homePageDetails, pageTitle } from '../constant';
// import { HomeService } from '../home.service';
// import { EmpDashboardAwardsComponent } from './emp-dashboard-awards.component';

// describe('EmpDashboardAwardsComponent', () => {
//   let component: EmpDashboardAwardsComponent;
//   let fixture: ComponentFixture<EmpDashboardAwardsComponent>;
//   let homeServiceSpy: jasmine.SpyObj<HomeService>;
//   let commonServiceSpy: jasmine.SpyObj<CommonService>;
//   let msalServiceSpy: jasmine.SpyObj<MsalService>;
//   let msalBroadcastService: jasmine.SpyObj<MsalBroadcastService>;
//   let adobeAnalyticsServiceSpy: jasmine.SpyObj<AdobeAnalyticsService>;

//   beforeEach(() => {
//     (window as any).bootstrap = { Carousel: jasmine.createSpy('Carousel') };
//     const spy = jasmine.createSpyObj('HomeService', ['getAwardsData']);

//     adobeAnalyticsServiceSpy = new AdobeAnalyticsServiceMock().adobeAnalyticsServiceSpy;
//     commonServiceSpy = new CommonServiceMock().commonServiceSpy;
//     msalServiceSpy = new MsalServiceMock().msalServiceSpy;

//     const msalGuardConfigStub: MsalGuardConfiguration = {
//       authRequest: {} as PopupRequest,
//       interactionType: InteractionType.Popup,
//     };
//     msalBroadcastService = jasmine.createSpyObj('MsalBroadcastService', [
//       'inProgress$',
//       'msalInstance',
//     ]);

//     TestBed.configureTestingModule({
//       imports: [
//         RouterTestingModule,
//         SharedModule,
//         HttpClientModule,
//         HttpClientTestingModule,
//         AngularMaterialModule,
//         BrowserAnimationsModule,
//         BrowserModule,
//       ],
//       declarations: [
//         EmpDashboardAwardsComponent,
//         SkeletonLoaderComponent,
//       ],
//       providers: [
//         {
//           provide: HomeService,
//           useValue: spy,
//         },
//         {
//           provide: AdobeAnalyticsService,
//           useValue: adobeAnalyticsServiceSpy,
//         },
//         {
//           provide: CommonService,
//           useValue: commonServiceSpy,
//         },
//         {
//           provide: MsalService,
//           useValue: msalServiceSpy,
//         },
//         { provide: MsalBroadcastService, useValue: msalBroadcastService },
//         { provide: MSAL_GUARD_CONFIG, useValue: msalGuardConfigStub },
//       ],
//     });

//     fixture = TestBed.createComponent(EmpDashboardAwardsComponent);

//     component = fixture.componentInstance;
//     component.awardsAndAppreciationsLabels = homePageDetails.awardsAndAppreciationsLabels;
//     component.siteSection = pageTitle;

//     homeServiceSpy = TestBed.inject(HomeService) as jasmine.SpyObj<HomeService>;
//   });

//   it('should create component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should set awardsTitle', () => {
//     const mockLabels = {
//       title: 'Awards & Appreciations',
//       ctaText: 'Start appreciating your colleagues',
//       noDataText: 'Every achievement begins with the first step',
//     };
//     component.awardsAndAppreciationsLabels = mockLabels;

//     const mockResponse = {
//       data: {
//         awardInfo: [],
//         AppreciationInfo: [],
//       },
//     };

//     homeServiceSpy.getAwardsData.and.returnValue(of(mockResponse));

//     fixture.detectChanges();

//     expect(component.awardsTitle).toEqual('Awards & Appreciations');
//     expect(component.awardsBtn).toEqual('Start appreciating your colleagues');
//   });

//   it('should getAwardsData', () => {
//     const mockAwardsData = { data: { awardInfo: [], AppreciationInfo: [] } };
//     homeServiceSpy.getAwardsData.and.returnValue(of(mockAwardsData));

//     fixture.detectChanges();

//     expect(homeServiceSpy.getAwardsData).toHaveBeenCalled();
//   });

//   it('should map awards', () => {
//     const awardsData = [
//       { awardName: 'Award1', numberOfAwardReceived: 2 },
//       { appreciationName: 'Appreciation1', numberOfAppreciationReceived: 3 },
//     ];

//     const mappedAwardsData = component.mapAwardsData(awardsData);

//     expect(mappedAwardsData.length).toBe(2);
//     expect(mappedAwardsData[0].awardName).toEqual('Award1');
//     expect(mappedAwardsData[0].numberOfAwardsReceived).toEqual(2);
//     expect(mappedAwardsData[1].awardName).toEqual('Appreciation1');
//     expect(mappedAwardsData[1].numberOfAwardsReceived).toEqual(3);
//   });

//   it('should split awards', () => {
//     const awardsData = [
//       { awardName: 'Award1', numberOfAwardsReceived: 2 },
//       { awardName: 'Award2', numberOfAwardsReceived: 1 },
//       { awardName: 'Award3', numberOfAwardsReceived: 4 },
//     ];

//     component.awardsData = awardsData;
//     component.awardsDataSplit();

//     expect(component.awardsDataAfterSlice.length).toBe(2);
//     expect(component.awardsDataAfterSlice[0].length).toBe(2);
//     expect(component.awardsDataAfterSlice[1].length).toBe(1);
//   });
// });
