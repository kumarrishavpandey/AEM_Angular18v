import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GET_ACM_DATA_COUNT, GET_ACM_REQUESTS, GET_EACM_DOCUMENT, GET_EACM_REQUESTS, POST_EACM_DOCUMENTS } from '../../../app.api';
import { HttpService } from './http.service';
import { environment } from '../../../../environments/environment';
// import {
//   GET_ACM_DATA_COUNT,
//   GET_ACM_REQUESTS,
//   POST_EACM_DOCUMENTS,
//   GET_EACM_DOCUMENT,
//   GET_EACM_REQUESTS,
// } from 'src/app/app.api';
// import { HttpService } from 'src/app/shared/services/http.service';
// import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EacmService {
  constructor(private httpService: HttpService, private http: HttpClient) {}

  getAcmRequestsListApi(status: string, offset: number, limit: number) {
    const modifiedStatus = status?.toUpperCase();

    const endpoint = `${GET_ACM_REQUESTS}?offset=${offset}&limit=${limit}&status=${modifiedStatus}`;
    const res = this.httpService.get(environment.ACM_BASE_URL, endpoint);
    return res;
  }

  getAcmRequestsCountApi() {
    const endpoint = `${GET_ACM_DATA_COUNT}?isBaseManager=false`;
    const res = this.httpService.get(environment.ACM_BASE_URL, endpoint);
    return res;
  }

  /* Upload attachment */
  uploadAttachmentWithApi(file: File): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('file', file, file.name);

    const endpoint = `${POST_EACM_DOCUMENTS}`;
    const uri = `${environment.EACM_BASE_URL}/${endpoint}`;

    return this.http.post(uri, formData, { reportProgress: true });
  }

  getUploadedAttachment(attachmentId: any) {
    const endPoint = `${GET_EACM_DOCUMENT}?docNo=${attachmentId}`;
    const res = this.httpService.get(environment.EACM_BASE_URL, endPoint);
    return res;
  }

  getAcmRequestsHistoryListApi(type: string, offset: number, limit: number) {
    const journeyType = type.toUpperCase();
    const endpoint = `${GET_EACM_REQUESTS}?offset=${offset}&limit=${limit}&history=true&journeyType=${journeyType}`;
    const res = this.httpService.get(environment.EACM_BASE_URL, endpoint);
    return res;
  }
}
