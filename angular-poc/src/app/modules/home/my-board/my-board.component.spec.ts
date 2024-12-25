// import { CommonModule, DatePipe } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import {
//   ComponentFixture,
//   TestBed,
//   fakeAsync,
//   tick,
// } from '@angular/core/testing';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { RouterTestingModule } from '@angular/router/testing';
// import { of, throwError } from 'rxjs';
// import { AngularMaterialModule } from 'src/app/angular-material.module';
// import { LOGGEDIN_EMP } from 'src/app/app.api';
// import { SkeletonLoaderComponent } from 'src/app/shared/components/skeleton-loader/skeleton-loader.component';
// import { AdobeAnalyticsServiceMock } from 'src/app/shared/services/__mock__/adobe-analytics.service.mock';
// import { CommonServiceMock } from 'src/app/shared/services/__mock__/common.service.mock';
// import { StorageEncryptionServiceMock } from 'src/app/shared/services/__mock__/storage-encryption.service.mock';
// import { AdobeAnalyticsService } from 'src/app/shared/services/adobe-analytics.service';
// import { CommonService } from 'src/app/shared/services/common.service';
// import { StorageEncryptionService } from 'src/app/shared/services/storage-encryption.service';
// import { environment } from 'src/environments/environment';
// import { EmployeeProfileService } from '../../employee-profile/employee-profile.service';
// import { NavigationService } from '../../navigation/navigation.service';
// import { NavigationServiceMock, personalisedNavigation } from '../../navigation/navigation.service.mock';
// import { homePageDetails, pageTitle } from '../constant';
// import { HomeService } from '../home.service';
// import { MyBoardComponent } from './my-board.component';

// const employeeId = 'testEmployeeId';

// class MockHomeService {
//   getLearningData() {
//     return of({});
//   }

//   getLeaveBalance() {
//     return of({
//       totalleaves: '32',
//       leaves: {
//         data: ['20', '6', '6'],
//         unit: ['Privilege Leave(PL)', 'Casual Leave(CL)', 'Sick Leave(SL )'],
//         text: '',
//       },
//       leaveinfo: 'This data was last updated on 2024-04-05T10:18:48.577Z',
//     });
//   }

//   getBlockHours() {
//     return of({
//       totalblockhours: null,
//       blockoursinfo:
//         'This data is for 03 Feb 2024 to 01 Mar 2024, last updated on 02 Mar 2024, 09:59 am',
//     });
//   }

//   getTakeOffsLanding() {
//     return of({
//       totalperformance: '0',
//       takeOffsLandings: {
//         data: ['2', '4'],
//         unit: ['take offs', 'landings'],
//         text: '',
//       },
//       info: 'This data is for 05 Dec 2023 to 04 Mar 2024, last updated on 05 Mar 2024, 15:11 pm',
//     });
//   }

//   getDeadHeadAndLayover() {
//     return of({
//       crewType: 'cabincrew',
//       deadHeadHours: '4',
//       totalLayovers: '5',
//       intlDomesticLayovers: {
//         data: ['1', '2'],
//         unit: ['international', 'domestic'],
//         text: '',
//       },
//       deadheadinfo: 'This data is for the month of February 2024',
//       layoverinfo: 'This data is for the month of February 2024',
//     });
//   }

//   getFlyingStats() {
//     return of({
//       staffID: null,
//       stat: {
//         data: ['60.43', '', '2.35', '22', '', ''],
//         unit: [
//           'FLYING HOURS',
//           'NIGHT STOP',
//           'SOD HOURS',
//           'SIM INST HRS',
//           'TRAINING FLYING HOURS',
//           'Training Days (trainess)',
//         ],
//       },
//       statInfoIcon: null,
//       statInfoIconContent: null,
//     });
//   }
// }

// describe('MyBoardComponent', () => {
//   let component: MyBoardComponent;
//   let fixture: ComponentFixture<MyBoardComponent>;
//   let adobeAnalyticsServiceSpy: jasmine.SpyObj<AdobeAnalyticsService>;
//   let commonServiceSpy: jasmine.SpyObj<CommonService>;
//   let navigationServiceSpy: jasmine.SpyObj<NavigationService>;
//   let storageEncryptionServiceSpy: jasmine.SpyObj<StorageEncryptionService>;
//   let empProfileService: EmployeeProfileService;

//   beforeEach(async () => {
//     adobeAnalyticsServiceSpy = new AdobeAnalyticsServiceMock().adobeAnalyticsServiceSpy;

//     commonServiceSpy = new CommonServiceMock().commonServiceSpy;

//     navigationServiceSpy = new NavigationServiceMock().navigationServiceSpy;

//     storageEncryptionServiceSpy = new StorageEncryptionServiceMock().storageEncryptionServiceSpy;

//     await TestBed.configureTestingModule({
//       declarations: [
//         MyBoardComponent,
//         SkeletonLoaderComponent,
//       ],
//       imports: [
//         BrowserAnimationsModule,
//         BrowserModule,
//         CommonModule,
//         AngularMaterialModule,
//         RouterTestingModule,
//         HttpClientModule,
//         HttpClientTestingModule,
//       ],
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
//           provide: NavigationService,
//           useValue: navigationServiceSpy,
//         },
//         {
//           provide: StorageEncryptionService,
//           useValue: storageEncryptionServiceSpy,
//         },
//         { provide: HomeService, useClass: MockHomeService },
//         EmployeeProfileService,
//         DatePipe,
//       ],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(MyBoardComponent);
//     empProfileService = TestBed.inject(EmployeeProfileService);

//     component = fixture.componentInstance;
//     component.myBoardData = homePageDetails.myBoardLabels;
//     component.siteSection = pageTitle;
//     component.learningsResponse = {
//       data: {
//         learningHoursCompleted: 0,
//         coursesCompleted: 0,
//         coursesEnrolled: 0,
//         leaveBalance: 20,
//       },
//     };

//     spyOn(component, 'ngOnInit').and.callThrough();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should ngOnInit', () => {
//     storageEncryptionServiceSpy.getvalue.and.returnValue(employeeId);

//     spyOn(component, 'getEmployeeRole');

//     component.ngOnInit();

//     expect(component.personalNavList).toEqual(personalisedNavigation.personalNavList);
//     expect(commonServiceSpy.getDateFormat).toHaveBeenCalledTimes(1);
//     expect(component.employeeId).toEqual(employeeId);
//     expect(component.getEmployeeRole).toHaveBeenCalledOnceWith(employeeId);
//     expect(storageEncryptionServiceSpy.getvalue).toHaveBeenCalledOnceWith(LOGGEDIN_EMP);
//   });

//   it('should ngOnDestroy', () => {
//     component.ngOnDestroy();

//     expect(component.subscription.closed).toBeTruthy();
//   });

//   it('should getLeaveBalance', fakeAsync(() => {
//     spyOn(component, 'getLeaveBalance');

//     component.checkTimeProfileEquality(employeeId);
//     tick();

//     expect(component.getLeaveBalance).toHaveBeenCalledWith(employeeId);
//   }));

//   it('should not getLeaveBalance', fakeAsync(() => {
//     commonServiceSpy.isTimeProfileEqualTP_F_M.and.returnValue(Promise.resolve(true));

//     spyOn(component, 'getLeaveBalance');

//     component.checkTimeProfileEquality(employeeId);
//     tick();

//     expect(component.getLeaveBalance).not.toHaveBeenCalled();
//   }));

//   it('should leave balance', () => {
//     const mockLeaveData = {
//       data: {
//         leaveTypes: [
//           { leaveCode: 'PL', leaveBalance: '10.50' },
//           { leaveCode: 'CL', leaveBalance: '8.00' },
//           { leaveCode: 'SL', leaveBalance: '5.00' },
//         ],
//       },
//     };

//     spyOn(empProfileService, 'getLeaveBalance').and.returnValue(
//       of(mockLeaveData),
//     );

//     component.getLeaveBalance(123);

//     expect(component.loadingLeaveBalance).toBe(false);
//     expect(component.leaveBalResponseError).toBe(false);
//     expect(component.leaveBalance.length).toBe(3);

//     expect(component.plLeaves).toBe('10.50');
//     expect(component.clLeaves).toBe('8.00');
//     expect(component.slLeaves).toBe('5.00');
//   });

//   it('should handle error while loading leave balance', () => {
//     spyOn(empProfileService, 'getLeaveBalance').and.returnValue(
//       throwError('Error'),
//     );

//     component.getLeaveBalance(123);

//     expect(component.loadingLeaveBalance).toBe(false);
//     expect(component.leaveBalResponseError).toBe(true);
//     expect(component.leaveBalance.length).toBe(0);
//   });

//   it('should fetch employee learning', fakeAsync(() => {
//     const mockLearningData = {};

//     spyOn(TestBed.inject(HomeService), 'getLearningData').and.returnValue(
//       of(mockLearningData),
//     );

//     component.getEmpLearningData();

//     tick();

//     expect(component.learningResponseError).toBeFalsy();
//     expect(component.learningsResponse).toEqual(mockLearningData);
//     expect(component.loadingLearningData).toBeFalsy();
//   }));

//   it('should open Disprz link when Disprz action is available', () => {
//     const disprzAction = {
//       appId: environment.DISPRZ_APP_ID,
//       linkPath: 'www.disprz.com',
//     };
//     component.personalNavList = { actionList: [disprzAction] };
//     const openSpy = spyOn(window, 'open').and.stub();
//     component.navigateTo('otherCard', 'cardTitle');
//     expect(openSpy).toHaveBeenCalledWith(disprzAction.linkPath, '_blank');
//   });

//   it('should open TCS ION link when Disprz action is not available but TCS ION action is available', () => {
//     const tcsIonAction = {
//       appId: environment.TCS_ION_APP_ID,
//       linkPath: 'www.tcsion.com',
//     };
//     component.personalNavList = { actionList: [tcsIonAction] };
//     const openSpy = spyOn(window, 'open').and.stub();
//     component.navigateTo('otherCard', 'cardTitle');
//     expect(openSpy).toHaveBeenCalledWith(tcsIonAction.linkPath, '_blank');
//   });

//   it('should not navigate when neither Disprz nor TCS ION action is available', () => {
//     const openSpy = spyOn(window, 'open').and.stub();
//     component.navigateTo('otherCard', 'cardTitle');
//     expect(openSpy).not.toHaveBeenCalled();
//   });

//   it('should set persona as pilot', fakeAsync(() => {
//     commonServiceSpy.getEmployeeRole.and.returnValue(Promise.resolve('Pilot'));

//     component.myBoardData = {
//       personaData: [
//         {
//           persona: 'pilot',
//           cards: [
//             {
//               id: 'PayHours',
//               title: 'Pay Hours',
//               unitColor: null,
//               subTitle: 'Flying',
//               cardcolor: '#3174E0',
//               icon: 'flight_takeoff',
//               gradient1Color: 'white',
//               gradient2Color: 'white',
//               gradient3Color: '#D1E3FF',
//               gradient4Color: '#106EFF',
//               infoText: 'For March 2024',
//               infoTextTooltip: 'This data is for start_date to end_date',
//               infoIcon: 'info',
//               zeroDataSubtitle: 'No hours yet',
//               zeroDataInfoText: 'Nothing yet',
//               dataUnit: 'Hours',
//               dataUnitMins: 'min',
//               dataUnitHrs: 'hr',
//               unitArray: [
//                 {
//                   key: 'Flying',
//                 },
//                 {
//                   key: 'SIM hours',
//                 },
//               ],
//             },
//             {
//               id: 'takeoffsLandings',
//               title: 'Take Offs / Landings',
//               unitColor: '#FF8C00',
//               subTitle: null,
//               cardcolor: '#FF8C00',
//               icon: 'flight',
//               gradient1Color: 'white',
//               gradient2Color: 'white',
//               gradient3Color: '#FFE0BA',
//               gradient4Color: '#FF8C00',
//               infoText: 'Past 90 days',
//               infoTextTooltip: 'This data is for start_date to end_date',
//               infoIcon: 'info',
//               zeroDataSubtitle: 'No Take Offs / Landings',
//               zeroDataInfoText: 'Nothing yet',
//               dataUnit: 'Total',
//               dataUnitMins: 'min',
//               dataUnitHrs: 'hr',
//               unitArray: [
//                 {
//                   key: 'Take offs',
//                 },
//                 {
//                   key: 'Landings',
//                 },
//               ],
//             },
//             {
//               id: 'SODHours',
//               title: 'SOD Hours',
//               unitColor: '#DA0E29',
//               subTitle: 'Completed',
//               cardcolor: '#DA0E29',
//               icon: 'work_history',
//               gradient1Color: 'white',
//               gradient2Color: 'white',
//               gradient3Color: '#FFC1C9',
//               gradient4Color: '#DA0E29',
//               infoText: 'For March 2024',
//               infoTextTooltip: 'This data is for start_date to end_date',
//               infoIcon: 'info',
//               zeroDataSubtitle: 'No SOD Hours',
//               zeroDataInfoText: 'Nothing yet',
//               dataUnit: 'Total',
//               dataUnitMins: 'min',
//               dataUnitHrs: 'hr',
//               unitArray: [
//                 {
//                   key: 'Intl',
//                 },
//                 {
//                   key: 'Dom',
//                 },
//               ],
//             },
//             {
//               id: 'leaveBalance',
//               title: 'Leave Balance',
//               unitColor: '#A71EA2',
//               subTitle: null,
//               cardcolor: '#A71EA2',
//               icon: 'calendar_today',
//               gradient1Color: 'white',
//               gradient2Color: 'white',
//               gradient3Color: '#FFCFFD',
//               gradient4Color: '#A71EA2',
//               infoText: 'As of today',
//               infoTextTooltip:
//                 'This data was last updated on current_timestamp',
//               infoIcon: 'info',
//               zeroDataSubtitle: 'No Leaves',
//               zeroDataInfoText: 'Nothing yet',
//               dataUnit: 'Days',
//               dataUnitMins: 'min',
//               dataUnitHrs: 'hr',
//               unitArray: [
//                 {
//                   key: 'PL',
//                 },
//                 {
//                   key: 'CL',
//                 },
//                 {
//                   key: 'SL',
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     };
//     component.getEmployeeRole(employeeId);
//     tick(2000);

//     expect(component.persona).toBe('Pilot');
//   }));

//   it('should set persona as cabin crew', fakeAsync(() => {
//     commonServiceSpy.getEmployeeRole.and.returnValue(Promise.resolve('Cabin Crew'));

//     component.myBoardData = {
//       personaData: [
//         {
//           persona: 'cabin crew',
//           cards: [
//             {
//               id: 'payHours',
//               title: 'Pay Hours',
//               unitColor: null,
//               subTitle: 'Flying',
//               cardcolor: '#3174E0',
//               icon: 'flight_takeoff',
//               gradient1Color: 'white',
//               gradient2Color: 'white',
//               gradient3Color: '#D1E3FF',
//               gradient4Color: '#106EFF',
//               infoText: 'For March 2024',
//               infoTextTooltip: 'This data is for start_date to end_date',
//               infoIcon: 'info',
//               zeroDataSubtitle: 'No hours yet',
//               zeroDataInfoText: 'Nothing yet',
//               dataUnit: 'Hours',
//               dataUnitMins: 'min',
//               dataUnitHrs: 'hr',
//               unitArray: [
//                 {
//                   key: 'CP',
//                 },
//                 {
//                   key: 'FO',
//                 },
//               ],
//             },
//             {
//               id: 'flightDutyPeriod',
//               title: 'Night Stops',
//               unitColor: null,
//               subTitle: 'Completed',
//               cardcolor: '#FF8C00',
//               icon: 'flight',
//               gradient1Color: 'white',
//               gradient2Color: 'white',
//               gradient3Color: '#FFE0BA',
//               gradient4Color: '#FF8C00',
//               infoText: 'For March 2024',
//               infoTextTooltip: 'This data is for start_date to end_date',
//               infoIcon: 'info',
//               zeroDataSubtitle: 'No Night Stops',
//               zeroDataInfoText: 'Nothing yet',
//               dataUnit: 'Hours',
//               dataUnitMins: 'min',
//               dataUnitHrs: 'hr',
//               unitArray: [
//                 {
//                   key: 'Take offs',
//                 },
//                 {
//                   key: 'Landings',
//                 },
//               ],
//             },
//             {
//               id: 'sodHours',
//               title: 'SOD Hours',
//               unitColor: '#DA0E29',
//               subTitle: 'Completed',
//               cardcolor: '#DA0E29',
//               icon: 'work_history',
//               gradient1Color: 'white',
//               gradient2Color: 'white',
//               gradient3Color: '#FFC1C9',
//               gradient4Color: '#DA0E29',
//               infoText: 'For March 2024',
//               infoTextTooltip: 'This data is for start_date to end_date',
//               infoIcon: 'info',
//               zeroDataSubtitle: 'No SOD Hours',
//               zeroDataInfoText: 'Nothing yet',
//               dataUnit: 'Total',
//               dataUnitMins: 'min',
//               dataUnitHrs: 'hr',
//               unitArray: [
//                 {
//                   key: 'Intl',
//                 },
//                 {
//                   key: 'Dom',
//                 },
//               ],
//             },
//             {
//               id: 'leaveBalance',
//               title: 'Leave Balance',
//               unitColor: '#A71EA2',
//               subTitle: null,
//               cardcolor: '#A71EA2',
//               icon: 'calendar_today',
//               gradient1Color: 'white',
//               gradient2Color: 'white',
//               gradient3Color: '#FFCFFD',
//               gradient4Color: '#A71EA2',
//               infoText: 'As of today',
//               infoTextTooltip:
//                 'This data was last updated on current_timestamp',
//               infoIcon: 'info',
//               zeroDataSubtitle: 'No Leaves',
//               zeroDataInfoText: 'Nothing yet',
//               dataUnit: 'Days',
//               dataUnitMins: 'min',
//               dataUnitHrs: 'hr',
//               unitArray: [
//                 {
//                   key: 'PL',
//                 },
//                 {
//                   key: 'CL',
//                 },
//                 {
//                   key: 'SL',
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     };
//     component.getEmployeeRole(employeeId);
//     tick(2000);

//     expect(component.persona).toBe('Cabin Crew');
//   }));

//   it('should leave balances', () => {
//     component.plLeaves = '10';
//     component.clLeaves = '5';
//     component.slLeaves = '15';
//     expect(component.leaveBalanceSum()).toEqual('30.00');
//   });

//   it('should handle correct sum', () => {
//     component.plLeaves = '2.5';
//     component.clLeaves = '2.5';
//     component.slLeaves = '5';
//     expect(component.leaveBalanceSum()).toEqual('10.00');
//   });

//   it('should handle negative balances', () => {
//     component.plLeaves = '-5';
//     component.clLeaves = '10';
//     component.slLeaves = '5';
//     expect(component.leaveBalanceSum()).toEqual('10.00');
//   });

//   it('should return leave balances are zero', () => {
//     component.plLeaves = '0';
//     component.clLeaves = '0';
//     component.slLeaves = '0';
//     expect(component.leaveBalanceSum()).toEqual('0.00');
//   });

//   it('should return card data', () => {
//     component.learningsResponse = { data: { 1: 100 } };
//     const card = { id: '1' };
//     expect(component.getCardData(card)).toEqual(100);
//   });

//   it('should return leave balance id is "leaveBalance"', () => {
//     component.plLeaves = 10;
//     component.clLeaves = 20;
//     component.slLeaves = 30;
//     const card = { id: 'leaveBalance' };
//     expect(component.getCardData(card)).toEqual('60.00');
//   });

//   it('should return 0 if cardData is undefined', () => {
//     component.learningsResponse = { data: {} };
//     const card = { id: '1' };
//     expect(component.getCardData(card)).toEqual(0);
//   });

//   it('should return 0 if cardData is NaN', () => {
//     component.learningsResponse = { data: { 1: NaN } };
//     const card = { id: '1' };
//     expect(component.getCardData(card)).toEqual(0);
//   });

//   it('should return leave balance if cardData is NaN and leaveBalanceSum is valid', () => {
//     component.plLeaves = 10;
//     component.clLeaves = 20;
//     component.slLeaves = 30;
//     component.learningsResponse = { data: { 1: NaN } };
//     const card = { id: '1' };
//     expect(component.getCardData(card)).toEqual('60.00');
//   });

//   it('should return leave balance if cardData is undefined and leaveBalanceSum is valid', () => {
//     component.plLeaves = 10;
//     component.clLeaves = 20;
//     component.slLeaves = 30;
//     const card = { id: '1' };
//     expect(component.getCardData(card)).toEqual('60.00');
//   });

//   it('should return if card data is less than 60', () => {
//     component.learningsResponse = { data: { 1: 30 } };
//     const card = { id: '1', dataUnitMins: 'minutes' };
//     const result = component.getLearningCardData(card);
//     expect(result).toEqual({ value: '30', unit: 'minutes' });
//   });

//   it('should return if card data is between 60 and 6000', () => {
//     component.learningsResponse = { data: { 1: 120 } };
//     const card = { id: '1', dataUnitHrs: 'hours', dataUnitMins: 'minutes' };
//     const result = component.getLearningCardData(card);
//     expect(result).toEqual({
//       value: '2',
//       unit: 'hours',
//       minObj: { value: '0', unit: 'minutes' },
//     });
//   });

//   it('should return if data greater than or equal to 6000', () => {
//     component.learningsResponse = { data: { 1: 7000 } };
//     const card = { id: '1', dataUnit: 'default' };
//     const result = component.getLearningCardData(card);
//     expect(result).toEqual({ value: '7000', unit: 'default' });
//   });

//   it('should return subtitle', () => {
//     spyOn(component, 'getCardSubText').and.callThrough();
//     component.learningsResponse = { data: { 1: 50 } };

//     const card = {
//       id: '1',
//       subTitle: 'Sub Title',
//       zeroDataSubtitle: 'Zero Data Subtitle',
//     };
//     const result = component.getCardSubText(card);

//     expect(component.getCardSubText).toHaveBeenCalledWith(card);
//     expect(result).toBe('Sub Title');
//   });

//   it('should return zero when data is 0', () => {
//     spyOn(component, 'getCardSubText').and.callThrough();

//     component.learningsResponse = { data: { 1: 0 } };

//     const card = {
//       id: '1',
//       subTitle: 'Sub Title',
//       zeroDataSubtitle: 'Zero Data Subtitle',
//     };
//     const result = component.getCardSubText(card);

//     expect(component.getCardSubText).toHaveBeenCalledWith(card);
//     expect(result).toBe('Zero Data Subtitle');
//   });

//   it('should return zero when data is undefined', () => {
//     spyOn(component, 'getCardSubText').and.callThrough();

//     component.learningsResponse = { data: { 1: undefined } };

//     const card = {
//       id: '1',
//       subTitle: 'Sub Title',
//       zeroDataSubtitle: 'Zero Data Subtitle',
//     };
//     const result = component.getCardSubText(card);

//     expect(component.getCardSubText).toHaveBeenCalledWith(card);
//     expect(result).toBe('Zero Data Subtitle');
//   });

//   it('should return zero when data is null', () => {
//     spyOn(component, 'getCardSubText').and.callThrough();

//     component.learningsResponse = { data: null };

//     const card = {
//       id: '1',
//       subTitle: 'Sub Title',
//       zeroDataSubtitle: 'Zero Data Subtitle',
//     };
//     const result = component.getCardSubText(card);

//     expect(component.getCardSubText).toHaveBeenCalledWith(card);
//     expect(result).toBe('Zero Data Subtitle');
//   });
// });
