/* eslint-disable no-plusplus */
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  Subject,
  forkJoin,
  throwError,
} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  AEM_SERVLET_PATH,
  GET_BASE_MANAGER_SERVLET,
  GET_DISCLAIMER_FROM_AEM,
  GET_GENERATE_PDF,
  GET_VIEW_TRIP_DETAILS,
  GET_VIEW_EACM_TRIP_DETAILS,
  POST_WITHDRAW_REQUEST,
} from './../../../app.api';
import { environment } from '../../../../environments/environment';
import { HttpService } from './http.service';
// import { HttpService } from 'src/app/shared/services/http.service';
// import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FlightSearchService {
  apibaseUrlForAcm: string = environment.ACM_BASE_URL;

  apibaseUrlForEacm: string = environment.EACM_BASE_URL;

  editSearch = new BehaviorSubject({});

  dataRequestFlights = new BehaviorSubject<any>({});

  setStatus = new BehaviorSubject({});

  editAcmRequestFlights$ = this.dataRequestFlights.asObservable();

  editMode: boolean = false;

  activationDate = new Date().toISOString();

  requestId: string = '';

  searchForm;

  getUniqeLocationCode: any[] = [];

  stationNanes = [];

  constructor(private httpService: HttpService, public router: Router) {}

  // throw error
  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  emitdata(data: any) {
    this.dataRequestFlights.next(data);
  }

  protected httpMultipleGet(links: any): any {
    const result = new Subject<Response>();
    const requestArr = [];
    for (let x = 0; x < links.length; x++) {
      requestArr.push(this.httpService.get(this.apibaseUrlForAcm, links[x]));
    }
    forkJoin(requestArr).subscribe(
      (response: any) => {
        result.next(response);
      },
      (err) => {
        result.error(err);
      },
    );
    return result;
  }

  multipleFlightSearch(links: any): Observable<any> {
    return this.httpMultipleGet(links).pipe(catchError(this.handleError));
  }

  getAirportsList(endpoint): Observable<any> {
    return this.httpService.get(environment.ACM_BASE_URL, endpoint);
  }

  getBaseManagerList(params): Observable<any> {
    const endpoint = `${AEM_SERVLET_PATH}${GET_BASE_MANAGER_SERVLET}baseManagerCfPath=${params}`;
    return this.httpService.get(environment.AEM_BASE_URL, endpoint);
  }

  // multiple file upload call
  protected httpMultipleFilePost(links: any, content: any): any {
    const result = new Subject<Response>();
    const fileArr = [];
    /* eslint no-plusplus: "off" */
    for (let x = 0; x < links.length; x++) {
      const url = links[x];
      const payload = new FormData();
      payload.append('file', content[x], content[x].name);
      fileArr.push(
        this.httpService.post(this.apibaseUrlForAcm, url, payload, {
          Accept: 'application/json',
        }),
      );
    }
    forkJoin(fileArr).subscribe(
      (response: any) => {
        result.next(response);
      },
      (err) => {
        result.error(err);
      },
    );
    return result;
  }

  // post request service call
  generateRequest(
    url: any,
    payload?: any,
    type?: string,
    isEacm?: boolean,
  ): Observable<any> {
    if (type === 'POST') {
      return this.httpService
        .post(
          isEacm ? this.apibaseUrlForEacm : this.apibaseUrlForAcm,
          url,
          payload,
        )
        .pipe(catchError(this.handleError));
    }
    if (type === 'PUT') {
      return this.httpService
        .put(
          isEacm ? this.apibaseUrlForEacm : this.apibaseUrlForAcm,
          url,
          payload,
        )
        .pipe(catchError(this.handleError));
    }
    return null;
  }

  // file upload api call
  CaseMultipleFileUpload(links: any, postData: any): Observable<any> {
    return this.httpMultipleFilePost(links, postData).pipe(
      catchError(this.handleError),
    );
  }

  getDisclaimerTexts(params): Observable<any> {
    const endpoint = `${environment.AEM_BASE_URL}${AEM_SERVLET_PATH}${GET_DISCLAIMER_FROM_AEM}`;
    return this.httpService.get(endpoint, params);
  }

  editSearchForm(info, isReadonly) {
    this.editSearch.next({ isReadonlyMode: isReadonly, tripForm: info });
  }

  emitStatus(status) {
    this.setStatus.next({ status });
  }

  getViewTripDetails(reqNo, isEACM) {
    const endpoint = isEACM
      ? `${GET_VIEW_EACM_TRIP_DETAILS}${reqNo}`
      : `${GET_VIEW_TRIP_DETAILS}${reqNo}`;
    return this.httpService.get(environment.ACM_BASE_URL, endpoint);
  }

  postWithdrawRequest(reqNo) {
    const endpoint = `${POST_WITHDRAW_REQUEST}${reqNo}`;
    return this.httpService.post(environment.ACM_BASE_URL, endpoint, {});
  }

  downloadPDF(reqNo, isHistory = false): Observable<Blob> {
    const endpoint = isHistory
      ? `${GET_GENERATE_PDF}${reqNo}&history=true`
      : `${GET_GENERATE_PDF}${reqNo}`;

    return this.httpService.get(
      environment.ACM_BASE_URL,
      endpoint,
      {},
      {
        responseType: 'blob',
      },
    );
  }

  // navigatin redirect
  onNavigate(link: string, isExternal: boolean, id: string) {
    if (isExternal) {
      // Open link in a new browser tab
      window.open(link, '_blank');
    } else {
      this.router.navigateByUrl(`${link}?id=${id}`);
    }
  }

  // flight Availability for eACM
  getAvailbilityCheck(endpoint) {
    return this.httpService.get(environment.ACM_BASE_URL, endpoint);
  }
}
