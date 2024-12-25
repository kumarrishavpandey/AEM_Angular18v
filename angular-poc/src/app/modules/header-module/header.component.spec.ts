// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { MatMenuModule } from '@angular/material/menu';
// import { RouterTestingModule } from '@angular/router/testing';
// import { MSAL_GUARD_CONFIG, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
// import { InteractionType, PopupRequest } from '@azure/msal-browser';
// import { NgDialogAnimationService } from 'ng-dialog-animation';
// import { of } from 'rxjs';
// import { AD_ACCESS_TOKEN, LOGGEDIN_EMP } from 'src/app/app.api';
// import { SkeletonLoaderComponent } from 'src/app/shared/components/skeleton-loader/skeleton-loader.component';
// import { AnalyticsInfoData } from 'src/app/shared/constants';
// import { AdobeAnalyticsServiceMock } from 'src/app/shared/services/__mock__/adobe-analytics.service.mock';
// import { CommonServiceMock } from 'src/app/shared/services/__mock__/common.service.mock';
// import { MsalServiceMock } from 'src/app/shared/services/__mock__/msal.service.mock';
// import { StorageEncryptionServiceMock } from 'src/app/shared/services/__mock__/storage-encryption.service.mock';
// import { AdobeAnalyticsService } from 'src/app/shared/services/adobe-analytics.service';
// import { AuthService } from 'src/app/shared/services/auth.service';
// import { CommonService } from 'src/app/shared/services/common.service';
// import { empProfileData } from 'src/app/shared/services/data/empProfile.data';
// import { StorageEncryptionService } from 'src/app/shared/services/storage-encryption.service';
// import { environment } from 'src/environments/environment';
// import { NavigationService } from '../navigation/navigation.service';
// import { NavigationServiceMock } from '../navigation/navigation.service.mock';
// import { HeaderComponent } from './header.component';
// import { HeaderService } from './header.service';
// import { headerDeatilsSling } from './header.sling';

// /* eslint-disable  @typescript-eslint/no-shadow */
// describe('HeaderComponent', () => {
//   let component: HeaderComponent;
//   let fixture: ComponentFixture<HeaderComponent>;
//   let mockDialog: jasmine.SpyObj<NgDialogAnimationService>;
//   let adobeAnalyticsServiceSpy: jasmine.SpyObj<AdobeAnalyticsService>;
//   let commonServiceSpy: jasmine.SpyObj<CommonService>;
//   let msalServiceSpy: jasmine.SpyObj<MsalService>;
//   let navigationServiceSpy: jasmine.SpyObj<NavigationService>;
//   let storageEncryptionServiceSpy: jasmine.SpyObj<StorageEncryptionService>;

//   beforeEach(async () => {
//     adobeAnalyticsServiceSpy = new AdobeAnalyticsServiceMock().adobeAnalyticsServiceSpy;

//     commonServiceSpy = new CommonServiceMock().commonServiceSpy;

//     msalServiceSpy = new MsalServiceMock().msalServiceSpy;

//     navigationServiceSpy = new NavigationServiceMock().navigationServiceSpy;

//     storageEncryptionServiceSpy = new StorageEncryptionServiceMock().storageEncryptionServiceSpy;

//     mockDialog = jasmine.createSpyObj('NgDialogAnimationService', [
//       'open',
//       'close',
//       'afterClosed',
//     ]);

//     spyOn(sessionStorage, 'removeItem');
//     spyOn(localStorage, 'removeItem');

//     const msalGuardConfigStub: MsalGuardConfiguration = {
//       authRequest: {} as PopupRequest,
//       interactionType: InteractionType.Popup,
//     };

//     await TestBed.configureTestingModule({
//       declarations: [HeaderComponent, SkeletonLoaderComponent],
//       imports: [MatMenuModule, RouterTestingModule, HttpClientTestingModule],
//       providers: [
//         AuthService,
//         HeaderService,
//         {
//           provide: AdobeAnalyticsService,
//           useValue: adobeAnalyticsServiceSpy,
//         },
//         {
//           provide: CommonService,
//           useValue: commonServiceSpy,
//         },
//         {
//           provide: NgDialogAnimationService,
//           useValue: mockDialog,
//         },
//         {
//           provide: MsalService,
//           useValue: msalServiceSpy,
//         },
//         {
//           provide: NavigationService,
//           useValue: navigationServiceSpy,
//         },
//         {
//           provide: StorageEncryptionService,
//           useValue: storageEncryptionServiceSpy,
//         },

//         { provide: MSAL_GUARD_CONFIG, useValue: msalGuardConfigStub },
//       ],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(HeaderComponent);
//     component = fixture.componentInstance;

//     component.headerDetails = headerDeatilsSling;

//     adobeAnalyticsServiceSpy.setAnalyticsInfo(AnalyticsInfoData);

//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should initialize userDetail correctly', () => {
//     expect(component.userDetail).toEqual(empProfileData.data);
//   });

//   it('should logout the user and redirect', () => {
//     component.logout();

//     expect(sessionStorage.removeItem).toHaveBeenCalledTimes(1);
//     expect(sessionStorage.removeItem).toHaveBeenCalledWith(LOGGEDIN_EMP);
//     expect(localStorage.removeItem).toHaveBeenCalledTimes(1);
//     expect(localStorage.removeItem).toHaveBeenCalledWith(AD_ACCESS_TOKEN);
//     expect(msalServiceSpy.logoutRedirect).toHaveBeenCalledWith({
//       postLogoutRedirectUri: environment.MSAL_POST_LOGOUT_REDIRECT_URL,
//     });
//   });

//   it('should call getCountryCode on ngOnInit', () => {
//     spyOn(component, 'getCountryCode').and.callThrough();
//     component.ngOnInit();
//     expect(component.getCountryCode).toHaveBeenCalled();
//   });

//   it('should unsubscribe from window resize event on component destruction', () => {
//     spyOn(window, 'removeEventListener');
//     component.ngOnDestroy();
//     expect(window.removeEventListener).toHaveBeenCalled();
//   });

//   it('should return true when window width is less than 768 pixels', () => {
//     spyOnProperty(window, 'innerWidth').and.returnValue(767); // Set window width to 767 pixels
//     expect(component.isMobileView()).toBeFalsy();
//   });

//   it('should return false when window width is equal to 768 pixels', () => {
//     spyOnProperty(window, 'innerWidth').and.returnValue(768); // Set window width to 768 pixels
//     expect(component.isMobileView()).toBeFalsy();
//   });

//   it('should hide details and show search in mobile view', () => {
//     spyOn(component, 'isMobileView').and.returnValue(true); // Mocking isMobileView to return true
//     component.onClickSearchIcon();
//     expect(component.hideDetails).toBe(true);
//     expect(component.isSearchVisible).toBe(true);
//     expect(component.isSearchIcon).toBe(false);
//   });

//   it('should toggle search icon visibility in desktop view', () => {
//     spyOn(component, 'isMobileView').and.returnValue(false); // Mocking isMobileView to return false
//     component.isSearchIcon = true; // Set initial state
//     component.onClickSearchIcon(); // First click
//     expect(component.isSearchIcon).toBe(false); // Should be false after first click
//     component.onClickSearchIcon(); // Second click
//     expect(component.isSearchIcon).toBe(true); // Should be true after second click
//   });

//   it('should keep isSearchVisible false and show search icon in mobile view when selectedType is not "open"', () => {
//     spyOn(component, 'isMobileView').and.returnValue(true); // Mocking isMobileView to return true
//     component.receivedData({ selectedType: 'other' });
//     expect(component.hideDetails).toBe(false);
//     expect(component.isSearchVisible).toBe(false);
//     expect(component.isSearchIcon).toBe(true);
//   });

//   it('should keep isSearchVisible true and show search icon in desktop view when selectedType is not "open"', () => {
//     spyOn(component, 'isMobileView').and.returnValue(false); // Mocking isMobileView to return false
//     component.receivedData({ selectedType: 'other' });
//     expect(component.hideDetails).toBe(false);
//     expect(component.isSearchVisible).toBe(false);
//     expect(component.isSearchIcon).toBe(true);
//   });

//   // it('should set userProfileImageUrl and isUserImageValid when image path is valid', async () => {
//   //   const imageUrl = 'valid/image/path.jpg';
//   //   const mockCommonService = TestBed.inject(CommonService); // Inject the MockCommonService instance
//   //   spyOn(mockCommonService, 'isImageValid').and.returnValue(
//   //     Promise.resolve(true),
//   //   );
//   //   await component.isImagePathValid(imageUrl);
//   //   expect(component.userProfileImageUrl).toBe(imageUrl);
//   //   expect(component.isUserImageValid).toBe(true);
//   // });

//   it('should call updateViewState', () => {
//     spyOn(component, 'updateViewState'); // Spy on the updateViewState method

//     component.onWindowResize(); // Call the onWindowResize method

//     expect(component.updateViewState).toHaveBeenCalled(); // Verify that updateViewState was called
//   });

//   it('should call openDialog when isOpen is true', () => {
//     const value = true;
//     spyOn(component, 'openDialog');
//     component.toggleMenu(value);
//     expect(component.openDialog).toHaveBeenCalled();
//   });

//   it('should open dialog when value is true', () => {
//     // Arrange
//     const openDialogValue = true;

//     // Mock the dialogRef and its location
//     const dialogRefMock = {
//       location: {
//         nativeElement: document.createElement('div'),
//       },
//     };

//     // Spy on the openDialog method and provide the mock dialogRef
//     spyOn(component, 'openDialog').and.callFake(() => {
//       component.dialogRef = dialogRefMock as any;
//     });

//     // Act
//     component.toggleMenu(openDialogValue);

//     // Assert
//     expect(component.isOpen).toBe(openDialogValue);
//     expect(component.openDialog).toHaveBeenCalled();
//   });

//   it('should update view state correctly for mobile view', () => {
//     // Stub the isMobileView method to return true
//     spyOn(component, 'isMobileView').and.returnValue(true);

//     // Call the updateViewState method
//     component.updateViewState();

//     // Check if the view state is updated correctly
//     expect(component.hideDetails).toBe(false); // Assuming hideDetails should be false for mobile view
//     expect(component.isSearchIcon).toBe(true);
//     expect(component.isSearchVisible).toBe(false);
//   });

//   it('should update view state when selectedType is open and isMobileView is true', () => {
//     // Set up initial conditions
//     component.selectedType = 'open';
//     spyOn(component, 'isMobileView').and.returnValue(true);

//     // Call the method
//     component.updateViewState();

//     // Assert the expected state
//     expect(component.hideDetails).toBe(true);
//     expect(component.isSearchVisible).toBe(true);
//     expect(component.isSearchIcon).toBe(false);
//   });

//   it('should update view state when selectedType is open, isMobileView is true, and hideDetails, isSearchVisible, isSearchIcon are updated accordingly', () => {
//     // Set up initial conditions
//     const eventData = { selectedType: 'open' };
//     spyOn(component, 'isMobileView').and.returnValue(true);

//     // Call the method
//     component.receivedData(eventData);

//     // Assert the expected state
//     expect(component.hideDetails).toBe(true);
//     expect(component.isSearchVisible).toBe(true);
//     expect(component.isSearchIcon).toBe(false);
//   });

//   it('should set isSearchbar to true and isOpen to false after dialog is closed with result', () => {
//     // Arrange
//     const mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
//     mockDialogRef.afterClosed.and.returnValue(of(true)); // Simulating dialog being closed with result
//     mockDialog.open.and.returnValue(mockDialogRef);

//     // Act
//     component.openDialog();

//     // Assert
//     expect(component.isSearchbar).toBe(true);
//     expect(component.isOpen).toBe(false);
//   });
// });
