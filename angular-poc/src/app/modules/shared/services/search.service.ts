import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import {
//   EMP_PROFILE,
//   GET_SEARCH_DATA,
// } from 'src/app/app.api';
// import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';
import { environment } from '../../../../environments/environment';
import { EMP_PROFILE, GET_SEARCH_DATA } from '../../../app.api';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private httpService: HttpService, private http: HttpClient) {}

  // Get search employee data
  getSearchEmpData(value: string, pageNumber: number, pageSize: number) {
    return this.httpService.get(
      environment.EMP_PROFILE_BASE_URL,
      `${EMP_PROFILE}/${value}/${GET_SEARCH_DATA}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    );
  }
}
