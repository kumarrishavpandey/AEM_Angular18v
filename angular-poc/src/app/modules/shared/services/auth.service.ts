import { PlatformLocation } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MSAL_GUARD_CONFIG, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { EndSessionRequest, RedirectRequest } from '@azure/msal-browser';
import { AD_ACCESS_TOKEN, LOGGEDIN_EMP } from '../../../app.api';
import { environment } from '../../../../environments/environment';
// import { AD_ACCESS_TOKEN, LOGGEDIN_EMP } from 'src/app/app.api';
// import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
   
    private msalService: MsalService,
    private platformLocation: PlatformLocation,
    private router: Router,
  ) { }

  hasActiveMsalAccount() {
    const activeMsalAccount = this.msalService.instance.getActiveAccount();

    const accessToken = window.localStorage.getItem(AD_ACCESS_TOKEN);

    if (activeMsalAccount && accessToken) {
      return true;
    }

    return false;
  }

  clearStorage(): void {
    window.localStorage.removeItem(AD_ACCESS_TOKEN);
    window.sessionStorage.removeItem(LOGGEDIN_EMP);
  }

  isCompCardDomain(): boolean {
    const pathName = this.platformLocation.hostname;

    return pathName.includes('compcard-stage.airindiaexpress')
      || pathName.includes('compcard.airindiaexpress');
  }

  isAixEmployee(): boolean {
    if (this.hasActiveMsalAccount()) {
      const activeAccount = this.msalService.instance.getActiveAccount();

      return activeAccount.username.includes('airindiaexpress');
    }

    return false;
  }

  getRedirectUrl(): string {
    const pathName = window.location.href;

    if (pathName.includes('benefits-staging')) {
      return 'https://benefits-staging.airindia.com/content/my-ai-benefits/in/en/benefits.html';
    }

    if (pathName.includes('benefits.airindia')) {
      return 'https://benefits.airindia.com/content/my-ai-benefits/in/en/benefits.html';
    }

    if (this.isCompCardDomain() || this.isAixEmployee()) {
      return environment.MSAL_COMP_CARD_REDIRECTION;
    }

    return environment.MSAL_REDIRECT_URL.replace(environment.AEM_BASE_URL, '');
  }

  acquireTokenRedirect() {
    const activeAccount = this.msalService.instance.getActiveAccount();

    const redirectUri = this.getRedirectUrl();

    if (activeAccount) {
      const loginRedirectRequest = {
        // ...this.msalGuardConfig.authRequest,
        account: activeAccount,
        redirectUri,
      } as RedirectRequest;

      this.clearStorage();

      this.msalService.acquireTokenRedirect(loginRedirectRequest);
    } else {
      this.loginRedirect();
    }
  }

  loginRedirect(username: string = null) {
    const activeAccount = this.msalService.instance.getActiveAccount();

    const redirectUri = this.getRedirectUrl();

    let loginRedirectConfig = {
      redirectUri,
    } as RedirectRequest;

    if (username) {
      loginRedirectConfig = {
        ...loginRedirectConfig,
        loginHint: username,
      };
    } else if (activeAccount && activeAccount.username) {
      loginRedirectConfig = {
        ...loginRedirectConfig,
        account: activeAccount,
      };
    }

    // if (this.msalGuardConfig.authRequest) {
    //   loginRedirectConfig = {
    //     ...loginRedirectConfig,
    //     ...this.msalGuardConfig.authRequest,
    //   };
    // }

    this.clearStorage();

    this.msalService.loginRedirect(loginRedirectConfig);
  }

  logout(): void {
    let logoutRedirectRequest = {
      postLogoutRedirectUri: environment.MSAL_POST_LOGOUT_REDIRECT_URL,
    } as EndSessionRequest;

    const activeAccount = this.msalService.instance.getActiveAccount();

    if (activeAccount && activeAccount.username) {
      logoutRedirectRequest = {
        ...logoutRedirectRequest,
        account: activeAccount,
      };
    }

    this.clearStorage();

    this.msalService.logoutRedirect(logoutRedirectRequest);
  }

  refreshPage(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true })
      .then(() => {
        this.router.navigate([this.platformLocation.pathname], { skipLocationChange: true });
      });
  }
}
