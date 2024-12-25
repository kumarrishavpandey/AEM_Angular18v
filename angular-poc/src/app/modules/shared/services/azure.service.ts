import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpService } from './http.service';
// import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AzureService {
  constructor(private httpService: HttpService) {}

  /**
   * This function to get Current weather Info based on user Current Lat Long
   */
  fetchAzureWeatherInfo(
    latitude: number,
    longitude: number,
    unit: string,
  ): Observable<any> {
    return this.httpService.get(
      environment.EMP_PROFILE_BASE_URL,
      `/v1/api/getWeatherData?latitude=${latitude}&longitude=${longitude}&unit=${unit}&apiVersion=1.0&prefix=weather/currentConditions`,
    );
  }

  /**
   * This function to get Current timezone Info based on user Current Lat Long
   */
  fetchAzureTimezoneInfo(latitude: number, longitude: number): Observable<any> {
    return this.httpService.get(
      environment.EMP_PROFILE_BASE_URL,
      `/v1/api/getTimezoneData?latitude=${latitude}&longitude=${longitude}&apiVersion=1.0&prefix=timezone/byCoordinates`,
    );
  }

  /**
   * This function to get Current location Info based on user Current Lat Long
   */
  fetchAzureLocationInfo(latitude: number, longitude: number): Observable<any> {
    return this.httpService.get(
      environment.EMP_PROFILE_BASE_URL,
      `/v1/api/getAddressReverseData?latitude=${latitude}&longitude=${longitude}&apiVersion=1.0&prefix=search/address/reverse&language=en-US&number=1`,
    );
  }

  /**
   * This function to get Cross street Info based on user location
   */
  fetchAzureCrossStreetInfo(location: string): Observable<any> {
    return this.httpService.get(
      environment.EMP_PROFILE_BASE_URL,
      `/v1/api/getAddressData?apiVersion=1.0&prefix=search/address&language=en-US&location=${location}`,
    );
  }
}
