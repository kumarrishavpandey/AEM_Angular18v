import { Injectable } from '@angular/core';
import {
  AEM_SERVLET_PATH,
  GET_ACM_DATA,
  GET_ACM_BASE_MANAGER_REQUESTS,
  GET_ACM_DATA_COUNT,
  GET_ACM_DOCUMENT,
  GET_BASE_MANAGER_SERVLET,
  GET_ACM_REQUESTS,
} from 'src/app/app.api';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseManagerService {
  constructor(private httpService: HttpService) {}

  getBaseManagerListFromAEM(endPath: string) {
    const endPoint = `${AEM_SERVLET_PATH}${GET_BASE_MANAGER_SERVLET}baseManagerCfPath=${endPath}`;
    const res = this.httpService.get(environment.AEM_BASE_URL, endPoint);
    return res;
  }

  getBaseManagerRequestCountApi(isBaseManager: boolean) {
    const endpoint = `${GET_ACM_DATA_COUNT}?isBaseManager=${isBaseManager}`;
    const res = this.httpService.get(environment.ACM_BASE_URL, endpoint);
    return res;
  }

  getBaseManagerData(reqNo, history = false) {
    let endpoint;
    if (history) {
      endpoint = `${GET_ACM_DATA}?requestNo=${reqNo}&history=true`;
    } else {
      endpoint = `${GET_ACM_DATA}?requestNo=${reqNo}`;
    }
    const res = this.httpService.get(environment.ACM_BASE_URL, endpoint);
    return res;
  }

  getUploadedAttachment(docNo, history = false) {
    let endPoint;
    if (history) {
      endPoint = `${GET_ACM_DOCUMENT}?docNo=${docNo}&history=true`;
    } else {
      endPoint = `${GET_ACM_DOCUMENT}?docNo=${docNo}`;
    }
    const res = this.httpService.get(environment.ACM_BASE_URL, endPoint);
    return res;
  }

  submitDeclineRequest(data: {
    requestNo: string;
    approve: boolean;
    comment: any;
  }) {
    return this.httpService.post(
      environment.ACM_BASE_URL,
      'updateStatus',
      data,
    );
  }

  submitApproveRequest(data: {
    requestNo: string;
    approve: boolean;
    comment: string;
  }) {
    return this.httpService.post(
      environment.ACM_BASE_URL,
      'updateStatus',
      data,
    );
  }

  getAcmBaseManagerRequestsListApi(
    baseManagerId: number,
    status: string,
    offset: number,
    limit: number,
    searchData?: string,
  ) {
    const modifiedStatus = status.toUpperCase();
    let endpoint = `${GET_ACM_BASE_MANAGER_REQUESTS}?baseManagerId=${baseManagerId}&offset=${offset}&limit=${limit}&status=${modifiedStatus}`;
    if (searchData) {
      endpoint += `&searchKeyword=${searchData}`;
    }

    const res = this.httpService.get(environment.ACM_BASE_URL, endpoint);
    return res;
  }

  getAcmHistoryList(
    userId: string,
    journeyType: string,
    offset: number,
    limit: number,
  ) {
    const endpoint = `${GET_ACM_REQUESTS}?offset=${offset}&limit=${limit}&userId=${userId}&history=true&journeyType=${journeyType}`;
    const res = this.httpService.get(environment.ACM_BASE_URL, endpoint);
    return res;
  }
}
