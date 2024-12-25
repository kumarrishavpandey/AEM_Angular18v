import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http.service';
import { StorageEncryptionService } from 'src/app/shared/services/storage-encryption.service';
import { NewRequestService } from './new-request.service';

describe('NewRequestService', () => {
  let service: NewRequestService;
  // let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;
  let storageEncryptionServiceSpy: jasmine.SpyObj<StorageEncryptionService>;

  const mockEmployeeId = 'mockEmployeeId';

  beforeEach(() => {
    const httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['post']);
    const httpServiceSpyObj = jasmine.createSpyObj('HttpService', [
      'get',
      'post',
    ]);
    const storageEncryptionServiceSpyObj = jasmine.createSpyObj(
      'StorageEncryptionService',
      ['getvalue'],
    );

    TestBed.configureTestingModule({
      providers: [
        NewRequestService,
        { provide: HttpClient, useValue: httpClientSpyObj },
        { provide: HttpService, useValue: httpServiceSpyObj },
        {
          provide: StorageEncryptionService,
          useValue: storageEncryptionServiceSpyObj,
        },
      ],
    });

    service = TestBed.inject(NewRequestService);
    // httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    httpServiceSpy = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
    storageEncryptionServiceSpy = TestBed.inject(
      StorageEncryptionService,
    ) as jasmine.SpyObj<StorageEncryptionService>;

    storageEncryptionServiceSpy.getvalue.and.returnValue(mockEmployeeId);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getLeaveTypeAndBalanceApi', () => {
    it('should return leave type and balance data', (done) => {
      const mockResponse = { data: 'leaveTypeAndBalanceData' };
      const startDate = '2023-01-01';

      httpServiceSpy.get.and.returnValue(of(mockResponse));

      service.getLeaveTypeAndBalanceApi(startDate).subscribe((data) => {
        expect(data).toEqual(mockResponse);
        done();
      });
    });

    it('should handle error when fetching leave type and balance data', (done) => {
      const mockError = new Error('Error fetching data');
      const startDate = '2023-01-01';

      httpServiceSpy.get.and.returnValue(throwError(mockError));

      service.getLeaveTypeAndBalanceApi(startDate).subscribe({
        error: (error) => {
          expect(error).toBe(mockError);
          done();
        },
      });
    });
  });

  describe('createNewLeaveRequestApi', () => {
    it('should create a new leave request', (done) => {
      const mockResponse = { data: 'newLeaveRequestData' };
      const data = {
        leaveType: 'sick',
        startDate: '2023-01-01',
        endDate: '2023-01-05',
      };

      httpServiceSpy.post.and.returnValue(of(mockResponse));

      service.createNewLeaveRequestApi(data).subscribe((response) => {
        expect(response).toEqual(mockResponse);
        done();
      });
    });

    it('should handle error when creating a new leave request', (done) => {
      const mockError = new Error('Error creating leave request');
      const data = {
        leaveType: 'sick',
        startDate: '2023-01-01',
        endDate: '2023-01-05',
      };
      httpServiceSpy.post.and.returnValue(throwError(mockError));

      service.createNewLeaveRequestApi(data).subscribe({
        error: (error) => {
          expect(error).toBe(mockError);
          done();
        },
      });
    });
  });

  describe('getDurationAndReturnToWork', () => {
    it('should return duration and return to work data', (done) => {
      const mockResponse = { data: 'durationAndReturnToWorkData' };
      const payload = { startDate: '2023-01-01', endDate: '2023-01-05' };

      httpServiceSpy.post.and.returnValue(of(mockResponse));

      service.getDurationAndReturnToWork(payload).subscribe((response) => {
        expect(response).toEqual(mockResponse);
        done();
      });
    });

    it('should handle error when fetching duration and return to work data', (done) => {
      const mockError = new Error('Error fetching data');
      const payload = { startDate: '2023-01-01', endDate: '2023-01-05' };
      httpServiceSpy.post.and.returnValue(throwError(mockError));

      service.getDurationAndReturnToWork(payload).subscribe({
        error: (error) => {
          expect(error).toBe(mockError);
          done();
        },
      });
    });
  });

  describe('getAboutLeaveDataFromAEM', () => {
    it('should return about leave data from AEM', (done) => {
      const mockResponse = { data: 'aboutLeaveData' };
      const userLocale = 'en-US';
      httpServiceSpy.get.and.returnValue(of(mockResponse));

      service.getAboutLeaveDataFromAEM(userLocale).subscribe((data) => {
        expect(data).toEqual(mockResponse);
        done();
      });
    });

    it('should handle error when fetching about leave data from AEM', (done) => {
      const mockError = new Error('Error fetching data');
      const userLocale = 'en-US';

      httpServiceSpy.get.and.returnValue(throwError(mockError));

      service.getAboutLeaveDataFromAEM(userLocale).subscribe({
        error: (error) => {
          expect(error).toBe(mockError);
          done();
        },
      });
    });
  });

  describe('getUploadedAttachment', () => {
    it('should return uploaded attachment data', (done) => {
      const mockResponse = { data: 'uploadedAttachmentData' };
      const attachmentId = '12345';

      httpServiceSpy.get.and.returnValue(of(mockResponse));

      service.getUploadedAttachment(attachmentId).subscribe((data) => {
        expect(data).toEqual(mockResponse);
        done();
      });
    });

    it('should handle error when fetching uploaded attachment data', (done) => {
      const mockError = new Error('Error fetching data');
      const attachmentId = '12345';
      httpServiceSpy.get.and.returnValue(throwError(mockError));

      service.getUploadedAttachment(attachmentId).subscribe({
        error: (error) => {
          expect(error).toBe(mockError);
          done();
        },
      });
    });
  });

  // describe('uploadAttachmentWithApi', () => {
  //   it('should upload attachment', (done) => {
  //     const mockResponse = { data: 'uploadedAttachmentData' };
  //     const file = new File([''], 'filename');
  //     const formData = new FormData();
  //     formData.append('attachmentFile', file, file.name);

  //     httpClientSpy.post.and.returnValue(of(mockResponse));

  //     service.uploadAttachmentWithApi(file).subscribe((response) => {
  //       expect(response).toEqual(mockResponse);
  //       done();
  //     });
  //   });

  //   it('should handle error when uploading attachment', (done) => {
  //     const mockError = new Error('Error uploading attachment');
  //     const file = new File([''], 'filename');
  //     const formData = new FormData();
  //     formData.append('attachmentFile', file, file.name);
  //     httpClientSpy.post.and.returnValue(throwError(mockError));

  //     service.uploadAttachmentWithApi(file).subscribe({
  //       error: (error) => {
  //         expect(error).toBe(mockError);
  //         done();
  //       },
  //     });
  //   });
  // });
});
