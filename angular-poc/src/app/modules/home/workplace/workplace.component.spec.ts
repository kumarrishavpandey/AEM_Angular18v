// /* eslint  @typescript-eslint/no-unused-vars: "off" */
// import { DatePipe } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import {
//   async,
//   ComponentFixture,
//   fakeAsync,
//   TestBed,
//   tick,
// } from '@angular/core/testing';
// import { ReactiveFormsModule } from '@angular/forms';
// import { MatDialogModule } from '@angular/material/dialog';
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
// import {
//   BrowserCacheLocation,
//   InteractionType,
//   IPublicClientApplication,
//   PopupRequest,
//   PublicClientApplication,
// } from '@azure/msal-browser';
// import { of } from 'rxjs';
// import { AngularMaterialModule } from 'src/app/angular-material.module';
// import { SkeletonLoaderComponent } from 'src/app/shared/components/skeleton-loader/skeleton-loader.component';
// import { CommonService } from 'src/app/shared/services/common.service';
// import { environment } from 'src/environments/environment';
// import { DynamicScriptLoaderService } from 'src/app/shared/services/dynamic-script-loader.service';
// import { homePageDetails, pageTitle } from '../constant';
// import { HomeService } from '../home.service';
// import { WorkplaceComponent } from './workplace.component';

// declare let bootstrap: any;

// export function MSALInstanceFactory(): IPublicClientApplication {
//   return new PublicClientApplication({
//     auth: {
//       clientId: environment.clientId,
//       authority: environment.authority,
//       redirectUri: environment.MSAL_REDIRECT_URL,
//       navigateToLoginRequestUrl: false,
//     },
//     cache: {
//       cacheLocation: BrowserCacheLocation.LocalStorage,
//       storeAuthStateInCookie: false,
//       secureCookies: true,
//     },
//   });
// }

// describe('WorkplaceComponent', () => {
//   let component: WorkplaceComponent;
//   let fixture: ComponentFixture<WorkplaceComponent>;
//   let authServiceStub: jasmine.SpyObj<MsalService>;
//   let msalBroadcastService: jasmine.SpyObj<MsalBroadcastService>;

//   beforeEach(async(() => {
//     (window as any).bootstrap = { Carousel: jasmine.createSpy('Carousel') };
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

//     TestBed.configureTestingModule({
//       declarations: [WorkplaceComponent, SkeletonLoaderComponent],
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
//         DynamicScriptLoaderService,
//         { provide: MsalService, useValue: authServiceStub },
//         { provide: MsalBroadcastService, useValue: msalBroadcastService },
//         { provide: MSAL_GUARD_CONFIG, useValue: msalGuardConfigStub },
//         DatePipe,
//         DynamicScriptLoaderService,
//       ],
//     }).compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(WorkplaceComponent);

//     component = fixture.componentInstance;
//     component.workPlaceLabels = homePageDetails.workPlaceLabels;
//     component.siteSection = pageTitle;

//     fixture.detectChanges();
//     const workplaceDateFormat = 'MMM d at h:mm a';
//     const commonService = TestBed.inject(CommonService);
//     spyOn(commonService, 'getDateFormat').and.returnValue(
//       of({ workplace: workplaceDateFormat }),
//     );
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
//   it('should call APIs', fakeAsync(() => {
//     const commonService = TestBed.inject(CommonService);
//     const workplaceservice = TestBed.inject(HomeService);
//     const mock = {
//       data: [
//         {
//           attachments: {
//             data: [
//               {
//                 description: '# Image Change',
//                 media: {
//                   image: {
//                     height: 576,
//                     src: 'https://scontent-bom1-2.xx.fbcdn.net/v/t39.30808-6/412903666_122106380240147908_5213130858199971847_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=dd477f&_nc_ohc=s89Jfb07gaMAX_6-WDH&_nc_ht=scontent-bom1-2.xx&edm=AFuVL-cEAAAA&oh=00_AfCKhAuQ8hbJ5G38_IVLOZiKLmFEMtAZKGVQI2Fs9y9aDA&oe=6587140B',
//                     width: 1024,
//                   },
//                 },
//                 target: {
//                   id: '122106380246147908',
//                   url: 'https://airtestmeta933.workplace.com/photo.php?fbid=122106380246147908&set=gm.1064505874743614&type=3',
//                 },
//                 type: 'photo',
//                 url: 'https://airtestmeta933.workplace.com/photo.php?fbid=122106380246147908&set=gm.1064505874743614&type=3',
//               },
//             ],
//           },
//           message:
//             '# A test message - A test message - **A test message** - A test message - A test message - A test message - A test message - A test message - A test message',
//           from: { name: 'pranab', picture: { data: { url: '' } } },
//           permalink_url: '',
//           like_count: { summary: { total_count: 1 } },
//           comments: { summary: { total_count: 2 } },
//           diff_time: 120,
//           created_time: '01/01/2024',
//         },
//       ],
//     };
//     const mockConfig = [
//       {
//         functionId: 'common',
//         groupName: 'Air India Connect',
//         groupId: '452977286719386',
//         order: 1,
//       },
//       {
//         functionId: 'common',
//         groupName: 'Magic Carpet',
//         groupId: '738898157066043',
//         order: 2,
//       },
//       {
//         functionId: '12000015',
//         groupName: 'All Hands – Airport Operations',
//         groupId: '3203921536580800',
//         order: 3,
//       },
//       {
//         functionId: '12000001',
//         groupName: 'All Hands - Commercial',
//         groupId: '1148591319421748',
//         order: 3,
//       },
//       {
//         functionId: '12000014',
//         groupName: 'All Hands – Customer Experience',
//         groupId: '440257911711037',
//         order: 3,
//       },
//       {
//         functionId: '12000003',
//         groupName: 'All Hands – Digital and Technology',
//         groupId: '1143032289611307',
//         order: 3,
//       },
//       {
//         functionId: '12000004',
//         groupName: 'All Hands - Engineering',
//         groupId: '1212656606236774',
//         order: 3,
//       },
//       {
//         functionId: '12000005',
//         groupName: 'All Hands - Finance & MMD',
//         groupId: '848018866185119',
//         order: 3,
//       },
//       {
//         functionId: '12000006',
//         groupName: 'All Hands - Human Resources',
//         groupId: '593775605615347',
//         order: 3,
//       },
//       {
//         functionId: '12000007',
//         groupName: 'Aviators – Air India',
//         groupId: '1011778873276443',
//         order: 3,
//       },
//       {
//         functionId: '12000010',
//         groupName: 'All Hands – Integrated Operations Control Centre',
//         groupId: '463964342958142',
//         order: 3,
//       },
//       {
//         functionId: '12000009',
//         groupName: 'All Hands – Safety, Security & Quality',
//         groupId: '463964342958142',
//         order: 3,
//       },
//       {
//         functionId: '12000016',
//         groupName: 'All Hands – In Flight Services',
//         groupId: '776771640121228',
//         order: 3,
//       },
//       {
//         functionId: '12000013',
//         groupName: 'MCG – Air India Training Academy',
//         groupId: '1153751252289014',
//         order: 3,
//       },
//       {
//         functionId: '12000008',
//         groupName: 'All Hands – Governance, Risk and Compliance',
//         groupId: '7711305908908780',
//         order: 3,
//       },
//     ];
//     spyOn(commonService, 'getEmpDataStatus').and.returnValue(of(true));
//     spyOn(workplaceservice, 'getWorkplace').and.returnValue(of(mock));
//     spyOn(workplaceservice, 'getWorkplaceConfig').and.returnValue(
//       of(mockConfig),
//     );
//     component.functionId = '12000007';
//     component.ngOnInit();
//     tick(4000);
//     expect(component.groupIds.length).toBe(2);
//   }));
// });
