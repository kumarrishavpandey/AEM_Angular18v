import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { StorageEncryptionService } from 'src/app/shared/services/storage-encryption.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  let service: DashboardService;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;
  let storageEncryptionServiceSpy: jasmine.SpyObj<StorageEncryptionService>;

  const mockEmployeeId = 'mockEmployeeId';

  beforeEach(() => {
    const httpSpy = jasmine.createSpyObj('HttpService', ['get']);
    const storageSpy = jasmine.createSpyObj('StorageEncryptionService', [
      'getvalue',
    ]);

    TestBed.configureTestingModule({
      providers: [
        DashboardService,
        { provide: HttpService, useValue: httpSpy },
        { provide: StorageEncryptionService, useValue: storageSpy },
      ],
    });

    service = TestBed.inject(DashboardService);
    httpServiceSpy = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
    storageEncryptionServiceSpy = TestBed.inject(
      StorageEncryptionService,
    ) as jasmine.SpyObj<StorageEncryptionService>;

    storageEncryptionServiceSpy.getvalue.and.returnValue(mockEmployeeId);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getEmployeeDashboardLeaveBalance', () => {
    it('should return employee leave balance data on success', (done) => {
      const mockResponse = { data: 'leaveBalanceData' };

      httpServiceSpy.get.and.returnValue(of(mockResponse));

      service.getEmployeeDashboardLeaveBalance().subscribe((data) => {
        expect(data).toEqual(mockResponse);
        done();
      });
    });

    it('should handle error when fetching employee leave balance data', (done) => {
      const mockError = new Error('Error fetching data');

      httpServiceSpy.get.and.returnValue(throwError(mockError));

      service.getEmployeeDashboardLeaveBalance().subscribe({
        error: (error) => {
          expect(error).toBe(mockError);
          done();
        },
      });
    });
  });

  describe('getHolidayCalendars', () => {
    it('should return holiday calendars data on success', (done) => {
      const mockResponse = { data: 'holidayCalendarsData' };

      httpServiceSpy.get.and.returnValue(of(mockResponse));

      service.getHolidayCalendars().subscribe((data) => {
        expect(data).toEqual(mockResponse);
        done();
      });
    });

    it('should handle error when fetching holiday calendars data', (done) => {
      const mockError = new Error('Error fetching data');

      httpServiceSpy.get.and.returnValue(throwError(mockError));

      service.getHolidayCalendars().subscribe({
        error: (error) => {
          expect(error).toBe(mockError);
          done();
        },
      });
    });
  });

  describe('getEmployeeDashboardLeaveList', () => {
    it('should return employee leave list data on success', (done) => {
      const mockResponse = { data: 'leaveListData' };
      const calendarCode = 'testCalendarCode';

      httpServiceSpy.get.and.returnValue(of(mockResponse));

      service.getEmployeeDashboardLeaveList(calendarCode).subscribe((data) => {
        expect(data).toEqual(mockResponse);
        done();
      });
    });

    it('should handle error when fetching employee leave list data', (done) => {
      const mockError = new Error('Error fetching data');
      const calendarCode = 'testCalendarCode';

      httpServiceSpy.get.and.returnValue(throwError(mockError));

      service.getEmployeeDashboardLeaveList(calendarCode).subscribe({
        error: (error) => {
          expect(error).toBe(mockError);
          done();
        },
      });
    });
  });
});
