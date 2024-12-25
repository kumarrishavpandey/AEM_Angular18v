import { PlatformLocation } from '@angular/common';
import { Injectable } from '@angular/core';
import { Params, Router } from '@angular/router';
import {
  MsalBroadcastService, MsalService,
} from '@azure/msal-angular';
import { AccountInfo, InteractionStatus } from '@azure/msal-browser';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import {
  AEM_GRAPHQL_PATH,
  AEM_SERVLET_PATH,
  EMP_PROFILE,
  EMPLOYEE_SERVICE_PATH,
  GET_BANNER_DETAILS_SERVLET,
  GET_COUNTRY_LIST_DATA,
  GET_EMP_HOME_PROFILE,
  GET_EMP_ORG_CHART,
  GET_EMP_PROFILE,
  GET_GLOBAL_SEARCH_DATA,
  GET_NAVIGATION_DATA,
  GET_NAVIGATION_DATA_CREW,
  GET_NAVIGATION_DATA_EMPLOYEE,
  GET_QUICK_ACTION_CREW,
  GET_QUICK_ACTION_GENERAL,
  GET_REDIRECTION_DATA,
  LOGGEDIN_EMP_FUCTION,
  LOGGEDIN_EMP_FUCTION_NAME,
  picklist,
  SUBMIT_FEEDBACK_FORM,
} from './../../../app.api';
// import { AnchorTagTarget } from 'src/app/shared/components/anchor-tag/anchor-tag.enum';
// import { AuthService } from 'src/app/shared/services/auth.service';
// import { DebugService } from 'src/app/shared/services/debug.service';
// import { DynamicScriptLoaderService } from 'src/app/shared/services/dynamic-script-loader.service';
// import { HttpService } from 'src/app/shared/services/http.service';
// import { NativeAppsService } from 'src/app/shared/services/native-apps.service';
// import { StorageEncryptionService } from 'src/app/shared/services/storage-encryption.service';
// import { environment } from 'src/environments/environment';
import { downloadBlobFile } from '../../../../utils/utils';
import { environment } from '../../../../environments/environment';
import { HttpService } from './http.service';
import { StorageEncryptionService } from './storage-encryption.service';
import { DebugService } from './debug.service';
import { DynamicScriptLoaderService } from './dynamic-script-loader.service';
import { AuthService } from './auth.service';
import { IMsalIdTokenClaims } from '../../../app.model';
import { AnchorTagTarget } from '../components/anchor-tag/anchor-tag.enum';
// import { downloadBlobFile } from 'utils/utils';

@Injectable()
export class CommonService {
  private loggedInEmployeeDataStatus: BehaviorSubject<boolean>;

  public loggedInEmployeeData: any = {};

  private a2CountryCode: string;

  private locale: string;

  private countryCode: string;

  userEmail: any;

  localeForDate: string;

  private dateFormatSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    {},
  );

  private isBaseManagerSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private httpService: HttpService,
    private storageEncryptionService: StorageEncryptionService,
    private platformLocation: PlatformLocation,
    private msalService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private route: Router,
    private debugService: DebugService,
    private scriptLoader: DynamicScriptLoaderService,
    private authService: AuthService,
  ) {
    this.loggedInEmployeeDataStatus = new BehaviorSubject<boolean>(false);
  }

  setDateFormat(data: any): void {
    this.dateFormatSubject.next(data);
  }

  getDateFormat(): Observable<any> {
    return this.dateFormatSubject.asObservable();
  }

  fetchPersonaInfo(): Observable<any> {
    return of(this.loggedInEmployeeData?.role);
  }

  fetchLoggedInEmployeeData(): Observable<any> {
    return of(this.loggedInEmployeeData);
  }

  getLoggedInEmployeeData(): any {
    return this.loggedInEmployeeData;
  }

  async getEmployeeRole(): Promise<any> {
    if (this.loggedInEmployeeData?.role !== undefined) {
      return this.loggedInEmployeeData?.role;
    }

    return new Promise<any>((resolve) => {
      const checkForValue = () => {
        if (this.loggedInEmployeeData?.role !== undefined) {
          resolve(this.loggedInEmployeeData?.role);
        } else {
          setTimeout(checkForValue, 300);
        }
      };

      checkForValue();
    });
  }

  async getEmployeeDesignation(): Promise<any> {
    if (this.loggedInEmployeeData?.designationDesc !== undefined) {
      return this.loggedInEmployeeData?.designationDesc;
    }

    return new Promise<any>((resolve) => {
      const checkForValue = () => {
        if (this.loggedInEmployeeData?.designationDesc !== undefined) {
          resolve(this.loggedInEmployeeData?.designationDesc);
        } else {
          setTimeout(checkForValue, 300);
        }
      };

      checkForValue();
    });
  }

  async getEmployeeTimeOff(): Promise<any> {
    if (this.loggedInEmployeeData?.timeInfo?.holidayCalendar !== undefined) {
      return this.loggedInEmployeeData?.timeInfo?.holidayCalendar;
    }

    return new Promise<any>((resolve) => {
      const checkForValue = () => {
        if (
          this.loggedInEmployeeData?.timeInfo?.holidayCalendar !== undefined
        ) {
          resolve(this.loggedInEmployeeData?.timeInfo?.holidayCalendar);
        } else {
          setTimeout(checkForValue, 300);
        }
      };

      checkForValue();
    });
  }

  setEmpDataStatus(status: boolean): void {
    const currentStatus = this.loggedInEmployeeDataStatus.getValue();

    if (currentStatus !== status) {
      this.loggedInEmployeeDataStatus.next(status);
    }
  }

  getEmpDataStatus(): Observable<any> {
    return this.loggedInEmployeeDataStatus.asObservable();
  }

  async fetchEmpDataV2(emailId): Promise<boolean> {
    return new Promise((_resolve, _reject) => {
      (async () => {
        try {
          const personaApi = await this.getPersonaApi(emailId).toPromise();

          if (personaApi && personaApi.data) {
            this.loggedInEmployeeData = personaApi.data;

            if (personaApi.data.countryA2) {
              const countryA2 = personaApi.data.countryA2.toLowerCase();
              this.setA2CountryCode(countryA2 === 'um' ? 'us' : countryA2);
              this.setLocale(personaApi.data.countryA2);
              this.setLocaleForDate(personaApi.data.countryA2);

              if (countryA2 === 'um') {
                this.countryCode = 'en_US';
              } else {
                this.countryCode = `en_${personaApi.data.countryA2}`;
              }
            }

            if (personaApi.data.employeeId) {
              this.storageEncryptionService.setEmpId(
                personaApi.data.employeeId.toString(),
              );
            }

            if (personaApi.data.function) {
              this.storageEncryptionService.setvalue(
                LOGGEDIN_EMP_FUCTION,
                personaApi.data.function.toString(),
              );
            }

            if (personaApi.data.functionDesc) {
              this.storageEncryptionService.setvalue(
                LOGGEDIN_EMP_FUCTION_NAME,
                personaApi.data.functionDesc.toString(),
              );
            }

            try {
              let countryCode = this.getA2CountryCode().toLowerCase();

              if (personaApi.data.company && personaApi.data.company === '1300') {
                countryCode = 'vs';
                this.countryCode = 'en_VS';
                this.setLocale('VS');
              }

              // if (!this.isLoginPage() && this.isNativeAppPage()) {
              //   this.storageEncryptionService.setvalue('deeplink', this.platformLocation.pathname.replace('in/en', `${countryCode}/en`));
              // }

              this.setEmpDataStatus(true);
              _resolve(true);

            } catch (error) {
              _reject();

              this.debugService.error(error.message, error);
            }
          }

          _resolve(false);
        } catch (error) {
          _reject();

          this.debugService.error(error.message, error);
        }
      })();
    });
  }

  /**
   * This will call a API to fetch the user role information
   * @param employeeId : Loggedin EmployeeId
   * @returns Htto Observable
   */
  getPersonaApi(employeeId): Observable<any> {
    return this.httpService.get(environment.EMP_PROFILE_BASE_URL, [
      EMP_PROFILE,
      employeeId,
      GET_EMP_HOME_PROFILE,
    ]);
  }

  // Submit nps feedback
  submitNPSFeedback(requestData: any) {
    const endpoint = `${EMP_PROFILE}/${requestData?.userId}${SUBMIT_FEEDBACK_FORM}`;
    return this.httpService.post(
      environment.EMP_PROFILE_BASE_URL,
      endpoint,
      requestData,
    );
  }

  // Get empoloyee data
  getEmployeeData(userId: string): Observable<any> {
    console.log(environment.EMP_PROFILE_BASE_URL);
    return this.httpService.get(environment.EMP_PROFILE_BASE_URL, [
      EMP_PROFILE,
      userId,
      GET_EMP_PROFILE,
    ]);
  }

  // Get employee homepage data
  getEmployeeHomePageData(userId: string): Observable<any> {
    return this.httpService.get(environment.EMP_PROFILE_BASE_URL, [
      EMP_PROFILE,
      userId,
      GET_EMP_HOME_PROFILE,
    ]);
  }

  // Get organization chart data
  getOrgChartData(id: number, level: string) {
    const endpoint = this.httpService.createURLendpoint(
      [EMP_PROFILE, GET_EMP_ORG_CHART],
      {
        userId: id,
        level,
      },
    );

    return this.httpService.get(environment.EMP_PROFILE_BASE_URL, endpoint);
  }

  // Get empoloyee data
  getPickList(picklistArray: any): Observable<any> {
    return this.httpService.post(
      environment.EMP_PROFILE_BASE_URL,
      picklist,
      picklistArray,
    );
  }

  getCrewActionCategoryList(graphtoken) {
    const payload = {
      userToken: graphtoken.accessToken,
      appToken: this.storageEncryptionService.accessToken,
    };

    return this.httpService.post(
      environment.AEM_BASE_URL,
      [AEM_GRAPHQL_PATH, GET_NAVIGATION_DATA_CREW],
      payload,
    );
  }

  getAllEmployeesActionCategoryList(graphtoken) {
    const payload = {
      userToken: graphtoken.accessToken,
      appToken: this.storageEncryptionService.accessToken,
    };

    return this.httpService.post(
      environment.AEM_BASE_URL,
      [AEM_GRAPHQL_PATH, GET_NAVIGATION_DATA_EMPLOYEE],
      payload,
    );
  }

  getEnvValues() {
    return this.httpService.get(
      environment.AEM_BASE_URL,
      '/content/Servlet/Default.envconfig.json',
    );
  }

  getEnvValuesPostlogin() {
    return this.httpService.get(
      environment.AEM_BASE_URL,
      '/content/servlet/Default.envconfigpostlogin.json',
    );
  }

  clearAllMSALLocalStorageData(keyName) {
    // Get all localStorage keys
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i);
      if (key && key.startsWith(keyName)) {
        keysToRemove.push(key);
      }
    }

    // Remove MSAL-related keys from localStorage
    keysToRemove.forEach((key) => localStorage.removeItem(key));
  }

  async setPreLoginEnvConfig() {
    const envConfig = await this.getEnvValues().toPromise();
    Object.assign(environment, envConfig);
  }

  async setPostLoginEnvConfig() {
    if (this.hasActiveMsalAccount()) {
      if (this.authService.isAixEmployee()) {
        await this.setPreLoginEnvConfig();
      } else {
        const activeAccount = this.msalService.instance.getActiveAccount();

        const envConfig = await this.getEnvValuesPostlogin().toPromise();

        Object.assign(environment, envConfig);

        await this.fetchEmpDataV2(activeAccount.username);
      }
    } else {
      this.authService.logout();
    }
  }

  isLoginPage(): boolean {
    return this.platformLocation.pathname === environment.MSAL_POST_LOGOUT_REDIRECT_URL;
  }

  isHomePage(): boolean {
    return this.platformLocation.pathname === environment.MSAL_REDIRECT_URL;
  }

  async navigateToLogin(): Promise<void> {
    if (!this.isLoginPage()) {
      this.storageEncryptionService.setvalue('deeplink', this.route.url);
      await this.setPreLoginEnvConfig();
      this.route.navigate([environment.MSAL_POST_LOGOUT_REDIRECT_URL]);
    }
  }

  hasActiveMsalAccount() {
    return this.authService.hasActiveMsalAccount();
  }

  setAccessToken(accessToken) {
    this.storageEncryptionService.setAccessToken(accessToken);
  }

  loginStatusCheck(): Observable<boolean> {
    return this.msalBroadcastService.inProgress$.pipe(
      filter((status: InteractionStatus) => status === InteractionStatus.None),
      switchMap(() => {
        if (!this.isLoginPage()) {
          const activeAccount = this.msalService.instance.getActiveAccount();

          if (activeAccount && activeAccount.username) {
            if (this.checkIFCompCardDomain()) {
              if (activeAccount.idTokenClaims && activeAccount.idTokenClaims['employeeid']) {
                if (this.authService.isAixEmployee()) {
                  this.storageEncryptionService.setEmpId(activeAccount.idTokenClaims['employeeid'].toString());

                  this.setEmpDataStatus(true);

                  if (!environment.MSAL_COMP_CARD_REDIRECTION.includes(this.platformLocation.pathname)) {
                    this.route.navigate([environment.MSAL_COMP_CARD_REDIRECTION]);
                  }

                  return of(true);
                }

                this.authService.logout();

                return of(false);
              }
            } else if (this.authService.isAixEmployee()) {
              this.authService.logout();

              return of(false);
            }

            return of(true);
          }

          if (this.checkIFCompCardDomain()) {
            this.authService.loginRedirect();
          }
        }

        return of(false);
      }),
    );
  }

  getToolDataFromAEM(persona) {
    const endpoint = this.httpService.createURLendpoint([GET_NAVIGATION_DATA], {
      persona,
    });

    return this.httpService.get(environment.AEM_BASE_URL, endpoint);
  }

  getSearchData(
    keyword: string,
    configPayload,
    persona,
    jobTitle,
    isBaseManager,
  ) {
    let benefitsPath = null;
    if (configPayload.benefits) {
      benefitsPath = configPayload.benefits + persona;
    }

    const payload = {
      appToken: this.storageEncryptionService.accessToken,
      keyword,
      policyPath: configPayload.policy + persona,
      quickActionPath: isBaseManager
        ? configPayload.quickAction + jobTitle
        : configPayload.quickAction + persona,
      pNavActionPath: configPayload.personalizedNav,
      benefitsPath,
    };

    return this.httpService.post(
      environment.AEM_BASE_URL,
      GET_GLOBAL_SEARCH_DATA,
      payload,
    );
  }

  extractQueryParams(link: string): Params | null {
    const queryString = link.split('?')[1];
    if (queryString) {
      const searchParams = new URLSearchParams(queryString);
      const queryParams: Params = {};
      searchParams.forEach((value, key) => {
        queryParams[key] = Number.isNaN(Number(value)) ? value : Number(value);
      });
      return queryParams;
    }
    return null;
  }

  getCrewQucikAction() {
    return this.httpService.get(environment.AEM_BASE_URL, [
      AEM_GRAPHQL_PATH,
      GET_QUICK_ACTION_CREW,
    ]);
  }

  getGeneralQucikAction() {
    return this.httpService.get(environment.AEM_BASE_URL, [
      AEM_GRAPHQL_PATH,
      GET_QUICK_ACTION_GENERAL,
    ]);
  }

  getRedirectionData() {
    return this.httpService.get(environment.AEM_BASE_URL, GET_REDIRECTION_DATA);
  }

  getCountryListData() {
    return this.httpService.get(
      environment.AEM_BASE_URL,
      GET_COUNTRY_LIST_DATA,
    );
  }

  // Getter method for retrieving the country code
  getA2CountryCode(): string {
    return this.a2CountryCode;
  }

  // Setter method for setting the country code
  setA2CountryCode(code: string): void {
    this.a2CountryCode = code;
  }

  getLocale(): string {
    return this.locale;
  }

  setLocale(code: string): void {
    if (code === 'UM') {
      this.locale = 'en_US';
    } else {
      this.locale = `en_${code}`;
    }
  }

  getLocaleForDate(): string {
    return this.localeForDate;
  }

  setLocaleForDate(code: string): void {
    if (code === 'UM') {
      this.localeForDate = 'en-US';
    } else {
      this.localeForDate = `en-${code}`;
    }
  }

  async getA2CountryCodeAsync(): Promise<string> {
    if (this.a2CountryCode !== undefined) {
      return this.a2CountryCode;
    }

    return new Promise<string>((resolve) => {
      const checkForValue = () => {
        if (this.a2CountryCode !== undefined) {
          resolve(this.a2CountryCode);
        } else {
          setTimeout(checkForValue, 300);
        }
      };

      checkForValue();
    });
  }

  isLoggedInEmpFromIndia(): boolean {
    return this.loggedInEmployeeData?.countryA2 === 'IN';
  }

  isTimeProfileExistsForEmployee(): boolean {
    return this.loggedInEmployeeData?.timeInfo?.timeProfile === 'TP_F_M';
  }

  isTimeProfileExistsForEmployeeWithRetry(): Promise<string | undefined> {
    return new Promise<string | undefined>((resolve) => {
      const checkTimeProfile = () => {
        const timeProfile = this.loggedInEmployeeData?.timeInfo?.timeProfile;

        if (timeProfile) {
          resolve(timeProfile);
        } else {
          setTimeout(checkTimeProfile, 500);
        }
      };
      checkTimeProfile();
    });
  }

  isTimeProfileEqualTP_F_M(): Promise<boolean> {
    return this.isTimeProfileExistsForEmployeeWithRetry().then(
      (timeProfile) => timeProfile === 'TP_F_M',
    );
  }

  bannerInfo() {
    const userPersona = this.loggedInEmployeeData?.role?.replace(/\s/g, '');
    const userFunction = this.loggedInEmployeeData?.function;
    const userProbation = this.loggedInEmployeeData?.probationCompleted;

    const endpoint = this.httpService.createURLendpoint(
      [AEM_SERVLET_PATH, GET_BANNER_DETAILS_SERVLET],
      {
        locale: this.getLocale(),
        role: userPersona,
        functions: userFunction,
        probationCompleted: userProbation,
      },
    );

    return this.httpService.get(environment.AEM_BASE_URL, endpoint);
  }

  getAemEncodedUrl(url) {
    const parts = url.split(';');
    const encodedParts = parts.map((part) => encodeURIComponent(part));
    return encodedParts.join('%3B');
  }

  /* Check if image path exists or not */
  isImageValid(imageUrl: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const img = new Image();
      img.src = imageUrl;

      img.onload = () => {
        resolve(true); // Image exists
      };

      img.onerror = () => {
        resolve(false); // Image does not exist
      };
    });
  }

  checkIFCompCardDomain() {
    return this.authService.isCompCardDomain();
  }

  isNativeAppPage() {
    // return this.nativeAppsService.isNativeApp();
  }

  getCompPDF(employeeId) {
    const endpoint = this.httpService.createURLendpoint(
      ['competency-card', 'aix', 'get'],
      {
        staffId: employeeId,
      },
    );

    return this.httpService.get(
      environment.COMPETENCY_BASE_URL,
      endpoint,
      {},
      {
        responseType: 'blob',
      },
    );
  }

  getIsBaseManager(): Observable<boolean> {
    return this.isBaseManagerSubject.asObservable();
  }

  setIsBaseManager(value: boolean): void {
    this.isBaseManagerSubject.next(value);
  }

  loadNativeWebViewDGbot() {
    // indow.chatbotConfig = {
    //   isNativeAppPage: this.isNativeAppPage(),
    //   isAndroidApp: this.nativeAppsService.isAndroidApp(),
    //   isIsoApp: this.nativeAppsService.isIosApp(),
    //   expandView: true,
    //   showMinimizeChatBtn: false,
    //   showCloseChatBtn: false,
    // };

    this.scriptLoader.load('chatbot-js', 'chatbot-css');
  }

  async setNativeWebViewAuthCred(authCredStr: string, promiseResolver: Function) {
    this.storageEncryptionService.deleteNativeAppCred();

    const authCred: {
      token: string;
      empEmail: string;
      // remove token & empEmail once native apps provide below details
      clientInfo: string;
      refreshToken: string;
      accessToken: string;
      idToken: string;
      idTokenClaims: IMsalIdTokenClaims;
      cachedAt: number;
      expiresOn: number;
      extendedExpiresOn: number;
    } = JSON.parse(authCredStr);

    const {
      token,
      empEmail,
      clientInfo,
      refreshToken,
      accessToken,
      idToken,
      idTokenClaims,
      cachedAt,
      expiresOn,
      extendedExpiresOn,
    } = authCred;

    if (accessToken && idToken && refreshToken) {
      this.storageEncryptionService.setAccessToken(accessToken);

      const homeAccountId = `${idTokenClaims.oid}.${environment.TENANT_ID}`;

      // ##########

      const tokenKey = `${homeAccountId}-${environment.MSAL_ENVIRONMENT}-${environment.TENANT_ID}`;

      const tokenKeyValue = {
        authorityType: 'MSSTS',
        clientInfo,
        homeAccountId,
        environment: environment.MSAL_ENVIRONMENT,
        realm: environment.TENANT_ID,
        idTokenClaims,
        localAccountId: idTokenClaims.oid,
        username: idTokenClaims.preferred_username,
        name: idTokenClaims.name,
      };

      localStorage.setItem(tokenKey, JSON.stringify(tokenKeyValue));

      // ##########

      const refreshTokenKey = `${homeAccountId}-${environment.MSAL_ENVIRONMENT}-refreshtoken-${environment.clientId}----`;

      const refreshTokenKeyValue = {
        clientId: environment.clientId,
        credentialType: 'RefreshToken',
        environment: environment.MSAL_ENVIRONMENT,
        homeAccountId,
        secret: refreshToken,
      };

      localStorage.setItem(refreshTokenKey, JSON.stringify(refreshTokenKeyValue));

      // ##########

      const idTokenKey = `${homeAccountId}-${environment.MSAL_ENVIRONMENT}-idtoken-${environment.clientId}-${environment.TENANT_ID}---`;

      const idTokenKeyValue = {
        clientId: environment.clientId,
        credentialType: 'IdToken',
        environment: environment.MSAL_ENVIRONMENT,
        homeAccountId,
        realm: environment.TENANT_ID,
        secret: idToken,
      };

      localStorage.setItem(idTokenKey, JSON.stringify(idTokenKeyValue));

      // ##########

      const accessTokenKey = `${homeAccountId}-${environment.MSAL_ENVIRONMENT}-accesstoken-${environment.clientId}-${environment.TENANT_ID}-api://${environment.clientId}/user.read--`;

      const accessTokenKeyValue = {
        clientId: environment.clientId,
        credentialType: 'AccessToken',
        environment: environment.MSAL_ENVIRONMENT,
        homeAccountId,
        realm: environment.TENANT_ID,
        target: `api://${environment.clientId}/User.Read`,
        tokenType: 'Bearer',
        secret: accessToken,
        cachedAt,
        expiresOn,
        extendedExpiresOn,
      };

      localStorage.setItem(accessTokenKey, JSON.stringify(accessTokenKeyValue));

      // ##########

      const msalAccountKeys = 'msal.account.keys';

      const msalAccountKeysValue = [
        `${homeAccountId}-${environment.MSAL_ENVIRONMENT}-${environment.TENANT_ID}`,
      ];

      localStorage.setItem(msalAccountKeys, JSON.stringify(msalAccountKeysValue));

      // ##########

      const msalTokenKeys = `msal.token.keys.${environment.clientId}`;

      const msalTokenKeysValue = {
        idToken: [idTokenKey],
        accessToken: [accessTokenKey],
        refreshToken: [refreshTokenKey],
      };

      localStorage.setItem(msalTokenKeys, JSON.stringify(msalTokenKeysValue));

      try {
        const accountInfo: AccountInfo = {
          environment: environment.MSAL_ENVIRONMENT,
          homeAccountId,
          idTokenClaims,
          localAccountId: idTokenClaims.oid,
          name: idTokenClaims.name,
          tenantId: environment.TENANT_ID,
          username: idTokenClaims.preferred_username,
        };

        const response = await this.msalService
          .acquireTokenSilent({
            scopes: [`api://${environment.clientId}/User.Read`],
            account: accountInfo,
          }).toPromise();

        this.storageEncryptionService.setAccessToken(response.accessToken);

        this.msalService.instance.setActiveAccount(response.account);

        await this.setPostLoginEnvConfig();

        await this.fetchEmpDataV2(response.account.username);
      } catch (error) {
        this.debugService.error('Silent token acquisition failed:', error);
        // this.nativeAppsService.handleWebViewClose();
      }
    } else if (empEmail && token) {
      this.storageEncryptionService.setAccessToken(token);

      const envConfig = await this.getEnvValuesPostlogin().toPromise();

      Object.assign(environment, envConfig);

      await this.fetchEmpDataV2(empEmail);
    }

    // if (this.nativeAppsService.isNativeAppDGBot()) {
    //   this.loadNativeWebViewDGbot();
    // }

    promiseResolver(true);
  }

  async handleNativeWebView(promiseResolver: Function) {
    // window.getDGAuthCred = async (authCredStr: string) => {
    //   await this.setNativeWebViewAuthCred(authCredStr, promiseResolver);
    // };

    // if (
    //   window.webkit
    //   && window.webkit.messageHandlers
    //   && window.webkit.messageHandlers.webViewDGbot
    //   && typeof window.webkit.messageHandlers.webViewDGbot.postMessage
    //     === 'function'
    // ) {
    //   window.webkit.messageHandlers.webViewDGbot.postMessage('loaded');
    // }

    // if (window.Android && typeof window.Android.getDGauthCred === 'function') {
    //   const authCredStr = window.Android.getDGauthCred();

    //   await this.setNativeWebViewAuthCred(authCredStr, promiseResolver);
    // }
  }

  hasSuccessStatus(response): boolean {
    return response
          && 'status' in response
          && response.status
          && 'code' in response.status
          && response.status.code === 200;
  }

  downloadCompPDF() {
    this.getEmpDataStatus()
      .subscribe((status) => {
        if (status) {
          const empID = this.storageEncryptionService.getEmpId();

          this.getCompPDF(empID).subscribe((res: any) => {
            const blob = new Blob([res], { type: 'application/pdf' });

            downloadBlobFile(blob, {
              target: AnchorTagTarget.SELF,
            });
          });
        }
      });
  }

  /** Vistara Migration Launch Code  */

  checkIfVistaraLocale() {
    return this.platformLocation.pathname.includes('/vs/en/');
  }
}
