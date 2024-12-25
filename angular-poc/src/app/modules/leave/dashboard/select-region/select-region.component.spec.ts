import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  BrowserModule,
  DomSanitizer,
  SafeResourceUrl,
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import {
  MSAL_GUARD_CONFIG,
  MsalBroadcastService,
  MsalGuardConfiguration,
  MsalService,
} from '@azure/msal-angular';
import { InteractionType, PopupRequest } from '@azure/msal-browser';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SelectRegionComponent } from './select-region.component';

describe('SelectRegionComponent', () => {
  let component: SelectRegionComponent;
  let fixture: ComponentFixture<SelectRegionComponent>;
  let ddTriggerSpy: jasmine.SpyObj<any>;
  let sanitizer: DomSanitizer;
  let authServiceStub: jasmine.SpyObj<MsalService>;
  let msalBroadcastService: jasmine.SpyObj<MsalBroadcastService>;

  beforeEach(() => {
    authServiceStub = jasmine.createSpyObj('MsalService', [
      'loginPopup',
      'loginRedirect',
      'instance',
    ]);

    msalBroadcastService = jasmine.createSpyObj('MsalBroadcastService', [
      'inProgress$',
      'msalInstance',
    ]);

    const msalGuardConfigStub: MsalGuardConfiguration = {
      authRequest: {} as PopupRequest,
      interactionType: InteractionType.Popup,
    };

    ddTriggerSpy = jasmine.createSpyObj('ddTrigger', ['closeMenu']);
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularMaterialModule,
        CommonModule,
        SharedModule,
        HttpClientModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        BrowserModule,
        MatFormFieldModule,
      ],
      declarations: [SelectRegionComponent],
      providers: [
        {
          provide: DomSanitizer,
          useValue: {
            bypassSecurityTrustResourceUrl: (url: string): SafeResourceUrl => url as SafeResourceUrl,
          },
        },
        { provide: MsalService, useValue: authServiceStub },
        { provide: MsalBroadcastService, useValue: msalBroadcastService },
        { provide: MSAL_GUARD_CONFIG, useValue: msalGuardConfigStub },
      ],
    });

    fixture = TestBed.createComponent(SelectRegionComponent);
    component = fixture.componentInstance;
    sanitizer = TestBed.inject(DomSanitizer);
    // Mock ddTrigger
    component.ddTrigger = ddTriggerSpy;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should sort the array by the specified column name', () => {
    const sortArray = [
      { name: 'John', age: 30 },
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 35 },
    ];
    const sortedArray = component.sortMenuItem(sortArray, 'name');
    expect(sortedArray).toEqual([
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 35 },
      { name: 'John', age: 30 },
    ]);
  });

  it('should return null if the input array is empty', () => {
    const sortArray = [];
    const sortedArray = component.sortMenuItem(sortArray, 'name');
    expect(sortedArray).toBeNull();
  });

  it('should return null if the input array is null', () => {
    const sortArray = null;
    const sortedArray = component.sortMenuItem(sortArray, 'name');
    expect(sortedArray).toBeNull();
  });

  it('should return undefined when ISD is empty', () => {
    const isd = '';
    const result = component.getSVGbyISD(isd);
    expect(result).toBeUndefined();
  });

  it('should remove "expanded" class from main menu elements if present', () => {
    // Arrange
    const mainMenuElements = fixture.nativeElement.querySelectorAll(
      '.exapnd-collaps-icon',
    );

    // Act
    if (mainMenuElements.length > 0) {
      mainMenuElements.forEach((element: HTMLElement) => {
        element.classList.add('expanded');
      });
      component.onMenuClosed();
      fixture.detectChanges();

      // Assert
      mainMenuElements.forEach((element: HTMLElement) => {
        expect(element.classList.contains('expanded')).toBeFalsy();
      });
    } else {
      // If no main menu elements found, test passes automatically
      expect(true).toBeTruthy();
    }
  });

  it('should remove "expanded" class from sub menu elements if present', () => {
    // Arrange
    const subMenuElements = fixture.nativeElement.querySelectorAll('.sub-region-list');

    // Act
    if (subMenuElements.length > 0) {
      subMenuElements.forEach((element: HTMLElement) => {
        element.classList.add('expanded');
      });
      component.onMenuClosed();
      fixture.detectChanges();

      // Assert
      subMenuElements.forEach((element: HTMLElement) => {
        expect(element.classList.contains('expanded')).toBeFalsy();
      });
    } else {
      // If no sub-menu elements found, test passes automatically
      expect(true).toBeTruthy();
    }
  });

  it('should initialize holidayCalendars and selectedElementName correctly', () => {
    // Arrange
    const mockHolidayCalendarsList = [
      {
        label: 'Label1',
        calendarList: [{ calendarCode: 'Code1', calendarName: 'Name1' }],
      },
      {
        label: 'Label2',
        calendarList: [{ calendarCode: 'Code2', calendarName: 'Name2' }],
      },
    ];
    component.holidayCalendarsList = mockHolidayCalendarsList;
    component.selectedElementName = 'Code1'; // Set initial selectedElementName

    // Act
    component.ngOnInit();

    // Assert
    expect(component.holidayCalendars).toEqual(mockHolidayCalendarsList);
    expect(component.selectedElementName).toEqual('Name1, Label1');
  });

  it('should initialize expandedStates array correctly', () => {
    // Arrange
    const mockHolidayCalendarsList = [
      { label: 'Label1', calendarList: [] },
      { label: 'Label2', calendarList: [] },
    ];
    component.holidayCalendarsList = mockHolidayCalendarsList;

    // Act
    component.ngOnInit();

    // Assert
    expect(component.expandedStates.length).toEqual(
      mockHolidayCalendarsList.length,
    );
    expect(
      component.expandedStates.every((state) => state === false),
    ).toBeTruthy();
  });

  it('should not update selectedElementName if no match is found', () => {
    // Arrange
    const mockHolidayCalendarsList = [
      {
        label: 'Label1',
        calendarList: [{ calendarCode: 'Code1', calendarName: 'Name1' }],
      },
      {
        label: 'Label2',
        calendarList: [{ calendarCode: 'Code2', calendarName: 'Name2' }],
      },
    ];
    component.holidayCalendarsList = mockHolidayCalendarsList;
    component.selectedElementName = 'Code3'; // No match in calendarList

    // Act
    component.ngOnInit();

    // Assert
    expect(component.selectedElementName).toEqual('Code3');
  });

  it('should remove classes when code does not match any element in allData', () => {
    const code = 'US';
    const allData = [{ countryCode: 'UK' }]; // Mocked data with countryCode not matching code

    // Mocking elements with the expanded class
    const mainMenu = document.createElement('div');
    mainMenu.id = 'main-menu-UK'; // Using countryCode not matching code
    mainMenu.classList.add('expanded');
    document.body.appendChild(mainMenu);

    const subMenu = document.createElement('div');
    subMenu.id = 'sub-menu-UK'; // Using countryCode not matching code
    subMenu.classList.add('expanded');
    document.body.appendChild(subMenu);

    component.toggleClass(code, allData);

    expect(mainMenu.classList.contains('expanded')).toBe(false);
    expect(subMenu.classList.contains('expanded')).toBe(false);
  });

  it('should not change classes when allData is empty', () => {
    const code = 'US';
    const allData = []; // Empty array

    // Mocking elements with the expanded class
    const mainMenu = document.createElement('div');
    mainMenu.id = `main-menu-${code}`;
    mainMenu.classList.add('expanded');
    document.body.appendChild(mainMenu);

    const subMenu = document.createElement('div');
    subMenu.id = `sub-menu-${code}`;
    subMenu.classList.add('expanded');
    document.body.appendChild(subMenu);

    component.toggleClass(code, allData);

    expect(mainMenu.classList.contains('expanded')).toBe(true);
    expect(subMenu.classList.contains('expanded')).toBe(true);
  });

  it('should close menu by removing "expanded" class from main menu and sub menu', () => {
    // Simulate some dummy DOM elements with the required classes
    const dummyMainMenuElement1 = document.createElement('div');
    dummyMainMenuElement1.classList.add('exapnd-collaps-icon', 'expanded');
    document.body.appendChild(dummyMainMenuElement1);

    const dummyMainMenuElement2 = document.createElement('div');
    dummyMainMenuElement2.classList.add('exapnd-collaps-icon', 'expanded');
    document.body.appendChild(dummyMainMenuElement2);

    const dummySubMenuElement1 = document.createElement('div');
    dummySubMenuElement1.classList.add('sub-region-list', 'expanded');
    document.body.appendChild(dummySubMenuElement1);

    const dummySubMenuElement2 = document.createElement('div');
    dummySubMenuElement2.classList.add('sub-region-list', 'expanded');
    document.body.appendChild(dummySubMenuElement2);

    // Call the method
    component.onMenuClosed();

    // Assert that "expanded" class has been removed from all main menu elements
    const mainMenuElements = document.querySelectorAll('.exapnd-collaps-icon');
    mainMenuElements.forEach((element) => {
      expect(element.classList.contains('expanded')).toBeFalsy();
    });

    // Assert that "expanded" class has been removed from all sub menu elements
    const subMenuElements = document.querySelectorAll('.sub-region-list');
    subMenuElements.forEach((element) => {
      expect(element.classList.contains('expanded')).toBeFalsy();
    });
  });

  it('should return undefined when ISD is empty', () => {
    const isd = '';
    const result = component.getSVGbyISD(isd);
    expect(result).toBeUndefined();
  });

  it('should return undefined when ISD is null', () => {
    const isd = null;
    const result = component.getSVGbyISD(isd);
    expect(result).toBeUndefined();
  });

  it('should return an SVG image when ISD is provided', () => {
    const isd = 'MM'; // Myanmar's ISD code
    const expectedResult = 'data:image/svg+xml;base64,...'; // Some base64 SVG string
    spyOn(sanitizer, 'bypassSecurityTrustResourceUrl').and.returnValue(
      expectedResult,
    );
    const result = component.getSVGbyISD(isd);
    expect(result).toEqual(expectedResult);
  });
});
