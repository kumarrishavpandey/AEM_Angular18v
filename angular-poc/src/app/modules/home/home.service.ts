import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Subject } from 'rxjs/internal/Subject';
import { catchError, switchMap } from 'rxjs/operators';
import {
  AEM_SERVLET_PATH,
  EMP_LEARNING,
  EMP_LEAVE,
  EMP_PROFILE,
  feed,
  fields,
  GET_AWARDS_DATA,
  GET_BASE_MANAGER_LIST,
  GET_HOLIDAY_CALENDARS_DATA,
  GET_HOW_DO_I_DATA,
  GET_LEARNING_DATA,
  GET_MANAGER_COURSE_LIST,
  GET_QUICK_ACTION_SERVLET,
  GET_TEAM_DATA,
  GET_UPCOMING_ALERT_DATA_SERVLET,
  GET_WORKPLACE_DATA,
  LOGGEDIN_EMP,
} from '../../app.api';
import { DebugService } from '../shared/services/debug.service';
import { HttpService } from '../shared/services/http.service';
import { environment } from '../../../environments/environment';
import { StorageEncryptionService } from '../shared/services/storage-encryption.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  public employeeData = new Subject<any>();

  public employeeHomePageData = new Subject<any>();

  constructor(
    private httpService: HttpService,
    private storageEncryptionService: StorageEncryptionService,
    private debugService: DebugService
  ) {}

  setEmployeeData(data: any): void {
    this.employeeData.next(data);
  }

  getEmployeeData(): any {
    return this.employeeData;
  }

  setEmployeeHomePageData(data: any) {
    this.employeeHomePageData.next(data);
  }

  getEmployeeHomePageData() {
    return this.employeeHomePageData;
  }

  /**
   * getHowDoI will fetch the JSON data from the AEM server
   * @param persona loggedin user persona
   */
  getHowDoIDataFromAEM() {
    return this.httpService.get(
      environment.AEM_BASE_URL,
      GET_HOW_DO_I_DATA,
      {},
      {
        responseType: 'json',
      }
    );
  }

  getWorkplace(groupId: string, limit: number): Observable<any> {
    const endpoint = `${GET_WORKPLACE_DATA}/${groupId}/${feed}?fields=${fields}&limit=${limit}`;

    return this.httpService.get(environment.WORK_PLACE_URL, endpoint).pipe(
      catchError((error) => {
        // Handle errors, log them or perform any other actions
        this.debugService.error('Error fetching workplace data:', error);
        // You can rethrow the error if needed
        return throwError(error);
      })
    );
  }

  getLearningData() {
    return this.httpService.get(environment.LEARNING_URL, GET_LEARNING_DATA);
  }

  getLeaveBalance(endpoint, stuffId) {
    const endpointWithStuffId = endpoint + stuffId;
    return this.httpService.get(
      environment.FLYING_CREW_BASE_URL,
      endpointWithStuffId
    );
  }

  getBlockHours(endpoint, stuffId) {
    const endpointWithStuffId = endpoint + stuffId;
    return this.httpService.get(
      environment.FLYING_CREW_BASE_URL,
      endpointWithStuffId
    );
  }

  getTakeOffsLanding(endpoint, stuffId) {
    const endpointWithStuffId = endpoint + stuffId;
    return this.httpService.get(
      environment.FLYING_CREW_BASE_URL,
      endpointWithStuffId
    );
  }

  getUpcomingHolidayData(employeeId, calendarCode, startDate, duration) {
    const endpoint = `${EMP_LEAVE}/${employeeId}${GET_HOLIDAY_CALENDARS_DATA}?holidayCalendarCode=${calendarCode}&calenderHolidayStartDate=${startDate}&durationDays=${duration}`;
    return this.httpService
      .get(environment.EMP_LEAVE_BASE_URL, endpoint)
      .pipe(catchError((error) => throwError(error)));
  }

  getUpcomingLearningData(employeeId, searchCriteria, records) {
    const endpoint = `${EMP_LEARNING}/${GET_MANAGER_COURSE_LIST}?searchCriteria=${searchCriteria}&records=${records}&managerId=${employeeId}`;
    return this.httpService.get(environment.LEARNING_URL, endpoint);
  }

  getUpcomingTeamBirthdayData(
    employeeId,
    type,
    userType,
    pageNumber,
    pageSize,
    duration
  ) {
    const endpoint = `${EMP_PROFILE}/${employeeId}/${type}/${userType}/${GET_TEAM_DATA}?pageNumber=${pageNumber}&pageSize=${pageSize}&duration=${duration}`;
    return this.httpService.get(environment.EMP_PROFILE_BASE_URL, endpoint);
  }

  getUpcomingAlertDataFromAEM(locale, functionName, location) {
    const endpoint = this.httpService.createURLendpoint(
      [AEM_SERVLET_PATH, GET_UPCOMING_ALERT_DATA_SERVLET],
      {
        locale,
        function: functionName,
        officeLocation: location,
      }
    );

    return this.httpService.get2(environment.AEM_QA_BASE_URL, endpoint);
  }

  getAwardsData() {
    // currently we don't have test data available for all the employee ID's so added the employee ID directly
    // const endpoint = `${GET_AWARDS_DATA}/80043172`;
    return from(
      this.storageEncryptionService.getDecryptedValueFromSession(
        LOGGEDIN_EMP,
        true
      )
    ).pipe(
      switchMap((empId) => {
        const endpoint = `${GET_AWARDS_DATA}/${empId}`;
        return this.httpService.get(environment.EMP_PROFILE_BASE_URL, endpoint);
      })
    );
  }

  getDocExpInfo(endpoint) {
    return this.httpService.get(environment.DOCUMENT_OCR_BASE_URL, endpoint);
  }

  getFlyingStats(endpoint, stuffId) {
    const endpointWithStuffId = `${endpoint}${stuffId}`;
    return this.httpService.get(
      environment.FLYING_CREW_BASE_URL,
      endpointWithStuffId
    );
  }

  getWorkplaceConfig(endpoint) {
    return this.httpService.get2(environment.AEM_QA_BASE_URL, endpoint);
  }

  getQuickActionsDataFromAEM(endPath: string) {
    const endPoint = this.httpService.createURLendpoint(
      [AEM_SERVLET_PATH, GET_QUICK_ACTION_SERVLET],
      {
        actionCategoryPath: endPath,
      }
    );

    return this.httpService.get2(environment.AEM_QA_BASE_URL, endPoint);
  }

  getBaseManagerList() {
    return this.httpService.get(
      environment.EMP_PROFILE_BASE_URL,
      GET_BASE_MANAGER_LIST
    );
  }

  getAEMKeys() {
    return this.httpService.get(
      '',
      '/content/my-ai/in/en/home/jcr:content/root/container/homepage_component.model.json',
      { Referer: 'myai-dev.airindia.com/content' }
    );
  }
}
