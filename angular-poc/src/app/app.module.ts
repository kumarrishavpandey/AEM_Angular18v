import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
// import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { createCustomElement } from '@angular/elements';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
  HttpHandler,
  provideHttpClient,
} from '@angular/common/http';
import {
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
  MsalBroadcastService,
  MsalGuard,
  MsalGuardConfiguration,
  MsalInterceptorConfiguration,
  MsalService,
} from '@azure/msal-angular';
import { DebugService } from './modules/shared/services/debug.service';
import {
  AuthenticationResult,
  BrowserCacheLocation,
  InteractionType,
  IPublicClientApplication,
  LogLevel,
  PublicClientApplication,
} from '@azure/msal-browser';
import { environment } from '../environments/environment';
import { CommonService } from './modules/shared/services/common.service';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { SharedModule } from './modules/shared/shared.module';
import { NavigationComponent } from './modules/navigation/navigation.component';
import { HeaderComponent } from './modules/header-module/header.component';
import { NavigationService } from './modules/navigation/navigation.service';
import { HomeComponent } from './modules/home/home.component';
import { BannerComponent } from './modules/home/banner/banner.component';
import { WorkplaceComponent } from './modules/home/workplace/workplace.component';
import { NpsButtonComponent } from './modules/home/nps-button/nps-button.component';
import { EmpDashboardAwardsComponent } from './modules/home/emp-dashboard-awards/emp-dashboard-awards.component';
import { MyBoardComponent } from './modules/home/my-board/my-board.component';
import { QuickActionComponent } from './modules/home/quick-action/quick-action.component';
import { UpcomingAlertsComponent } from './modules/home/upcoming-alerts/upcoming-alerts.component';
import { UpcomingAlertModalComponent } from './modules/home/upcoming-alert-modal/upcoming-alert-modal.component';
import { AwardsRosterComponent } from './modules/home/awards-roster/awards-roster.component';
import { ChatBotDialogComponent } from './modules/home/chat-bot-dialog/chat-bot-dialog.component';
import { ExploreMyaiComponent } from './modules/home/explore-myai/explore-myai.component';
import { HomeService } from './modules/home/home.service';
import { ChunkPipe } from './modules/shared/pipes/chunk.pipe';
import { DateWithoutYearPipe } from './modules/shared/pipes/date-without-year.pipe';
import { DatePipe } from '@angular/common';
import { LeaveComponent } from './modules/leave/leave.component';
import { DashboardComponent } from './modules/leave/dashboard/dashboard.component';
import { RequestedLeaveComponent } from './modules/leave/requested-leave/requested-leave.component';
import { NewRequestComponent } from './modules/leave/new-request/new-request.component';
import { ViewEditLeaveDialogComponent } from './modules/leave/requested-leave/view-edit-leave-dialog/view-edit-leave-dialog.component';
import { HolidayLeavesListViewComponent } from './modules/leave/dashboard/holiday-leaves-list-view/holiday-leaves-list-view.component';
import { CalendarViewComponent } from './modules/leave/dashboard/calendar-view/calendar-view.component';
import { SelectRegionComponent } from './modules/leave/dashboard/select-region/select-region.component';
import { HolidayCalendarComponent } from './modules/leave/holiday-calendar/holiday-calendar.component';
import { AngularMaterialModule } from './angular-material.module';

export function MSALInstanceFactory(
  debugService: DebugService
): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.clientId,
      authority: environment.authority,
      redirectUri: environment.MSAL_REDIRECT_URL,
      postLogoutRedirectUri: environment.MSAL_POST_LOGOUT_REDIRECT_URL,
      navigateToLoginRequestUrl: false,
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: false,
      secureCookies: true,
    },
    system: {
      loggerOptions: {
        logLevel: environment.MSAL_LOG_LEVEL,
        loggerCallback: (level, message, containsPii) => {
          if (containsPii) {
            return;
          }

          const logTag = '[MSAL]';

          switch (level) {
            case LogLevel.Error:
              debugService.error(logTag, message);
              return;
            case LogLevel.Info:
              debugService.info(logTag, message);
              return;
            case LogLevel.Verbose:
              debugService.debug(logTag, message);
              return;
            case LogLevel.Warning:
              debugService.warn(logTag, message);
              return;
            default:
              debugService.log(logTag, message);
          }
        },
        piiLoggingEnabled: false,
      },
    },
  });
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: [`api://${environment.clientId}/User.Read`],
    },
    loginFailedRoute: environment.MSAL_POST_LOGOUT_REDIRECT_URL,
  };
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();

  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', [
    'user.read',
  ]);
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/sites', [
    'Sites.Read.All',
  ]);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

export function AEMconfigFactory(
  msalService: MsalService,
  commonService: CommonService
) {
  return () =>
    new Promise((_resolve) => {
      (async () => {
        if (window.self !== window.top) {
          _resolve(true);
        } else if (commonService.isLoginPage()) {
          await commonService.setPreLoginEnvConfig();
          _resolve(true);
        } else if (commonService.hasActiveMsalAccount()) {
          await commonService.setPostLoginEnvConfig();

          _resolve(true);
        } else {
          const loginRedirectTimeout = setTimeout(async () => {
            await commonService.navigateToLogin();
            _resolve(false);
          }, 1000);

          msalService.handleRedirectObservable().subscribe({
            next: async (result: AuthenticationResult) => {
              if (result && result.account) {
                clearTimeout(loginRedirectTimeout);

                msalService.instance.setActiveAccount(result.account);

                commonService.setAccessToken(result.accessToken);

                if (commonService.checkIFCompCardDomain()) {
                  await commonService.setPreLoginEnvConfig();
                } else {
                  await commonService.setPostLoginEnvConfig();
                }

                _resolve(true);
              }
            },
            error: async () => {
              await commonService.navigateToLogin();
              _resolve(false);
            },
          });
        }
      })();
    });
}

@NgModule({
  declarations: [AppComponent, NavigationComponent, HeaderComponent, HomeComponent, ExploreMyaiComponent,
    BannerComponent,
    WorkplaceComponent,
    NpsButtonComponent,
    EmpDashboardAwardsComponent,
    MyBoardComponent,
    QuickActionComponent,
    UpcomingAlertsComponent,
    UpcomingAlertModalComponent,
    AwardsRosterComponent,
    HomeComponent,
    ChatBotDialogComponent,
    LeaveComponent,
    DashboardComponent,
    RequestedLeaveComponent,
    NewRequestComponent,
    ViewEditLeaveDialogComponent,
    HolidayLeavesListViewComponent,
    CalendarViewComponent,
    SelectRegionComponent,
    HolidayCalendarComponent,
  
  
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    HttpClientModule,
    SharedModule
    ],
  bootstrap: [LeaveComponent, AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    NavigationService,
    CommonService,
    HomeService, ChunkPipe, 
    DateWithoutYearPipe, 
    DatePipe,
    provideAnimationsAsync(),
    provideHttpClient(),
    {
      provide: MSAL_INSTANCE,
      deps: [DebugService],
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class AppModule {
  constructor(public injector:Injector){
    const customElement = createCustomElement(AppComponent, {injector});
    customElements.define('header-component', customElement);

    const customElement1 = createCustomElement(LeaveComponent, {injector});
    customElements.define('leave-component', customElement1);
  
  }}
