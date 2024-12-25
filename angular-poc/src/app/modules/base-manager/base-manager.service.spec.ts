import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment } from 'src/environments/environment';
import {
  AEM_SERVLET_PATH,
  GET_ACM_DATA,
  GET_ACM_BASE_MANAGER_REQUESTS,
  GET_ACM_DATA_COUNT,
  GET_ACM_DOCUMENT,
  GET_BASE_MANAGER_SERVLET,
  GET_ACM_REQUESTS,
} from 'src/app/app.api';
import { BaseManagerService } from './base-manager.service';

describe('BaseManagerService', () => {
  let service: BaseManagerService;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpService', ['get', 'post']);

    TestBed.configureTestingModule({
      providers: [BaseManagerService, { provide: HttpService, useValue: spy }],
    });
    service = TestBed.inject(BaseManagerService);
    httpServiceSpy = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getBaseManagerListFromAEM should call the correct endpoint', () => {
    const endPath = 'some-path';
    const expectedEndPoint = `${AEM_SERVLET_PATH}${GET_BASE_MANAGER_SERVLET}baseManagerCfPath=${endPath}`;
    httpServiceSpy.get.and.returnValue(of({}));

    service.getBaseManagerListFromAEM(endPath);

    expect(httpServiceSpy.get).toHaveBeenCalledOnceWith(
      environment.AEM_BASE_URL,
      expectedEndPoint,
    );
  });

  it('getBaseManagerRequestCountApi should call the correct endpoint', () => {
    const isBaseManager = true;
    const expectedEndPoint = `${GET_ACM_DATA_COUNT}?isBaseManager=${isBaseManager}`;
    httpServiceSpy.get.and.returnValue(of({}));

    service.getBaseManagerRequestCountApi(isBaseManager);

    expect(httpServiceSpy.get).toHaveBeenCalledOnceWith(
      environment.ACM_BASE_URL,
      expectedEndPoint,
    );
  });

  it('getBaseManagerData should call the correct endpoint for history = false', () => {
    const reqNo = '123';
    const history = false;
    const expectedEndPoint = `${GET_ACM_DATA}?requestNo=${reqNo}`;
    httpServiceSpy.get.and.returnValue(of({}));

    service.getBaseManagerData(reqNo, history);

    expect(httpServiceSpy.get).toHaveBeenCalledOnceWith(
      environment.ACM_BASE_URL,
      expectedEndPoint,
    );
  });

  it('getBaseManagerData should call the correct endpoint for history = true', () => {
    const reqNo = '123';
    const history = true;
    const expectedEndPoint = `${GET_ACM_DATA}?requestNo=${reqNo}&history=true`;
    httpServiceSpy.get.and.returnValue(of({}));

    service.getBaseManagerData(reqNo, history);

    expect(httpServiceSpy.get).toHaveBeenCalledOnceWith(
      environment.ACM_BASE_URL,
      expectedEndPoint,
    );
  });

  it('getUploadedAttachment should call the correct endpoint for history = false', () => {
    const docNo = '456';
    const history = false;
    const expectedEndPoint = `${GET_ACM_DOCUMENT}?docNo=${docNo}`;
    httpServiceSpy.get.and.returnValue(of({}));

    service.getUploadedAttachment(docNo, history);

    expect(httpServiceSpy.get).toHaveBeenCalledOnceWith(
      environment.ACM_BASE_URL,
      expectedEndPoint,
    );
  });

  it('getUploadedAttachment should call the correct endpoint for history = true', () => {
    const docNo = '456';
    const history = true;
    const expectedEndPoint = `${GET_ACM_DOCUMENT}?docNo=${docNo}&history=true`;
    httpServiceSpy.get.and.returnValue(of({}));

    service.getUploadedAttachment(docNo, history);

    expect(httpServiceSpy.get).toHaveBeenCalledOnceWith(
      environment.ACM_BASE_URL,
      expectedEndPoint,
    );
  });

  it('submitDeclineRequest should call post with correct parameters', () => {
    const data = {
      requestNo: '123',
      approve: false,
      comment: 'Decline reason',
    };
    httpServiceSpy.post.and.returnValue(of({}));

    service.submitDeclineRequest(data);

    expect(httpServiceSpy.post).toHaveBeenCalledOnceWith(
      environment.ACM_BASE_URL,
      'updateStatus',
      data,
    );
  });

  it('submitApproveRequest should call post with correct parameters', () => {
    const data = { requestNo: '123', approve: true, comment: 'Approve reason' };
    httpServiceSpy.post.and.returnValue(of({}));

    service.submitApproveRequest(data);

    expect(httpServiceSpy.post).toHaveBeenCalledOnceWith(
      environment.ACM_BASE_URL,
      'updateStatus',
      data,
    );
  });

  it('getAcmBaseManagerRequestsListApi should call the correct endpoint with searchData', () => {
    const baseManagerId = 1;
    const status = 'pending';
    const offset = 0;
    const limit = 10;
    const searchData = 'searchTerm';
    const expectedEndPoint = `${GET_ACM_BASE_MANAGER_REQUESTS}?baseManagerId=${baseManagerId}&offset=${offset}&limit=${limit}&status=PENDING&searchKeyword=${searchData}`;
    httpServiceSpy.get.and.returnValue(of({}));

    service.getAcmBaseManagerRequestsListApi(
      baseManagerId,
      status,
      offset,
      limit,
      searchData,
    );

    expect(httpServiceSpy.get).toHaveBeenCalledOnceWith(
      environment.ACM_BASE_URL,
      expectedEndPoint,
    );
  });

  it('getAcmBaseManagerRequestsListApi should call the correct endpoint without searchData', () => {
    const baseManagerId = 1;
    const status = 'pending';
    const offset = 0;
    const limit = 10;
    const expectedEndPoint = `${GET_ACM_BASE_MANAGER_REQUESTS}?baseManagerId=${baseManagerId}&offset=${offset}&limit=${limit}&status=PENDING`;
    httpServiceSpy.get.and.returnValue(of({}));

    service.getAcmBaseManagerRequestsListApi(
      baseManagerId,
      status,
      offset,
      limit,
    );

    expect(httpServiceSpy.get).toHaveBeenCalledOnceWith(
      environment.ACM_BASE_URL,
      expectedEndPoint,
    );
  });

  it('getAcmHistoryList should call the correct endpoint', () => {
    const userId = 'user123';
    const journeyType = 'type1';
    const offset = 0;
    const limit = 10;
    const expectedEndPoint = `${GET_ACM_REQUESTS}?offset=${offset}&limit=${limit}&userId=${userId}&history=true&journeyType=${journeyType}`;
    httpServiceSpy.get.and.returnValue(of({}));

    service.getAcmHistoryList(userId, journeyType, offset, limit);

    expect(httpServiceSpy.get).toHaveBeenCalledOnceWith(
      environment.ACM_BASE_URL,
      expectedEndPoint,
    );
  });
});
