import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http.service';
import { StorageEncryptionService } from 'src/app/shared/services/storage-encryption.service';
import { RequestedLeaveService } from './requested-leave.service';

describe('RequestedLeaveService', () => {
  let service: RequestedLeaveService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;
  let storageEncryptionServiceSpy: jasmine.SpyObj<StorageEncryptionService>;

  const mockEmployeeId = 'mockEmployeeId';

  beforeEach(() => {
    const httpClientSpyObj = jasmine.createSpyObj('HttpClient', [
      'post',
      'get',
      'delete',
      'put',
    ]);
    const httpServiceSpyObj = jasmine.createSpyObj('HttpService', [
      'get',
      'post',
      'delete',
      'put',
    ]);
    const storageEncryptionServiceSpyObj = jasmine.createSpyObj(
      'StorageEncryptionService',
      ['getvalue'],
    );

    TestBed.configureTestingModule({
      providers: [
        RequestedLeaveService,
        { provide: HttpClient, useValue: httpClientSpyObj },
        { provide: HttpService, useValue: httpServiceSpyObj },
        {
          provide: StorageEncryptionService,
          useValue: storageEncryptionServiceSpyObj,
        },
      ],
    });

    service = TestBed.inject(RequestedLeaveService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    httpServiceSpy = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
    storageEncryptionServiceSpy = TestBed.inject(
      StorageEncryptionService,
    ) as jasmine.SpyObj<StorageEncryptionService>;

    storageEncryptionServiceSpy.getvalue.and.returnValue(mockEmployeeId);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getLeaveDataWithId', () => {
    it('should return leave data with leave Id', (done) => {
      const mockResponse = { data: 'leaveData' };
      const leaveId = '12345';
      httpServiceSpy.get.and.returnValue(of(mockResponse));

      service.getLeaveDataWithId(leaveId).subscribe((data) => {
        expect(data).toEqual(mockResponse);
        done();
      });
    });

    it('should handle error when fetching leave data with leave Id', (done) => {
      const mockError = new Error('Error fetching data');
      const leaveId = '12345';
      httpServiceSpy.get.and.returnValue(throwError(mockError));

      service.getLeaveDataWithId(leaveId).subscribe({
        error: (error) => {
          expect(error).toBe(mockError);
          done();
        },
      });
    });
  });

  describe('getRequestLeaveData', () => {
    it('should return requested leave data', (done) => {
      const mockResponse = { data: 'requestedLeaveData' };
      const id = '12345';
      httpServiceSpy.get.and.returnValue(of(mockResponse));

      service.getRequestLeaveData(id).subscribe((data) => {
        expect(data).toEqual(mockResponse);
        done();
      });
    });

    it('should handle error when fetching requested leave data', (done) => {
      const mockError = new Error('Error fetching data');
      const id = '12345';
      httpServiceSpy.get.and.returnValue(throwError(mockError));

      service.getRequestLeaveData(id).subscribe({
        error: (error) => {
          expect(error).toBe(mockError);
          done();
        },
      });
    });
  });

  describe('cancelLeaveRequestApi', () => {
    it('should cancel leave request', (done) => {
      const mockResponse = { data: 'cancelLeaveRequest' };
      const empId = '123';
      const leaveId = '456';
      httpServiceSpy.post.and.returnValue(of(mockResponse));

      service.cancelLeaveRequestApi(empId, leaveId).subscribe((data) => {
        expect(data).toEqual(mockResponse);

        done();
      });
    });

    it('should handle error when cancelling leave request', (done) => {
      const mockError = new Error('Error cancelling leave request');
      const empId = '123';
      const leaveId = '456';

      httpServiceSpy.post.and.returnValue(throwError(mockError));

      service.cancelLeaveRequestApi(empId, leaveId).subscribe({
        error: (error) => {
          expect(error).toBe(mockError);
          done();
        },
      });
    });
  });

  describe('deleteLeaveRequestApi', () => {
    it('should delete leave request', (done) => {
      const mockResponse = { data: 'deleteLeaveRequest' };
      const leaveId = '456';

      httpServiceSpy.delete.and.returnValue(of(mockResponse));

      service.deleteLeaveRequestApi(leaveId).subscribe((data) => {
        expect(data).toEqual(mockResponse);
        done();
      });
    });

    it('should handle error when deleting leave request', (done) => {
      const mockError = new Error('Error deleting leave request');
      const leaveId = '456';

      httpServiceSpy.delete.and.returnValue(throwError(mockError));

      service.deleteLeaveRequestApi(leaveId).subscribe({
        error: (error) => {
          expect(error).toBe(mockError);
          done();
        },
      });
    });
  });

  describe('updateLeaveRequestApi', () => {
    it('should update leave request', (done) => {
      const mockResponse = { data: 'updateLeaveRequest' };
      const payload = {
        leaveType: 'sick',
        startDate: '2023-01-01',
        endDate: '2023-01-05',
      };

      httpServiceSpy.put.and.returnValue(of(mockResponse));

      service.updateLeaveRequestApi(payload).subscribe((response) => {
        expect(response).toEqual(mockResponse);
        done();
      });
    });

    it('should handle error when updating leave request', (done) => {
      const mockError = new Error('Error updating leave request');
      const payload = {
        leaveType: 'sick',
        startDate: '2023-01-01',
        endDate: '2023-01-05',
      };

      httpServiceSpy.put.and.returnValue(throwError(mockError));

      service.updateLeaveRequestApi(payload).subscribe({
        error: (error) => {
          expect(error).toBe(mockError);
          done();
        },
      });
    });
  });

  describe('uploadAttachmentWithApi', () => {
    it('should upload attachment', (done) => {
      const mockResponse = { data: 'uploadedAttachmentData' };
      const file = new File([''], 'filename');
      httpClientSpy.post.and.returnValue(of(mockResponse));

      service.uploadAttachmentWithApi(file).subscribe((response) => {
        expect(response).toEqual(mockResponse);
        done();
      });
    });

    it('should handle error when uploading attachment', (done) => {
      const mockError = new Error('Error uploading attachment');
      const file = new File([''], 'filename');

      httpClientSpy.post.and.returnValue(throwError(mockError));

      service.uploadAttachmentWithApi(file).subscribe({
        error: (error) => {
          expect(error).toBe(mockError);
          done();
        },
      });
    });
  });
});
