// import { DatePipe } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import {
//   ComponentFixture,
//   // fakeAsync,
//   TestBed,
//   fakeAsync,
//   tick,
// } from '@angular/core/testing';
// import { ReactiveFormsModule } from '@angular/forms';
// import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { BrowserTestingModule } from '@angular/platform-browser/testing';
// import { Router } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
// import {
//   MSAL_GUARD_CONFIG,
//   MsalBroadcastService,
//   MsalGuardConfiguration,
//   MsalService,
// } from '@azure/msal-angular';
// import { InteractionType, PopupRequest } from '@azure/msal-browser';
// import { of } from 'rxjs';
// import { AngularMaterialModule } from 'src/app/angular-material.module';
// import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';
// import { SkeletonLoaderComponent } from 'src/app/shared/components/skeleton-loader/skeleton-loader.component';
// import { DateWithoutYearPipe } from 'src/app/shared/pipes/date-without-year.pipe';
// import { CommonServiceMock } from 'src/app/shared/services/__mock__/common.service.mock';
// import { CommonService } from 'src/app/shared/services/common.service';
// import { RosterService } from 'src/app/shared/services/roster-http.service';
// import { StorageEncryptionService } from 'src/app/shared/services/storage-encryption.service';
// import { homePageDetails, pageTitle } from '../constant';
// import { HomeService } from '../home.service';
// import { UpcomingAlertModalComponent } from '../upcoming-alert-modal/upcoming-alert-modal.component';
// import { UpcomingAlertsComponent } from './upcoming-alerts.component';

// describe('UpcomingAlertsComponent', () => {
//   let component: UpcomingAlertsComponent;
//   let fixture: ComponentFixture<UpcomingAlertsComponent>;
//   let authServiceStub: jasmine.SpyObj<MsalService>;
//   let msalBroadcastService: jasmine.SpyObj<MsalBroadcastService>;
//   let mockDialog: jasmine.SpyObj<MatDialog>;
//   let mockRouter: jasmine.SpyObj<Router>;
//   let router: Router;

//   let homeServiceSpyObj: jasmine.SpyObj<HomeService>;
//   let commonServiceSpy: jasmine.SpyObj<CommonService>;

//   beforeEach(async () => {
//     const rosterInfo = [
//       {
//         flightNumber: '123',
//         depDate: '2024-03-20',
//         src: 'ABC',
//         depTime: '10:00',
//         destination: 'XYZ',
//         arrTime: '12:00',
//       },
//     ];
//     const rosterServiceSpyObj = jasmine.createSpyObj('RosterService', [
//       'getUpcomingRosterInfor',
//     ]);
//     homeServiceSpyObj = jasmine.createSpyObj('HomeService', [
//       'getDocExpInfo',
//       'getUpcomingAlertDataFromAEM',
//       'getUpcomingHolidayData',
//       'getUpcomingTeamBirthdayData',
//       'getUpcomingLearningData',
//     ]);

//     commonServiceSpy = new CommonServiceMock().commonServiceSpy;

//     commonServiceSpy.getEmpDataStatus.and.returnValue(of(true));

//     commonServiceSpy.getEmployeeRole.and.returnValue(Promise.resolve('Pilot'));

//     commonServiceSpy.getDateFormat.and.returnValue(of('mockDateFormat'));

//     rosterServiceSpyObj.getUpcomingRosterInfor.and.returnValue(of(rosterInfo));
//     // rosterServiceSpyObj.upcomingRosterInfor = new Subject<any>();
//     // rosterServiceSpyObj.upcomingRosterInfor.next(rosterInfo);
//     const storageEncryptionServiceSpyObj = jasmine.createSpyObj(
//       'StorageEncryptionService',
//       ['getDecryptedValueFromSession', 'getvalue', 'getEmpId'],
//     );
//     storageEncryptionServiceSpyObj.getDecryptedValueFromSession.and.returnValue(
//       Promise.resolve('80054747'),
//     );
//     // Mock the return value of getEmpId
//     storageEncryptionServiceSpyObj.getEmpId.and.returnValue('80054747');

//     storageEncryptionServiceSpyObj.getvalue.and.returnValue('80054747');
//     homeServiceSpyObj.getDocExpInfo.and.returnValue(
//       of([
//         { documentType: 'aep', expiry_days: '51', issueCountryCode: 'IN' },
//         {
//           documentType: 'passport',
//           expiry_days: '-11',
//           issueCountryCode: 'IN',
//         },
//       ]),
//     );

//     mockDialog = jasmine.createSpyObj('MatDialog', ['open', 'closeAll']);
//     mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);
//     authServiceStub = jasmine.createSpyObj('MsalService', [
//       'loginPopup',
//       'loginRedirect',
//       'instance',
//     ]);

//     msalBroadcastService = jasmine.createSpyObj('MsalBroadcastService', [
//       'inProgress$',
//       'msalInstance',
//     ]);

//     const msalGuardConfigStub: MsalGuardConfiguration = {
//       authRequest: {} as PopupRequest,
//       interactionType: InteractionType.Popup,
//     };

//     await TestBed.configureTestingModule({
//       declarations: [
//         UpcomingAlertsComponent,
//         LoaderComponent,
//         SkeletonLoaderComponent,
//       ],
//       imports: [
//         MatDialogModule,
//         ReactiveFormsModule,
//         HttpClientModule,
//         HttpClientTestingModule,
//         BrowserTestingModule,
//         BrowserModule,
//         AngularMaterialModule,
//         BrowserAnimationsModule,
//         RouterTestingModule,
//       ],
//       providers: [
//         { provide: MsalService, useValue: authServiceStub },
//         { provide: MsalBroadcastService, useValue: msalBroadcastService },
//         { provide: MSAL_GUARD_CONFIG, useValue: msalGuardConfigStub },
//         { provide: MatDialog, useValue: mockDialog },
//         { provide: Router, useValue: mockRouter },
//         {
//           provide: StorageEncryptionService,
//           useValue: storageEncryptionServiceSpyObj,
//         },
//         { provide: RosterService, useValue: rosterServiceSpyObj },
//         { provide: HomeService, useValue: homeServiceSpyObj },
//         { provide: CommonService, useValue: commonServiceSpy },
//         DatePipe,
//         DateWithoutYearPipe,
//       ],
//     }).compileComponents();

//     fixture = TestBed.createComponent(UpcomingAlertsComponent);

//     component = fixture.componentInstance;
//     component.siteSection = pageTitle;
//     component.upcomingLabels = homePageDetails.upComingLabels;

//     router = TestBed.inject(Router);
//     mockDialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;

//     homeServiceSpyObj = TestBed.inject(
//       HomeService,
//     ) as jasmine.SpyObj<HomeService>;
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should close all open dialogs and open the alert modal', () => {
//     const expectedData = {
//       pilotCrewAlertInfo: component.pilotCrewAlertInfo,
//       userPersona: component.userPersona,
//       employeeAlertInfo: component.alertList,
//       upcomingLabels: component.upcomingLabels,
//     };

//     component.viewAlertModal();

//     expect(mockDialog.closeAll).toHaveBeenCalled();
//     expect(mockDialog.open).toHaveBeenCalledWith(UpcomingAlertModalComponent, {
//       panelClass: 'upcoming-modal',
//       autoFocus: false,
//       data: expectedData,
//     });
//   });

//   it('should navigate to external link if isExternal is true and link starts with "http://"', () => {
//     const data = {
//       isExternal: true,
//       externalLink: 'http://example.com',
//     };

//     spyOn(window, 'open');

//     component.navigateToURL(data);

//     expect(window.open).toHaveBeenCalledWith(data.externalLink, '_blank');
//     expect(mockDialog.closeAll).not.toHaveBeenCalled();
//     expect(router.navigateByUrl).not.toHaveBeenCalled();
//   });

//   it('should navigate to external link if isExternal is true and link starts with "https://"', () => {
//     const data = {
//       isExternal: true,
//       externalLink: 'https://example.com',
//     };

//     spyOn(window, 'open');

//     component.navigateToURL(data);

//     expect(window.open).toHaveBeenCalledWith(data.externalLink, '_blank');
//     expect(mockDialog.closeAll).not.toHaveBeenCalled();
//     expect(router.navigateByUrl).not.toHaveBeenCalled();
//   });

//   it('should navigate internally if isExternal is true and link is internal', () => {
//     const data = {
//       isExternal: true,
//       externalLink: '/internal-link',
//     };

//     spyOn(window, 'open');

//     component.navigateToURL(data);

//     expect(window.open).not.toHaveBeenCalled();
//     expect(mockDialog.closeAll).toHaveBeenCalledTimes(0);
//     expect(router.navigateByUrl).toHaveBeenCalledWith(data.externalLink);
//   });

//   it('should not navigate if isExternal is false', () => {
//     const data = {
//       isExternal: false,
//       externalLink: '/internal-link',
//     };

//     spyOn(window, 'open');

//     component.navigateToURL(data);

//     expect(window.open).not.toHaveBeenCalled();
//     expect(mockDialog.closeAll).not.toHaveBeenCalled();
//     expect(router.navigateByUrl).not.toHaveBeenCalled();
//   });

//   it('should not navigate if isExternal is undefined', () => {
//     const data = {
//       externalLink: '/internal-link',
//     };

//     spyOn(window, 'open');

//     component.navigateToURL(data);

//     expect(window.open).not.toHaveBeenCalled();
//     expect(mockDialog.closeAll).not.toHaveBeenCalled();
//     expect(router.navigateByUrl).not.toHaveBeenCalled();
//   });

//   it('should fetch user persona and call function for Pilot', async () => {
//     spyOn(component, 'fetchRosterInformation');
//     spyOn(component, 'updateCrewNoDataScenarion');

//     await component.getUserPersona();

//     expect(component.userPersona).toEqual('Pilot');
//     expect(component.fetchRosterInformation).toHaveBeenCalled();
//     expect(component.updateCrewNoDataScenarion).toHaveBeenCalled();
//   });

//   it('should fetch roster information', fakeAsync(() => {
//     component.ngOnInit();
//     tick(2000);
//     expect(component.alertList.length).toBe(3);
//   }));

//   it('should update no data', () => {
//     component.updateCrewNoDataScenarion();

//     expect(component.upcomingLabels.noDataTitle).toBe(
//       homePageDetails.upComingLabels.crewList.noDataTitle,
//     );
//   });

//   it('should return true if current date is between start and end dates', () => {
//     const startDate = '2024-05-01';
//     const endDate = '2024-05-31';
//     jasmine.clock().mockDate(new Date(2024, 4, 6));
//     expect(component.isBetweenDates(startDate, endDate)).toBeTruthy();
//   });

//   it('should return the full document name if it exists in upcomingLabels', () => {
//     component.upcomingLabels = {
//       docNames: {
//         1: 'Document One',
//         2: 'Document Two',
//       },
//     };
//     expect(component.getFullDocName('1')).toEqual('Document One');
//     expect(component.getFullDocName('2')).toEqual('Document Two');
//   });

//   it('should sort alertList by criticality, date, and category', () => {
//     component.alertList = [
//       { criticality: 'High', date: '2024-05-10', type: 'goal-setting' },
//       { criticality: 'Medium', date: '2024-05-11', type: 'tax-document' },
//       { criticality: 'High', date: '2024-05-12', type: 'events' },
//       { criticality: 'Low', date: '2024-05-11', type: 'events' },
//     ];

//     component.sortData();

//     const expectedOrder = [
//       { criticality: 'High', date: '2024-05-10', type: 'goal-setting' },
//       { criticality: 'High', date: '2024-05-12', type: 'events' },
//       { criticality: 'Medium', date: '2024-05-11', type: 'tax-document' },
//       { criticality: 'Low', date: '2024-05-11', type: 'events' },
//     ];

//     expect(component.alertList).toEqual(expectedOrder);
//   });

//   it('should set viewMoreToggle to true if alertList length is greater than 2', () => {
//     component.alertList = [{}, {}, {}];
//     component.sortData();
//     expect(component.viewMoreToggle).toBeTruthy();
//   });

//   it('should set viewMoreToggle to false if alertList length is less than or equal to 2', () => {
//     component.alertList = [{}, {}];
//     component.sortData();
//     expect(component.viewMoreToggle).toBeFalsy();
//   });

//   it('should sort alertList by category if criticality and date are equal', () => {
//     component.alertList = [
//       { criticality: 'High', date: '2024-05-10', type: 'learning-calendar' },
//       { criticality: 'High', date: '2024-05-10', type: 'events' },
//       { criticality: 'High', date: '2024-05-10', type: 'team-birthdays' },
//     ];

//     component.sortData();

//     const expectedOrder = [
//       { criticality: 'High', date: '2024-05-10', type: 'events' },
//       { criticality: 'High', date: '2024-05-10', type: 'learning-calendar' },
//       { criticality: 'High', date: '2024-05-10', type: 'team-birthdays' },
//     ];

//     expect(component.alertList).toEqual(expectedOrder);
//   });

//   // sort order
//   it('should fetch employee alert information', fakeAsync(() => {
//     const aemData = {
//       data: {
//         goalSettingList: {
//           items: [
//             {
//               cutOffDate: '2024-03-25',
//               date: '2024-03-22',
//               summaryAlert: 'Due: 22 March 2024',
//             },
//           ],
//         },
//         taxDocumentsList: {
//           items: [
//             {
//               date: '2024-04-01',
//               summaryAlert: 'Due: 01 April 2024',
//             },
//           ],
//         },
//         eventsList: {
//           items: [
//             {
//               date: '2024-03-20',
//             },
//           ],
//         },
//       },
//     };
//     const holidayData = {
//       status: { code: 200 },
//       data: {
//         upcomingHolidayLeavesCalendarView: [
//           {
//             title: 'Holiday',
//             start: '2024-04-01',
//             extendedProps: {
//               holidayLeaveName: 'Easter',
//             },
//           },
//         ],
//       },
//     };
//     const teamData = {
//       status: { code: 200 },
//       data: {
//         teamList: [
//           {
//             firstName: 'John',
//             middleName: 'Doe',
//             lastName: 'Smith',
//             dob: '1990-03-22',
//             jobTitle: 'Developer',
//           },
//         ],
//       },
//     };
//     const learningData = {
//       data: {},
//       status: { code: 200 },
//     };

//     // Set up spies for service methods

//     // Set up spies for service methods
//     homeServiceSpyObj.getUpcomingAlertDataFromAEM.and.returnValue(of(aemData));
//     homeServiceSpyObj.getUpcomingHolidayData.and.returnValue(of(holidayData));
//     homeServiceSpyObj.getUpcomingTeamBirthdayData.and.returnValue(of(teamData));
//     homeServiceSpyObj.getUpcomingLearningData.and.returnValue(of(learningData));

//     // Set up spies for common service methods
//     commonServiceSpy.getLocale.and.returnValue('en-US');

//     commonServiceSpy.isLoggedInEmpFromIndia.and.returnValue(true);

//     // Call the method to test
//     component.fetchEmployeeAlertInformation();
//     tick(10000);

//     // Expectations
//     expect(component.isDataLoaded).toBeTruthy();
//   }));
//   //
// });
