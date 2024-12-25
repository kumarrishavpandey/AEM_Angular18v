import { Injectable } from '@angular/core';
import { HttpService } from '../shared/services/http.service';

import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';
import {
  ADD_EMP_EDUCATION,
  ADD_EMP_EXPERIENCE,
  ADD_ID_CARD_IMAGE,
  DELETE_EMP_EDUCATION,
  DELETE_EMP_EXPERIENCE,
  EMP_LEAVE,
  EMP_LEAVE_BALANCE,
  EMP_PROFILE,
  GET_EMP_EDUCATION,
  GET_EMP_EXPERIENCE,
  GET_EMP_PROFILE,
  GET_ID_CARD_IMAGE,
  UPDATE_EMP_EDUCATION,
  UPDATE_EMP_EXPERIENCE,
} from '../../../app/app.api';

import { DebugService } from '../shared/services/debug.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeProfileService {
  constructor(
    private httpService: HttpService,
    private debugService: DebugService
  ) {}

  getEmployee(employeeId: string): Observable<any> {
    const endpoint = `${EMP_PROFILE}/${employeeId}/${GET_EMP_PROFILE}`;

    return this.httpService
      .get(environment.EMP_PROFILE_BASE_URL, endpoint)
      .pipe(
        catchError((error) => {
          // Handle errors, log them or perform any other actions
          this.debugService.log('Error fetching employee data:', error);
          // You can rethrow the error if needed
          return throwError(error);
        })
      );
  }

  getEmpExperience(employeeId: string): Observable<any> {
    const endpoint = `${EMP_PROFILE}/${employeeId}${GET_EMP_EXPERIENCE}`;

    return this.httpService
      .get(environment.EMP_PROFILE_BASE_URL, endpoint)
      .pipe(
        catchError((error) => {
          // Handle errors, log them or perform any other actions
          this.debugService.log('Error fetching employee data:', error);
          // You can rethrow the error if needed
          return throwError(error);
        })
      );
  }

  getEmpEducation(employeeId: string): Observable<any> {
    const endpoint = `${EMP_PROFILE}/${employeeId}${GET_EMP_EDUCATION}`;

    return this.httpService
      .get(environment.EMP_PROFILE_BASE_URL, endpoint)
      .pipe(
        catchError((error) => {
          // Handle errors, log them or perform any other actions
          this.debugService.log('Error fetching employee data:', error);
          // You can rethrow the error if needed
          return throwError(error);
        })
      );
  }

  getLeaveBalance(employeeId: string): Observable<any> {
    const endpoint = `${EMP_LEAVE}/${employeeId}${EMP_LEAVE_BALANCE}`;

    return this.httpService.get(environment.EMP_LEAVE_BASE_URL, endpoint).pipe(
      catchError((error) => {
        // Handle errors, log them or perform any other actions
        this.debugService.log('Error fetching employee data:', error);
        // You can rethrow the error if needed
        return throwError(error);
      })
    );
  }

  updateEmpExperience(employeeId, data): Observable<any> {
    const endpoint = `${EMP_PROFILE}/${employeeId}${UPDATE_EMP_EXPERIENCE}`;

    return this.httpService
      .put(environment.EMP_PROFILE_BASE_URL, endpoint, data)
      .pipe(
        catchError((error) => {
          // Handle errors, log them or perform any other actions
          this.debugService.log('Error fetching employee data:', error);
          // You can rethrow the error if needed
          return throwError(error);
        })
      );
  }

  addEmpExperience(employeeId, data): Observable<any> {
    const endpoint = `${EMP_PROFILE}/${employeeId}${ADD_EMP_EXPERIENCE}`;

    return this.httpService
      .post(environment.EMP_PROFILE_BASE_URL, endpoint, data)
      .pipe(
        catchError((error) => {
          // Handle errors, log them or perform any other actions
          this.debugService.log('Error fetching employee data:', error);
          // You can rethrow the error if needed
          return throwError(error);
        })
      );
  }

  deleteEmpExperience(employeeId, expId): Observable<any> {
    const endpoint = `${EMP_PROFILE}/${expId}/${employeeId}${DELETE_EMP_EXPERIENCE}`;

    return this.httpService
      .delete(environment.EMP_PROFILE_BASE_URL, endpoint)
      .pipe(
        catchError((error) => {
          // Handle errors, log them or perform any other actions
          this.debugService.log('Error fetching employee data:', error);
          // You can rethrow the error if needed
          return throwError(error);
        })
      );
  }

  updateEmpEducation(employeeId, data): Observable<any> {
    const endpoint = `${EMP_PROFILE}/${employeeId}${UPDATE_EMP_EDUCATION}`;

    return this.httpService
      .put(environment.EMP_PROFILE_BASE_URL, endpoint, data)
      .pipe(
        catchError((error) => {
          // Handle errors, log them or perform any other actions
          this.debugService.log('Error fetching employee data:', error);
          // You can rethrow the error if needed
          return throwError(error);
        })
      );
  }

  addEmpEducation(employeeId, data): Observable<any> {
    const endpoint = `${EMP_PROFILE}/${employeeId}${ADD_EMP_EDUCATION}`;

    return this.httpService
      .post(environment.EMP_PROFILE_BASE_URL, endpoint, data)
      .pipe(
        catchError((error) => {
          // Handle errors, log them or perform any other actions
          this.debugService.error('Error fetching employee data:', error);
          // You can rethrow the error if needed
          return throwError(error);
        })
      );
  }

  deleteEmpEducation(employeeId, educationId): Observable<any> {
    const endpoint = `${EMP_PROFILE}/${educationId}/${employeeId}${DELETE_EMP_EDUCATION}`;

    return this.httpService
      .delete(environment.EMP_PROFILE_BASE_URL, endpoint)
      .pipe(
        catchError((error) => {
          // Handle errors, log them or perform any other actions
          this.debugService.error('Error fetching employee data:', error);
          // You can rethrow the error if needed
          return throwError(error);
        })
      );
  }

  // Upload ID Card Image
  uploadIDCardImage(data: any): Observable<any> {
    return this.httpService.post(
      environment.DOCUMENT_OCR_BASE_URL,
      ADD_ID_CARD_IMAGE,
      data
    );
  }

  // Get ID Card Image
  getIDCardImage(): Observable<any> {
    const endpoint = `${EMP_PROFILE}${GET_ID_CARD_IMAGE}`;
    return this.httpService.get(environment.EMP_PROFILE_BASE_URL, endpoint);
  }
}
