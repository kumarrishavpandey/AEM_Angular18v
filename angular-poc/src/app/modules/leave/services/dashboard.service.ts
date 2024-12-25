import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';
import { HttpService } from '../../shared/services/http.service';
import { StorageEncryptionService } from '../../shared/services/storage-encryption.service';
import { DebugService } from '../../shared/services/debug.service';
import { environment } from '../../../../environments/environment';
import { EMP_LEAVE, EMP_LEAVE_BALANCE, GET_HOLIDAY_CALENDARS, GET_HOLIDAY_CALENDARS_DATA, LOGGEDIN_EMP } from '../../../app.api';


@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  employeeId = '';

  apiUrl = environment.EMP_LEAVE_BASE_URL;

  constructor(
    private httpService: HttpService,
    private storageEncryptionService: StorageEncryptionService,
    private debugService: DebugService,
  ) {
    this.employeeId = this.storageEncryptionService.getvalue(LOGGEDIN_EMP);
  }

  getEmployeeDashboardLeaveBalance(): Observable<any> {
    const endpoint = `${EMP_LEAVE}/${this.employeeId}${EMP_LEAVE_BALANCE}`;

    return this.httpService.get(this.apiUrl, endpoint).pipe(
      catchError((error) => {
        // Handle errors, log them or perform any other actions
        this.debugService.error('Error fetching employee data:', error);
        // You can rethrow the error if needed
        return throwError(error);
      }),
    );
  }

  getAEMKeys(){
    return this.httpService.get("", 'content/my-ai/in/en/leave/jcr:content/root/container/leave.model.json',{ 'Referer' : 'myai-dev.airindia.com/content'});
  }


  getHolidayCalendars(): Observable<any> {
    const endpoint = `${GET_HOLIDAY_CALENDARS}`;
    return this.httpService.get(this.apiUrl, endpoint).pipe(
      catchError((error) => {
        // Handle errors, log them or perform any other actions
        this.debugService.error('Error fetching employee data:', error);
        // You can rethrow the error if needed
        return throwError(error);
      }),
    );
  }

  getEmployeeDashboardLeaveList(calendarCode): Observable<any> {
    const endpoint = `${EMP_LEAVE}/${this.employeeId}${GET_HOLIDAY_CALENDARS_DATA}?holidayCalendarCode=${calendarCode}`;
    return this.httpService.get(this.apiUrl, endpoint).pipe(
      catchError((error) => {
        // Handle errors, log them or perform any other actions
        this.debugService.error('Error fetching employee data:', error);
        // You can rethrow the error if needed
        return throwError(error);
      }),
    );
  }
}
