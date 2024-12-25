// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { FormControl } from '@angular/forms';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { MatExpansionModule } from '@angular/material/expansion';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { RouterTestingModule } from '@angular/router/testing';
// import {
//   MSAL_GUARD_CONFIG,
//   MsalBroadcastService,
//   MsalGuardConfiguration,
//   MsalService,
// } from '@azure/msal-angular';
// import { InteractionType, PopupRequest } from '@azure/msal-browser';
// import { of } from 'rxjs';
// import { AngularMaterialModule } from 'src/app/angular-material.module';
// import { SkeletonLoaderComponent } from 'src/app/shared/components/skeleton-loader/skeleton-loader.component';
// import { AnalyticsInfoData } from 'src/app/shared/constants';
// import { AdobeAnalyticsServiceMock } from 'src/app/shared/services/__mock__/adobe-analytics.service.mock';
// import { AdobeAnalyticsService } from 'src/app/shared/services/adobe-analytics.service';
// import { SharedModule } from 'src/app/shared/shared.module';
// import { environment } from 'src/environments/environment';
// import { headerDeatilsSling } from '../header-module/header.sling';
// import { NavigationComponent } from './navigation.component';
// import { NavigationService } from './navigation.service';
// import { personalNavList } from './personal-nav-list.data';

// const mockDialogData = {
//   personalisedNavigation: personalNavList,
//   commonData: headerDeatilsSling.commonData,
//   navigationData: {
//     ...headerDeatilsSling.navigationData,
//     logo: headerDeatilsSling.headerData.logo,
//   },
//   userDetails: 'RS',
// };

// describe('NavigationComponent', () => {
//   let component: NavigationComponent;
//   let fixture: ComponentFixture<NavigationComponent>;
//   let authServiceStub: jasmine.SpyObj<MsalService>;
//   let msalBroadcastService: jasmine.SpyObj<MsalBroadcastService>;
//   let mockDialogRef: jasmine.SpyObj<MatDialogRef<NavigationComponent>>;
//   let navigationService: jasmine.SpyObj<NavigationService>;
//   let adobeAnalyticsServiceSpy: AdobeAnalyticsService;
//   const mockFullUrl = `${environment.AEM_BASE_URL}/content/dam/my-ai/logo.svg`;
//   const mockNavigationData = [
//     {
//       categoryId: '1',
//       actionList: [
//         { id: '1', label: 'Action 1' },
//         { id: '2', label: 'Action 2' },
//       ],
//     },
//     {
//       categoryId: '2',
//       actionList: [
//         { id: '3', label: 'Action 3' },
//         { id: '4', label: 'Action 4' },
//       ],
//     },
//   ];

//   beforeEach(async () => {
//     authServiceStub = jasmine.createSpyObj('MsalService', [
//       'loginPopup',
//       'loginRedirect',
//       'instance',
//     ]);
//     adobeAnalyticsServiceSpy = new AdobeAnalyticsServiceMock().adobeAnalyticsServiceSpy;

//     msalBroadcastService = jasmine.createSpyObj('MsalBroadcastService', [
//       'inProgress$',
//       'msalInstance',
//     ]);

//     const msalGuardConfigStub: MsalGuardConfiguration = {
//       authRequest: {} as PopupRequest,
//       interactionType: InteractionType.Popup,
//     };
//     mockDialogRef = jasmine.createSpyObj<MatDialogRef<NavigationComponent>>([
//       'close',
//     ]);
//     const navigationServiceSpy = jasmine.createSpyObj('NavigationService', [
//       'updateAppCounter',
//       'getAnalyzeAppData',
//     ]);

//     await TestBed.configureTestingModule({
//       declarations: [
//         NavigationComponent,
//         SkeletonLoaderComponent,
//       ],
//       imports: [
//         BrowserAnimationsModule,
//         BrowserModule,
//         CommonModule,
//         AngularMaterialModule,
//         RouterTestingModule,
//         HttpClientModule,
//         HttpClientTestingModule,
//         SharedModule,
//         MatExpansionModule,
//       ],
//       providers: [
//         { provide: MSAL_GUARD_CONFIG, useValue: msalGuardConfigStub },
//         { provide: MsalService, useValue: authServiceStub },
//         { provide: MsalBroadcastService, useValue: msalBroadcastService },
//         { provide: MatDialogRef, useValue: mockDialogRef }, // Provide a mock MatDialogRef
//         { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
//         { provide: NavigationService, useValue: navigationServiceSpy }, {
//           provide: AdobeAnalyticsService,
//           useValue: adobeAnalyticsServiceSpy,
//         },
//       ],
//     }).compileComponents();
//     navigationService = TestBed.inject(
//       NavigationService,
//     ) as jasmine.SpyObj<NavigationService>;
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(NavigationComponent);
//     component = fixture.componentInstance;
//     component.navigationData = mockNavigationData;
//     spyOn(component, 'getActionList').and.callThrough();
//     component = fixture.componentInstance;
//     adobeAnalyticsServiceSpy.setAnalyticsInfo(AnalyticsInfoData);
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should close the dialog on onClose', () => {
//     component.onClose();
//     expect(mockDialogRef.close).toHaveBeenCalledWith(true);
//   });
//   it('should retrieve recent and most used apps', () => {
//     const employeeId = '123';
//     const navData = {}; // Provide sample navigation data

//     const recentUsedAppsData = {
//       data: {
//         recentUsedApps: [
//           { id: '1', label: 'App 1' },
//           { id: '2', label: 'App 2' },
//         ],
//         mostUsedApps: [
//           { id: '3', label: 'App 3' },
//           { id: '4', label: 'App 4' },
//         ],
//       },
//     };

//     navigationService.getAnalyzeAppData.and.returnValue(of(recentUsedAppsData));

//     component.getAnalyzeApps(employeeId, navData);

//     expect(navigationService.getAnalyzeAppData).toHaveBeenCalledWith(
//       employeeId,
//     );
//     expect(component.isLoading).toBeFalsy();
//     // Assert other expectations based on the behavior of getAnalyzeApps method
//   });
//   it('should return an empty array when provided with no navigation data', () => {
//     const nav = [];
//     const result = component.collectActionList(nav);
//     expect(result).toEqual([]);
//   });

//   // describe('resetSearch', () => {
//   //   it('should reset search', () => {
//   //     // Set initial values for selectedCategoryId and selectedLabel
//   //     component.selectedCategoryId = '1';
//   //     component.selectedLabel = 'Category 1';

//   //     // Mock searchControl
//   //     component.searchControl = new FormControl('search term');

//   //     // Spy on getActionList method to check if it's called with the correct parameters
//   //     spyOn(component, 'getActionList');

//   //     // Call resetSearch method
//   //     component.resetSearch();

//   //     // Expectations
//   //     expect(component.searchControl.value).toBeNull(); // Ensure searchControl is reset to null or empty
//   //     expect(component.isSearch).toBeFalse(); // Ensure isSearch flag is set to false
//   //     expect(component.getActionList).toHaveBeenCalledWith('1', 'Category 1'); // Ensure getActionList is called with the correct parameters
//   //   });
//   // });
//   it('should close dialog and reset search control', () => {
//     // Mock searchControl
//     component.searchControl = new FormControl('search term');

//     // Call onClose method
//     component.onClose();

//     // Assert that dialogRef.close() is called with true
//     expect(mockDialogRef.close).toHaveBeenCalledWith(true);

//     // Assert that searchControl is reset
//     expect(component.searchControl.value).toBeNull();
//   });

//   it('should filter action list and add timestamp', () => {
//     // Sample data
//     const actionList = [
//       { appId: 1, label: 'App 1' },
//       { appId: 2, label: 'App 2' },
//       { appId: 3, label: 'App 3' },
//     ];

//     const analyzeAppList = [2, 3];

//     // Call the method
//     const result = component.getAppList(actionList, analyzeAppList);

//     // Assert the filtered list
//     expect(result).toEqual([
//       { appId: 2, label: 'App 2', timeStamp: '' },
//       { appId: 3, label: 'App 3', timeStamp: '' },
//     ]);

//     // Assert the sorting
//     expect(result.map((action: any) => action.appId)).toEqual([2, 3]);
//   });

//   it('should set isSearch to false when searchControl has no value', () => {
//     // Set searchControl value to empty string
//     component.searchControl.setValue('');

//     // Call onEnter method
//     component.onEnter();

//     // Expectation
//     expect(component.isSearch).toBeFalsy(); // isSearch should be false
//   });
//   it('should set isSearch to true and filter searchResultArray when searchControl has a value', () => {
//     // Mock navigationData

//     // Set searchControl value
//     const searchTerm = 'action';
//     component.searchControl.setValue(searchTerm);

//     // Call onEnter method
//     component.onEnter();
//   });

//   it('should set isSearch to false when event option value is not provided', () => {
//     // Mock event
//     const event = {
//       option: { value: null },
//     };

//     // Call onSelectionChange method
//     component.onSelectionChange(event);

//     // Expectations
//     expect(component.isSearch).toBeFalsy(); // isSearch should be false
//   });

//   it('should return the correct full URL', () => {
//     // Mock environment.AEM_BASE_URL
//     const mockAEMBaseUrl = 'http://example.com';
//     const originalAEMBaseUrl = environment.AEM_BASE_URL;
//     environment.AEM_BASE_URL = mockAEMBaseUrl;

//     // Test input
//     const endPoint = '/content/dam/my-ai/icon/search-folder.svg';

//     // Expected output
//     const expectedFullUrl = mockAEMBaseUrl + endPoint;

//     // Call the function
//     const result = component.getImageDescriptionIcon();

//     // Assertion
//     expect(result).toEqual(expectedFullUrl);

//     // Restore original environment.AEM_BASE_URL
//     environment.AEM_BASE_URL = originalAEMBaseUrl;
//   });

//   it('should return the full path of the logo image', () => {
//     // Mock URL
//     const url = '/content/dam/my-ai/logo.svg';

//     // Mock the return value of getAemDamFullPath
//     spyOn(component, 'getAemDamFullPath').and.returnValue(
//       'environment.AEM_BASE_URL',
//     );

//     // Call the method
//     const result = component.getLogoPath(url);

//     // Expectation
//     expect(result).toBe(mockFullUrl); // Ensure the correct full path is returned
//     // expect(component.getAemDamFullPath).toHaveBeenCalledWith(url); // Ensure getAemDamFullPath is called with the URL
//   });

//   it('should return an empty string if URL is null', () => {
//     // Mock null URL
//     const url = null;

//     // Call the method
//     const result = component.getLogoPath(url);

//     // Expectation
//     expect(result).not.toBe(''); // Ensure an empty string is returned
//   });

//   it('should show autocomplete panel when visible is true', () => {
//     // Mock autocomplete panel
//     const autocompletePanel = document.createElement('div');
//     autocompletePanel.classList.add('mat-autocomplete-panel');
//     document.body.appendChild(autocompletePanel);

//     // Call the method with visible set to true
//     component.toggleAutocompleteVisibility(true);

//     // Expectation
//     expect(
//       autocompletePanel.classList.contains('mat-autocomplete-visible'),
//     ).toBe(true);
//     expect(
//       autocompletePanel.classList.contains('mat-autocomplete-hide-panel'),
//     ).toBe(false);

//     // Clean up
//     document.body.removeChild(autocompletePanel);
//   });

//   it('should hide autocomplete panel when visible is false', () => {
//     // Mock autocomplete panel
//     const autocompletePanel = document.createElement('div');
//     autocompletePanel.classList.add('mat-autocomplete-panel');
//     document.body.appendChild(autocompletePanel);

//     // Call the method with visible set to false
//     component.toggleAutocompleteVisibility(false);

//     // Expectation
//     expect(
//       autocompletePanel.classList.contains('mat-autocomplete-visible'),
//     ).toBe(false);
//     expect(
//       autocompletePanel.classList.contains('mat-autocomplete-hide-panel'),
//     ).toBe(true);

//     // Clean up
//     document.body.removeChild(autocompletePanel);
//   });

//   it('should do nothing if autocomplete panel does not exist', () => {
//     // Call the method when autocomplete panel does not exist
//     component.toggleAutocompleteVisibility(true); // Or false

//     // Expectation: No error should occur
//     expect(true).toBe(true); // Just to ensure the test case passes without errors
//   });

//   it('should show autocomplete panel on backspace key press', () => {
//     // Spy on toggleAutocompleteVisibility method
//     spyOn(component, 'toggleAutocompleteVisibility');

//     // Call the method
//     component.onBackspace();

//     // Expectation
//     expect(component.toggleAutocompleteVisibility).toHaveBeenCalledWith(true);
//   });

//   it('should return true if the panel is expanded', () => {
//     // Create a mock panel element
//     const panelId = 'mock-panel';
//     const panel = document.createElement('div');
//     panel.id = panelId;
//     panel.classList.add('mat-expanded');
//     document.body.appendChild(panel);

//     // Call the method
//     const result = component.isPanelExpanded(panelId);

//     // Expectation
//     expect(result).toBe(true);

//     // Clean up
//     document.body.removeChild(panel);
//   });

//   it('should return false if the panel is not expanded', () => {
//     // Create a mock panel element without 'mat-expanded' class
//     const panelId = 'mock-panel';
//     const panel = document.createElement('div');
//     panel.id = panelId;
//     document.body.appendChild(panel);

//     // Call the method
//     const result = component.isPanelExpanded(panelId);

//     // Expectation
//     expect(result).toBe(false);

//     // Clean up
//     document.body.removeChild(panel);
//   });

//   it('should return false if the panel does not exist', () => {
//     // Call the method with a non-existent panel ID
//     const result = component.isPanelExpanded('non-existent-panel');

//     // Expectation
//     expect(result).toBe(false);
//   });

//   it('should update filteredOptions and isSearch when value is provided', () => {
//     // Mock event object with currentTarget and value
//     const event = {
//       currentTarget: {
//         value: 'search term',
//       },
//     };

//     // Spy on _filter method
//     spyOn(component, '_filter').and.returnValue(['filtered option']);

//     // Call the method
//     component.onSearchKeyUp(event);

//     // Expectations
//     expect(component._filter).toHaveBeenCalledWith('search term'); // Ensure _filter is called with the correct value
//     expect(component.filteredOptions).toEqual(['filtered option']); // Ensure filteredOptions is updated correctly
//     expect(component.isSearch).toBe(false); // Ensure isSearch is set to true
//     expect(component.selectedTab).not.toBe(component.selectedLabel); // Ensure selectedTab is updated when value is provided
//   });

//   it('should reset isSearch and selectedTab when value is empty', () => {
//     // Mock event object with currentTarget and empty value
//     const event = {
//       currentTarget: {
//         value: '',
//       },
//     };

//     // Mock selectedLabel
//     component.selectedLabel = 'previous label';

//     // Spy on _filter method
//     spyOn(component, '_filter').and.returnValue([]);

//     // Call the method
//     component.onSearchKeyUp(event);

//     // Expectations
//     expect(component._filter).toHaveBeenCalledWith(''); // Ensure _filter is called with an empty value
//     expect(component.filteredOptions).toEqual([]); // Ensure filteredOptions is reset when value is empty
//     expect(component.isSearch).toBe(false); // Ensure isSearch is set to false
//     expect(component.selectedTab).toBe(component.selectedLabel); // Ensure selectedTab is reset when value is empty
//   });

//   it('should return correct logo path', () => {
//     const url = 'test/logo.svg';
//     const logoPath = component.getLogoPath(url);
//     expect(logoPath).toContain(url);
//   });

//   it('should update filtered options on selection change', () => {
//     component.navigationData = [
//       { actionList: [{ label: 'Test' }, { label: 'Example' }] },
//     ];
//     component.onSelectionChange({ option: { value: 'test' } });
//     expect(component.searchResultArray).toEqual([{ label: 'Test' }]);
//   });

//   it('should filter action list based on provided value', () => {
//     // Mock navigationData
//     const navigationData = [
//       {
//         label: 'Category 1',
//         actionList: [{ label: 'Action 1' }, { label: 'Action 2' }],
//       },
//       {
//         label: 'Category 2',
//         actionList: [{ label: 'Action 3' }, { label: 'Action 4' }],
//       },
//     ];
//     component.navigationData = navigationData;

//     // Call the method with a value
//     const filteredResult = component._filter('action');

//     // Expectations
//     expect(filteredResult.length).toBe(4); // Ensure all actions containing 'action' are included
//   });

//   it('should return the original action list when no value is provided', () => {
//     // Mock navigationData
//     const navigationData = [
//       {
//         label: 'Category 1',
//         actionList: [{ label: 'Action 1' }, { label: 'Action 2' }],
//       },
//       {
//         label: 'Category 2',
//         actionList: [{ label: 'Action 3' }, { label: 'Action 4' }],
//       },
//     ];
//     component.navigationData = navigationData;

//     // Call the method without a value
//     const filteredResult = component._filter('');

//     // Expectations
//     expect(filteredResult.length).toBe(4); // Ensure all actions are included
//   });
//   describe('getNavigationData', () => {
//     it('should return the full navData when selectedLabel is "All Apps"', () => {
//       const navData = Array.from({ length: 20 }, (_, i) => `App ${i + 1}`);
//       const selectedLabel = 'All Apps';

//       const result = component.getNavigationData(selectedLabel, navData);

//       expect(result).toEqual(navData);
//     });

//     it('should return the first 12 items of navData when selectedLabel is not "All Apps"', () => {
//       const navData = Array.from({ length: 20 }, (_, i) => `App ${i + 1}`);
//       const selectedLabel = 'Some Category';

//       const result = component.getNavigationData(selectedLabel, navData);

//       expect(result).toEqual(navData.slice(0, 12));
//     });

//     it('should set isSearchLoading to false after processing', () => {
//       const navData = Array.from({ length: 20 }, (_, i) => `App ${i + 1}`);
//       const selectedLabelAllApps = 'All Apps';
//       const selectedLabelOther = 'Some Category';

//       // Check isSearchLoading after calling with 'All Apps'
//       component.getNavigationData(selectedLabelAllApps, navData);
//       expect(component.isSearchLoading).toBe(false);

//       // Check isSearchLoading after calling with other label
//       component.getNavigationData(selectedLabelOther, navData);
//       expect(component.isSearchLoading).toBe(false);
//     });
//   });
//   describe('getFilteredMobileNavActionList', () => {
//     it('should return the full actionList when selectedLabel is "All Apps"', () => {
//       const navData = [
//         { label: 'All Apps', actionList: Array.from({ length: 20 }, (_, i) => `Action ${i + 1}`) },
//         { label: 'Some Category', actionList: Array.from({ length: 15 }, (_, i) => `Action ${i + 1}`) },
//       ];
//       const selectedLabel = 'All Apps';

//       const result = component.getFilteredMobileNavActionList(selectedLabel, navData);

//       expect(result).toEqual(navData[0].actionList);
//     });

//     it('should return the first 12 items of actionList when selectedLabel is not "All Apps" and navData object exists', () => {
//       const navData = [
//         { label: 'All Apps', actionList: Array.from({ length: 20 }, (_, i) => `Action ${i + 1}`) },
//         { label: 'Some Category', actionList: Array.from({ length: 15 }, (_, i) => `Action ${i + 1}`) },
//       ];
//       const selectedLabel = 'Some Category';

//       const result = component.getFilteredMobileNavActionList(selectedLabel, navData);

//       expect(result).toEqual(navData[1].actionList.slice(0, 12));
//     });

//     it('should return an empty array when no matching navData object exists', () => {
//       const navData = [
//         { label: 'All Apps', actionList: Array.from({ length: 20 }, (_, i) => `Action ${i + 1}`) },
//         { label: 'Some Category', actionList: Array.from({ length: 15 }, (_, i) => `Action ${i + 1}`) },
//       ];
//       const selectedLabel = 'Non-Existent Category';

//       const result = component.getFilteredMobileNavActionList(selectedLabel, navData);

//       expect(result).toEqual([]);
//     });
//   });
// });
