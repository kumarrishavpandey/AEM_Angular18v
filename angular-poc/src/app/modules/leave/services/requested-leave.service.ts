import { Injectable } from '@angular/core';


import {
  EMP_CANCEL_LEAVE,
  EMP_DELETE_LEAVE,
  EMP_LEAVE,
  EMP_LEAVE_KEYWORD,
  EMP_LEAVE_SUBMIT,
  EMP_LEAVE_WITH_ID,
  EMP_WITH_ID,
  GET_EMP_LEAVE_DETAILS,
  GET_EMP_LEAVE_LIST,
  LOGGEDIN_EMP,
  POST_LEAVE_ATTACHMENT,
} from '../../../app.api';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../shared/services/http.service';
import { StorageEncryptionService } from '../../shared/services/storage-encryption.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestedLeaveService {
  employeeId = '';

  constructor(
    private http: HttpClient,
    private httpService: HttpService,
    private storageEncryptionService: StorageEncryptionService,
  ) {
    this.employeeId = this.storageEncryptionService.getvalue(LOGGEDIN_EMP);
  }



  // Get leave data with leave Id
  getLeaveDataWithId(leaveId: any) {
    const endpoint = `${EMP_LEAVE_WITH_ID}/${leaveId}${EMP_WITH_ID}/${this.employeeId}${GET_EMP_LEAVE_DETAILS}`;

    const res = this.httpService.get(environment.EMP_LEAVE_BASE_URL, endpoint);
    // const res = this.httpService.post(`${this.constant.requestedLeave.employeeLeave}80054732/getLeaveListData`, data);
    return res;
  }

  // Get requested leave data
  getRequestLeaveData(id: string) {
    const endpoint = `${EMP_LEAVE}/${id}${GET_EMP_LEAVE_LIST}`;
    return this.httpService.get(environment.EMP_LEAVE_BASE_URL, endpoint);
  }

  /* Cancel leave request */
  cancelLeaveRequestApi(empId, leaveId) {
    const endpoint = `${EMP_LEAVE}/${empId}${EMP_LEAVE_KEYWORD}/${leaveId}${EMP_CANCEL_LEAVE}`;
    return this.httpService.post(environment.EMP_LEAVE_BASE_URL, endpoint, {});
  }

  // Delete leave request
  deleteLeaveRequestApi(leaveId) {
    const endpoint = `${EMP_LEAVE_WITH_ID}${EMP_DELETE_LEAVE}/${leaveId}`;
    return this.httpService.delete(environment.EMP_LEAVE_BASE_URL, endpoint);
  }

  // Update leave request
  updateLeaveRequestApi(payload) {
    const endpoint = `${EMP_LEAVE}/${this.employeeId}${EMP_LEAVE_SUBMIT}`;
    return this.httpService.put(
      environment.EMP_LEAVE_BASE_URL,
      endpoint,
      payload,
    );
  }

  /* Upload attachment in multipart */
  uploadAttachmentWithApi(file: File): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('attachmentFile', file, file.name);
    const endpoint = `${EMP_LEAVE}/${this.employeeId}${POST_LEAVE_ATTACHMENT}${EMP_LEAVE_SUBMIT}`;

    const uri = `${environment.EMP_LEAVE_BASE_URL}/${endpoint}`;

    return this.http.post(uri, formData);
  }
}
