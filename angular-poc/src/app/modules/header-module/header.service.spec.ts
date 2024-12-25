import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { StorageEncryptionService } from 'src/app/shared/services/storage-encryption.service';
import { environment } from 'src/environments/environment';
import { GET_TODO_COUNTS, TODO_REQUESTS } from 'src/app/app.api';
import { HeaderService } from './header.service';

describe('HeaderService', () => {
  let service: HeaderService;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;
  let commonServiceSpy: jasmine.SpyObj<CommonService>;
  let storageEncryptionServiceSpy: jasmine.SpyObj<StorageEncryptionService>;

  beforeEach(() => {
    const httpSpy = jasmine.createSpyObj('HttpService', ['get']);
    const commonSpy = jasmine.createSpyObj('CommonService', ['getEmpDataStatus']);
    const storageSpy = jasmine.createSpyObj('StorageEncryptionService', ['getEmpId']);

    TestBed.configureTestingModule({
      providers: [
        HeaderService,
        { provide: HttpService, useValue: httpSpy },
        { provide: CommonService, useValue: commonSpy },
        { provide: StorageEncryptionService, useValue: storageSpy },
      ],
    });

    service = TestBed.inject(HeaderService);
    httpServiceSpy = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
    commonServiceSpy = TestBed.inject(CommonService) as jasmine.SpyObj<CommonService>;
    storageEncryptionServiceSpy = TestBed.inject(StorageEncryptionService) as jasmine.SpyObj<StorageEncryptionService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('setToDoCount should update the count', () => {
    service.setToDoCount(5);
    service.getToDoCount().subscribe((count) => {
      expect(count).toBe(5);
    });
  });

  it('getHeaderToDoCount should call HttpService with the correct URL', () => {
    const employeeId = '12345';
    const expectedEndpoint = `${TODO_REQUESTS}${GET_TODO_COUNTS}${employeeId}`;
    storageEncryptionServiceSpy.getEmpId.and.returnValue(employeeId);
    httpServiceSpy.get.and.returnValue(of({}));

    service.getHeaderToDoCount();

    expect(httpServiceSpy.get).toHaveBeenCalledOnceWith(
      environment.TODO_BASE_URL,
      expectedEndpoint,
    );
  });

  it('fetchToDoCount should update the toDoCount when logged in and response is valid', () => {
    commonServiceSpy.getEmpDataStatus.and.returnValue(of(true));
    const response = {
      status: { code: 200 },
      data: { count: '10' },
    };
    httpServiceSpy.get.and.returnValue(of(response));
    service.setToDoCount(0); // Initial count

    service.fetchToDoCount();

    service.getToDoCount().subscribe((count) => {
      expect(count).toBe(10);
    });
  });

  it('fetchToDoCount should not update the toDoCount when logged in but response is invalid', () => {
    commonServiceSpy.getEmpDataStatus.and.returnValue(of(true));
    const response = {
      status: { code: 400 }, // Invalid status code
      data: { count: '10' },
    };
    httpServiceSpy.get.and.returnValue(of(response));
    service.setToDoCount(0); // Initial count

    service.fetchToDoCount();

    service.getToDoCount().subscribe((count) => {
      expect(count).toBe(0); // Count should remain unchanged
    });
  });

  it('fetchToDoCount should not update the toDoCount when not logged in', () => {
    commonServiceSpy.getEmpDataStatus.and.returnValue(of(false));
    service.setToDoCount(0); // Initial count

    service.fetchToDoCount();

    service.getToDoCount().subscribe((count) => {
      expect(count).toBe(0); // Count should remain unchanged
    });
  });
});
