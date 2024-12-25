// import { TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { HttpService } from 'src/app/shared/services/http.service';
// import { environment } from 'src/environments/environment';
// import {
//   GET_LEARNING_DATA,
//   GET_WORKPLACE_DATA,
//   EMP_LEAVE,
//   GET_HOLIDAY_CALENDARS_DATA,
//   AEM_SERVLET_PATH,
//   GET_QUICK_ACTION_SERVLET,
//   GET_BASE_MANAGER_LIST,
//   fields,
// } from 'src/app/app.api';
// import { of } from 'rxjs';
// import { HomeService } from './home.service';
// import { StorageEncryptionService } from '../../shared/services/storage-encryption.service';

// describe('HomeService', () => {
//   let service: HomeService;
//   let httpMock: HttpTestingController;
//   let httpServiceSpy: jasmine.SpyObj<HttpService>;
//   let storageEncryptionServiceSpy: jasmine.SpyObj<StorageEncryptionService>;

//   beforeEach(() => {
//     httpServiceSpy = jasmine.createSpyObj('HttpService', ['get', 'createURLendpoint']);
//     storageEncryptionServiceSpy = jasmine.createSpyObj('StorageEncryptionService', ['getDecryptedValueFromSession']);

//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [
//         HomeService,
//         { provide: HttpService, useValue: httpServiceSpy },
//         { provide: StorageEncryptionService, useValue: storageEncryptionServiceSpy },
//       ],
//     });

//     service = TestBed.inject(HomeService);
//     httpMock = TestBed.inject(HttpTestingController);
//   });

//   afterEach(() => {
//     httpMock.verify();
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   it('getWorkplace should call the correct endpoint', () => {
//     const groupId = '123';
//     const limit = 5;
//     const expectedEndpoint = `${GET_WORKPLACE_DATA}/${groupId}/feed?fields=${fields}&limit=${limit}`;
//     httpServiceSpy.get.and.returnValue(of({}));

//     service.getWorkplace(groupId, limit).subscribe();

//     expect(httpServiceSpy.get).toHaveBeenCalledOnceWith(
//       environment.WORK_PLACE_URL,
//       expectedEndpoint,
//     );
//   });

//   it('getLearningData should call the correct endpoint', () => {
//     httpServiceSpy.get.and.returnValue(of({}));
//     service.getLearningData().subscribe();

//     expect(httpServiceSpy.get).toHaveBeenCalledOnceWith(
//       environment.LEARNING_URL,
//       GET_LEARNING_DATA,
//     );
//   });

//   it('getLeaveBalance should call the correct endpoint', () => {
//     const endpoint = 'leave/';
//     const stuffId = '001';
//     const expectedEndpoint = `${endpoint}${stuffId}`;
//     httpServiceSpy.get.and.returnValue(of({}));

//     service.getLeaveBalance(endpoint, stuffId).subscribe();

//     expect(httpServiceSpy.get).toHaveBeenCalledOnceWith(
//       environment.FLYING_CREW_BASE_URL,
//       expectedEndpoint,
//     );
//   });

//   it('getBlockHours should call the correct endpoint', () => {
//     const endpoint = 'blockhours/';
//     const stuffId = '001';
//     const expectedEndpoint = `${endpoint}${stuffId}`;
//     httpServiceSpy.get.and.returnValue(of({}));

//     service.getBlockHours(endpoint, stuffId).subscribe();

//     expect(httpServiceSpy.get).toHaveBeenCalledOnceWith(
//       environment.FLYING_CREW_BASE_URL,
//       expectedEndpoint,
//     );
//   });

//   it('getTakeOffsLanding should call the correct endpoint', () => {
//     const endpoint = 'takeoffs/';
//     const stuffId = '001';
//     const expectedEndpoint = `${endpoint}${stuffId}`;
//     httpServiceSpy.get.and.returnValue(of({}));

//     service.getTakeOffsLanding(endpoint, stuffId).subscribe();

//     expect(httpServiceSpy.get).toHaveBeenCalledOnceWith(
//       environment.FLYING_CREW_BASE_URL,
//       expectedEndpoint,
//     );
//   });

//   it('getUpcomingHolidayData should call the correct endpoint', () => {
//     const employeeId = '001';
//     const calendarCode = 'calendar123';
//     const startDate = '2023-08-01';
//     const duration = 30;
//     const expectedEndpoint = `${EMP_LEAVE}/${employeeId}${GET_HOLIDAY_CALENDARS_DATA}?holidayCalendarCode=${calendarCode}&calenderHolidayStartDate=${startDate}&durationDays=${duration}`;
//     httpServiceSpy.get.and.returnValue(of({}));

//     service.getUpcomingHolidayData(employeeId, calendarCode, startDate, duration).subscribe();

//     expect(httpServiceSpy.get).toHaveBeenCalledOnceWith(
//       environment.EMP_LEAVE_BASE_URL,
//       expectedEndpoint,
//     );
//   });

//   it('getQuickActionsDataFromAEM should call the correct endpoint', () => {
//     const endPath = 'somePath';
//     const expectedEndpoint = `${AEM_SERVLET_PATH}${GET_QUICK_ACTION_SERVLET}`;
//     httpServiceSpy.createURLendpoint.and.returnValue(expectedEndpoint);
//     httpServiceSpy.get.and.returnValue(of({}));

//     service.getQuickActionsDataFromAEM(endPath).subscribe();

//     expect(httpServiceSpy.get).toHaveBeenCalledOnceWith(
//       environment.AEM_BASE_URL,
//       expectedEndpoint,
//     );
//   });

//   it('getBaseManagerList should call the correct endpoint', () => {
//     httpServiceSpy.get.and.returnValue(of({}));
//     service.getBaseManagerList().subscribe();

//     expect(httpServiceSpy.get).toHaveBeenCalledOnceWith(
//       environment.EMP_PROFILE_BASE_URL,
//       GET_BASE_MANAGER_LIST,
//     );
//   });
// });
