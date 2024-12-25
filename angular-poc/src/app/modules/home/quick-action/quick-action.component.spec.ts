// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { Router } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
// import { throwError } from 'rxjs';
// import { SkeletonLoaderComponent } from 'src/app/shared/components/skeleton-loader/skeleton-loader.component';
// import { ChunkPipe } from 'src/app/shared/pipes/chunk.pipe';
// import { AdobeAnalyticsServiceMock } from 'src/app/shared/services/__mock__/adobe-analytics.service.mock';
// import { CommonServiceMock } from 'src/app/shared/services/__mock__/common.service.mock';
// import { AdobeAnalyticsService } from 'src/app/shared/services/adobe-analytics.service';
// import { CommonService } from 'src/app/shared/services/common.service';
// import { homePageDetails, pageTitle } from '../constant';
// import { HomeService } from '../home.service';
// import { HomeServiceMock } from '../home.service.mock';
// import { QuickActionComponent } from './quick-action.component';

// const mockQuickAction = [
//   [
//     {
//       appId: 'EN_IN-1',
//       label: 'Leaves',
//       iconName: 'date_range',
//       iconColor: 'rgba(232, 149, 129, 1)',
//       iconBgColor: 'rgba(232, 149, 129, 0.06)',
//       iconHoverBgColor: 'rgba(255, 140, 0, 0.15)',
//       linkPath: '/content/my-ai/in/en/leave.html',
//       isExternal: false,
//       isQuickAction: true,
//       isOneIdIcon: false,
//     },
//     {
//       appId: 'EN_IN-2',
//       label: 'myTeam',
//       iconName: 'supervisor_account',
//       iconColor: 'rgba(49, 116, 224, 1)',
//       iconBgColor: 'rgba(49, 116, 224, 0.06)',
//       iconHoverBgColor: 'rgba(49, 116, 224, 0.15)',
//       linkPath: '/content/my-ai/in/en/my-team.html',
//       isExternal: false,
//       isQuickAction: true,
//       isOneIdIcon: false,
//     },
//     {
//       appId: 'EN_IN-4',
//       label: 'Payroll',
//       iconName: 'payments',
//       iconColor: 'rgba(35, 162, 190, 1)',
//       iconBgColor: 'rgba(35, 162, 190, 0.06)',
//       iconHoverBgColor: 'rgba(35, 162, 190, 0.15)',
//       linkPath: '/content/my-ai/in/en/payroll.html',
//       isExternal: false,
//       isQuickAction: true,
//       isOneIdIcon: false,
//     },
//     {
//       appId: 'EN_IN-3',
//       label: 'Service Request',
//       iconName: 'confirmation_number',
//       iconColor: 'rgba(167, 30, 162, 1)',
//       iconBgColor: 'rgba(167, 30, 162, 0.06)',
//       iconHoverBgColor: 'rgba(167, 30, 162, 0.15)',
//       linkPath: '/content/my-ai/in/en/service-request.html',
//       isExternal: false,
//       isQuickAction: true,
//       isOneIdIcon: false,
//     },
//     {
//       appId: 'EN_IN-5',
//       label: 'Benefits',
//       iconName: 'medical_information',
//       iconColor: 'rgba(112, 213, 135, 1)',
//       iconBgColor: 'rgba(112, 213, 135, 0.06)',
//       iconHoverBgColor: 'rgba(112, 213, 135, 0.15)',
//       linkPath: '/content/my-ai/in/en/benefits.html',
//       isExternal: false,
//       isQuickAction: true,
//       isOneIdIcon: false,
//     },
//     {
//       appId: 'EN_IN-6',
//       label: 'Policies',
//       iconName: 'policy',
//       iconColor: 'rgba(158, 121, 71, 1)',
//       iconBgColor: 'rgba(158, 121, 71, 0.06)',
//       iconHoverBgColor: 'rgba(158, 121, 71, 0.15)',
//       linkPath: '/content/my-ai/in/en/policy.html',
//       isExternal: false,
//       isQuickAction: true,
//       isOneIdIcon: false,
//     },
//     {
//       appId: 'EN_IN-7',
//       label: 'myDocuments',
//       iconName: 'article',
//       iconColor: 'rgba(139, 110, 220, 1)',
//       iconBgColor: 'rgba(139, 110, 220, 0.06)',
//       iconHoverBgColor: 'rgba(107, 52, 176, 0.15)',
//       linkPath: '/content/my-ai/in/en/mydocuments.html',
//       isExternal: false,
//       isQuickAction: true,
//       isOneIdIcon: false,
//     },
//     {
//       appId: 'EN_IN-14',
//       label: 'myTrips',
//       iconName: 'card_travel',
//       iconColor: 'rgba(235, 190, 105, 1)',
//       iconBgColor: 'rgba(235, 190, 105, 0.06)',
//       iconHoverBgColor: 'rgba(235, 190, 105, 0.15)',
//       linkPath: '/content/my-ai/in/en/my-trip.html',
//       isExternal: false,
//       isQuickAction: true,
//       isOneIdIcon: false,
//     },
//   ],
//   [
//     {
//       appId: 'EN_IN-8',
//       label: 'Learning Calender',
//       iconName: 'school',
//       iconColor: 'rgba(217, 184, 7, 1)',
//       iconBgColor: 'rgba(217, 184, 7, 0.06)',
//       iconHoverBgColor: 'rgba(217, 184, 7, 0.15)',
//       linkPath: '/content/my-ai/in/en/learning-management.html',
//       isExternal: false,
//       isQuickAction: true,
//       isOneIdIcon: false,
//     },
//   ],
// ];

// describe('QuickActionComponent', () => {
//   let component: QuickActionComponent;
//   let fixture: ComponentFixture<QuickActionComponent>;
//   let adobeAnalyticsServiceSpy: jasmine.SpyObj<AdobeAnalyticsService>;
//   let commonServiceSpy: jasmine.SpyObj<CommonService>;
//   let homeServiceSpy: jasmine.SpyObj<HomeService>;

//   beforeEach(async () => {
//     adobeAnalyticsServiceSpy = new AdobeAnalyticsServiceMock()
//       .adobeAnalyticsServiceSpy;

//     commonServiceSpy = new CommonServiceMock().commonServiceSpy;

//     homeServiceSpy = new HomeServiceMock().homeServiceSpy;

//     await TestBed.configureTestingModule({
//       declarations: [QuickActionComponent, SkeletonLoaderComponent],
//       imports: [RouterTestingModule],
//       providers: [
//         {
//           provide: AdobeAnalyticsService,
//           useValue: adobeAnalyticsServiceSpy,
//         },
//         {
//           provide: CommonService,
//           useValue: commonServiceSpy,
//         },
//         {
//           provide: HomeService,
//           useValue: homeServiceSpy,
//         },
//         {
//           provide: Router,
//           useValue: jasmine.createSpyObj('Router', ['navigate']),
//         },
//         ChunkPipe,
//       ],
//     }).compileComponents();

//     fixture = TestBed.createComponent(QuickActionComponent);

//     component = fixture.componentInstance;
//     component.quickActionLabels = homePageDetails.quickActionLabels;
//     component.siteSection = pageTitle;
//     component.QUICK_ACTION = mockQuickAction;

//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should handle quick action data load failure', () => {
//     homeServiceSpy.getQuickActionsDataFromAEM.and.returnValue(
//       throwError(() => new Error('API Error')),
//     );

//     component.ngOnInit();

//     expect(component.isDataLoaded).toBe(true);
//   });

//   it('should navigate internally with query params', () => {
//     const link = '/example-route?tab=1';
//     const queryParams = commonServiceSpy.extractQueryParams(link);
//     const expectedRoute = queryParams ? [link.split('?')[0]] : [link];
//     component.onNavigate(link, false, '', 'false', '', '');
//     expect(component.router.navigate).toHaveBeenCalledWith(expectedRoute, {
//       queryParams,
//     });
//   });

//   it('should navigate internally without query params', () => {
//     const link = '/example-route';
//     const queryParams = commonServiceSpy.extractQueryParams(link);
//     const expectedRoute = queryParams ? [link.split('?')[0]] : [link];
//     component.onNavigate(link, false, '', 'false', '', '');
//     expect(component.router.navigate).toHaveBeenCalledWith(expectedRoute, {
//       queryParams,
//     });
//   });

//   it('should open link in new tab', () => {
//     const spy = spyOn(window, 'open');
//     const link = 'http://example.com';
//     const isExternal = true;
//     component.onNavigate(link, isExternal, '', 'false', '', '');

//     expect(spy).toHaveBeenCalledWith(link, '_blank');
//   });
// });
