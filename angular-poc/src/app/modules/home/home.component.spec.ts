// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { DatePipe } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { ReactiveFormsModule } from '@angular/forms';
// import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { BrowserTestingModule } from '@angular/platform-browser/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import {
//   MSAL_GUARD_CONFIG,
//   MsalBroadcastService,
//   MsalGuardConfiguration,
//   MsalService,
// } from '@azure/msal-angular';
// import { InteractionType, PopupRequest } from '@azure/msal-browser';
// import { AngularMaterialModule } from 'src/app/angular-material.module';
// import { ChunkPipe } from 'src/app/shared/pipes/chunk.pipe';
// import { DateWithoutYearPipe } from 'src/app/shared/pipes/date-without-year.pipe';
// import { DynamicScriptLoaderService } from 'src/app/shared/services/dynamic-script-loader.service';
// import { AwardsRosterComponent } from './awards-roster/awards-roster.component';
// import { BannerComponent } from './banner/banner.component';
// import { homePageDetails } from './constant';
// import { HomeComponent } from './home.component';
// import { MyBoardComponent } from './my-board/my-board.component';
// import { NpsButtonComponent } from './nps-button/nps-button.component';
// import { QuickActionComponent } from './quick-action/quick-action.component';
// import { UpcomingAlertsComponent } from './upcoming-alerts/upcoming-alerts.component';
// import { WorkplaceComponent } from './workplace/workplace.component';

// describe('HomeComponent', () => {
//   let component: HomeComponent;
//   let fixture: ComponentFixture<HomeComponent>;
//   let mockDialog: jasmine.SpyObj<MatDialog>;

//   let authServiceStub: jasmine.SpyObj<MsalService>;
//   let msalBroadcastService: jasmine.SpyObj<MsalBroadcastService>;
//   beforeEach(async () => {
//     authServiceStub = jasmine.createSpyObj('MsalService', [
//       'loginPopup',
//       'loginRedirect',
//       'instance',
//     ]);

//     msalBroadcastService = jasmine.createSpyObj('MsalBroadcastService', [
//       'inProgress$',
//       'msalInstance',
//     ]);

//     const msalGuardConfigStub: MsalGuardConfiguration = {
//       authRequest: {} as PopupRequest,
//       interactionType: InteractionType.Popup,
//     };

//     mockDialog = jasmine.createSpyObj('MatDialog', ['open', 'closeAll']);
//     await TestBed.configureTestingModule({
//       declarations: [
//         HomeComponent,
//         BannerComponent,
//         QuickActionComponent,
//         MyBoardComponent,
//         AwardsRosterComponent,
//         UpcomingAlertsComponent,
//         WorkplaceComponent,
//         NpsButtonComponent,
//       ],
//       imports: [
//         MatDialogModule,
//         ReactiveFormsModule,
//         HttpClientModule,
//         HttpClientTestingModule,
//         BrowserTestingModule,
//         BrowserModule,
//         AngularMaterialModule,
//         BrowserAnimationsModule,
//         RouterTestingModule,
//       ],
//       providers: [
//         DatePipe,
//         ChunkPipe,
//         DateWithoutYearPipe,
//         DynamicScriptLoaderService,
//         { provide: MatDialog, useValue: mockDialog },
//         { provide: MsalService, useValue: authServiceStub },
//         { provide: MsalBroadcastService, useValue: msalBroadcastService },
//         { provide: MSAL_GUARD_CONFIG, useValue: msalGuardConfigStub },
//       ],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(HomeComponent);

//     component = fixture.componentInstance;
//     component.homePageDetails = homePageDetails;

//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
