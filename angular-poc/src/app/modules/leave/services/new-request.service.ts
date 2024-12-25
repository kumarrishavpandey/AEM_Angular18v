import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../shared/services/http.service';
import { StorageEncryptionService } from '../../shared/services/storage-encryption.service';
import { AEM_SERVLET_PATH, EMP_LEAVE, EMP_LEAVE_BALANCE, EMP_LEAVE_DURATION, EMP_LEAVE_SUBMIT, GET_LEAVE_DESCRIPTION_SERVLET, LOGGEDIN_EMP, POST_LEAVE_ATTACHMENT } from '../../../app.api';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class NewRequestService {
  employeeId = '';

  constructor(
    private http: HttpClient,
    private httpService: HttpService,
    private storageEncryptionService: StorageEncryptionService,
  ) {
    this.employeeId = this.storageEncryptionService.getvalue(LOGGEDIN_EMP);
  }



  // Get requested leave data
  getLeaveTypeAndBalanceApi(startDate) {
    const endpoint = `${EMP_LEAVE}/${this.employeeId}${EMP_LEAVE_BALANCE}${
      startDate ? `?startDate=${startDate}` : ''
    }`;
    const res = this.httpService.get(environment.EMP_LEAVE_BASE_URL, endpoint);
    return res;
  }

  // Post leave request data
  createNewLeaveRequestApi(data: any) {
    const endpoint = `${EMP_LEAVE}/${this.employeeId}${EMP_LEAVE_SUBMIT}`;
    const res = this.httpService.post(
      environment.EMP_LEAVE_BASE_URL,
      endpoint,
      data,
    );
    return res;
  }

  /* Get leave duration and return to work  */

  getDurationAndReturnToWork(payload: {}) {
    const endpoint = `${EMP_LEAVE}/${this.employeeId}${EMP_LEAVE_DURATION}`;
    const res = this.httpService.post(
      environment.EMP_LEAVE_BASE_URL,
      endpoint,
      payload,
    );
    return res;
  }

  /* getAboutLeaveDataFromAEM will fetch the JSON data from the AEM server for about leave section */
  getAboutLeaveDataFromAEM(userLocale: string) {
    const endPoint = `${AEM_SERVLET_PATH}${GET_LEAVE_DESCRIPTION_SERVLET}locale=${userLocale}`;
    const res = this.httpService.get(environment.AEM_BASE_URL, endPoint);
    return res;
  }

  getUploadedAttachment(attachmentId: any) {
    const endPoint = `${EMP_LEAVE}${POST_LEAVE_ATTACHMENT}/${attachmentId}`;
    const res = this.httpService.get(environment.EMP_LEAVE_BASE_URL, endPoint);
    return res;
  }

  /* Upload attachment */
  uploadAttachmentWithApi(file: File): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('attachmentFile', file, file.name);
    const endpoint = `${EMP_LEAVE}/${this.employeeId}${POST_LEAVE_ATTACHMENT}${EMP_LEAVE_SUBMIT}`;

    return this.httpService.post(
      environment.EMP_LEAVE_BASE_URL,
      endpoint,
      formData,
    );
  }
}
