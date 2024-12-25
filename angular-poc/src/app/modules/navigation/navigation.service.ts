import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  ADD_APP_COUNTER_FOR_ANALYZE_APP,
  GET_ANALYZE_APP,
  GET_NAVIGATION,
  GET_RECENT_AND_FREQUENTLY_USED_APPS,
} from './../../app.api';
import { DebugService } from './../shared/services/debug.service';
import { HttpService } from './../shared/services/http.service';
import { StorageEncryptionService } from './../shared/services/storage-encryption.service';
import { environment } from './../../../environments/environment';

@Injectable()
export class NavigationService {
  personalisedNavigation = new BehaviorSubject<any>(null);

  shouldFetchPersonalisedNavigation: boolean = true;

  constructor(
    private httpService: HttpService,
    private storageService: StorageEncryptionService,
    private debugService: DebugService
  ) {}

  getAnalyzeAppData(employeeID) {
    return this.httpService.get(
      environment.EMP_PROFILE_BASE_URL,
      `${GET_RECENT_AND_FREQUENTLY_USED_APPS}/${employeeID}/${GET_ANALYZE_APP}`
    );
  }

  updateAppCounter(counterObj) {
    return this.httpService.put(
      environment.EMP_PROFILE_BASE_URL,
      `${GET_RECENT_AND_FREQUENTLY_USED_APPS}/${counterObj.employeeId}/${ADD_APP_COUNTER_FOR_ANALYZE_APP}`,
      counterObj
    );
  }

  getPersonalisedNavigationData(personalisedNavigation, quickAction) {
    const payload = {
      appToken: this.storageService.accessToken,
    };

    return this.httpService.post(
      environment.AEM_QA_BASE_URL,
      `${GET_NAVIGATION}?cfPNavPath=${personalisedNavigation}&cfQuickActionPath=${quickAction}`,
      payload
    );
  }

  setPersonalisedNavigation(
    personalizedNavLink: string,
    quickActionLink: string
  ) {
    if (this.shouldFetchPersonalisedNavigation) {
      this.shouldFetchPersonalisedNavigation = false;

      this.getPersonalisedNavigationData(
        personalizedNavLink,
        quickActionLink
      ).subscribe({
        next: (data) => {
          this.personalisedNavigation.next(data);
        },
        error: (error) => {
          this.debugService.error(
            'Error fetching personalised navigation data',
            error
          );
          this.shouldFetchPersonalisedNavigation = true;
        },
      });
    }
  }
}
