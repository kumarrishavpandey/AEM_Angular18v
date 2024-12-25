import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { HttpService } from './http.service';
import { environment } from '../../../../environments/environment';
import { AEM_GRAPHQL_PATH } from '../../../app.api';
// import { AEM_GRAPHQL_PATH } from 'src/app/app.api';
// import { HttpService } from 'src/app/shared/services/http.service';
// import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RosterService {
  upcomingRosterInfor = new Subject();

  constructor(private httpService: HttpService) {}

  getRosterData(endpoint, stuffId): Observable<any> {
    const endpointWithStuffId = endpoint + stuffId;
    return this.httpService.get(environment.FLYING_CREW_BASE_URL, endpointWithStuffId);
  }

  getCardBgImg(airports): Observable<any> {
    const airArr = [];
    airports.forEach((airport) => {
      airArr.push({ value: airport });
    });
    const arrStr = JSON.stringify(airArr);
    const airportObjStr = `;airportCodes={"_logOp": "OR", "_expressions": ${arrStr}}`;

    const apiUrl = `${
      environment.AEM_BASE_URL
    }${AEM_GRAPHQL_PATH}/getImageByAirportCode${encodeURIComponent(
      airportObjStr,
    )}`;
    return this.httpService.get(apiUrl, '');
  }

  setUpcomingRosterInfo(rosterArr) {
    this.upcomingRosterInfor.next(rosterArr);
  }

  getUpcomingRosterInfor() {
    return this.upcomingRosterInfor;
  }
}
