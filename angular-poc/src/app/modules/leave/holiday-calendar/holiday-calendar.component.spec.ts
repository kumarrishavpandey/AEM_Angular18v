import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabGroup } from '@angular/material/tabs';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import {
  MSAL_GUARD_CONFIG,
  MsalBroadcastService,
  MsalGuardConfiguration,
  MsalService,
} from '@azure/msal-angular';
import { InteractionType, PopupRequest } from '@azure/msal-browser';
import { of } from 'rxjs';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { TitleComponent } from 'src/app/shared/components/title/title.component';
import { CommonService } from 'src/app/shared/services/common.service';
import { DebugService } from 'src/app/shared/services/debug.service';
import { DebugServiceMock } from 'src/app/shared/services/debug.service.mock';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DashboardService } from '../services/dashboard.service';
import { HolidayCalendarComponent } from './holiday-calendar.component';

describe('HolidayCalendarComponent', () => {
  let component: HolidayCalendarComponent;
  let fixture: ComponentFixture<HolidayCalendarComponent>;
  let dashboardService: DashboardService;
  let authServiceStub: jasmine.SpyObj<MsalService>;
  let msalBroadcastService: jasmine.SpyObj<MsalBroadcastService>;
  let commonService: CommonService;
  let tabGroup: MatTabGroup;
  let debugServiceSpy: jasmine.SpyObj<DebugService>;

  beforeEach(async () => {
    debugServiceSpy = new DebugServiceMock().debugServiceSpy;

    await TestBed.configureTestingModule({
      declarations: [HolidayCalendarComponent],
    }).compileComponents();
  });

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
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        TitleComponent,
      ],
      imports: [
        SharedModule,
        AngularMaterialModule,
        HttpClientModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
      ],
      providers: [
        DashboardService,
        CommonService,
        { provide: MsalService, useValue: authServiceStub },
        { provide: MsalBroadcastService, useValue: msalBroadcastService },
        { provide: MSAL_GUARD_CONFIG, useValue: msalGuardConfigStub },
        { provide: ElementRef, useValue: {} },
        { provide: ChangeDetectorRef, useValue: {} },
        {
          provide: DebugService,
          useValue: debugServiceSpy,
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(HolidayCalendarComponent);
    component = fixture.componentInstance;
    dashboardService = TestBed.inject(DashboardService);
    commonService = TestBed.inject(CommonService);
    tabGroup = fixture.debugElement.nativeElement.querySelector('mat-tab-group');

    tabGroup.selectedIndex = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update selectedElementName and selectedCalendarCode when el has subItem', () => {
    const el = {
      item: 'Region',
      subItem: 'SubRegion',
      code: '123',
      subItemCode: '456',
    };

    component.updateDashboardSelectedRegion(el);

    expect(component.selectedElementName).toEqual('SubRegion, Region');
    expect(component.selectedCalendarCode).toEqual('456');
  });

  it('should update selectedElementName and selectedCalendarCode when el has no subItem', () => {
    const el = {
      item: 'Region',
      code: '123',
    };

    component.updateDashboardSelectedRegion(el);

    expect(component.selectedElementName).toEqual('Region');
    expect(component.selectedCalendarCode).toEqual('123');
  });

  it('should call getLeaveAndHolidayList after updating selectedElementName and selectedCalendarCode', () => {
    const el = {
      item: 'Region',
      code: '123',
    };
    const getLeaveAndHolidayListSpy = spyOn(
      component,
      'getLeaveAndHolidayList',
    );

    component.updateDashboardSelectedRegion(el);

    expect(getLeaveAndHolidayListSpy).toHaveBeenCalled();
  });

  it('should update selectedElementName and selectedCalendarCode when el has subItem', () => {
    const el = {
      item: 'Region',
      subItem: 'SubRegion',
      code: '123',
      subItemCode: '456',
    };

    component.updateDashboardSelectedRegion(el);

    expect(component.selectedElementName).toEqual('SubRegion, Region');
    expect(component.selectedCalendarCode).toEqual('456');
  });

  it('should update selectedElementName and selectedCalendarCode when el has no subItem', () => {
    const el = {
      item: 'Region',
      code: '123',
    };

    component.updateDashboardSelectedRegion(el);

    expect(component.selectedElementName).toEqual('Region');
    expect(component.selectedCalendarCode).toEqual('123');
  });

  it('should call getLeaveAndHolidayList after updating selectedElementName and selectedCalendarCode', () => {
    const el = {
      item: 'Region',
      code: '123',
    };
    const getLeaveAndHolidayListSpy = spyOn(
      component,
      'getLeaveAndHolidayList',
    );

    component.updateDashboardSelectedRegion(el);

    expect(getLeaveAndHolidayListSpy).toHaveBeenCalled();
  });

  it('should populate upcomingHolidayLeaves array', () => {
    const mockResponse = {
      data: {
        upcomingHolidayLeavesCalendarView: [
          { holidayName: 'New Year', date: '2024-01-01' },
        ],
      },
    };
    const regionCode = 'IN-1001';

    // Mock the response of getEmployeeDashboardLeaveList
    spyOn(dashboardService, 'getEmployeeDashboardLeaveList').and.returnValue(
      of(mockResponse),
    );

    // Set the selectedRegionCode
    component.selectedCalendarCode = regionCode;

    // Call the method under test
    component.getLeaveAndHolidayList();

    // Assert that the service method was called with the correct region code
    expect(dashboardService.getEmployeeDashboardLeaveList).toHaveBeenCalledWith(
      regionCode,
    );

    // Assert that upcomingHolidayLeaves array is populated correctly
    expect(component.upcomingHolidayLeaves.length).toBe(1);
    expect(component.upcomingHolidayLeaves[0].holidayName).toBe('New Year');
    expect(component.upcomingHolidayLeaves[0].date).toBe('2024-01-01');
  });

  it('should open the second tab when openTab() is called', () => {
    // Call the method to open the second tab
    component.openTab();

    // After calling openTab(), selectedIndex should be 1 (second tab)
    expect(tabGroup.selectedIndex).toBe(1);
  });

  it('should return label corresponding to external code in picklist', () => {
    const picklist = [
      {
        picklistId: 'somePicklistId',
        Picklist: [
          { externalCode: 'code1', label: 'Label1' },
          { externalCode: 'code2', label: 'Label2' },
        ],
      },
    ];

    // Set picklist data in the component
    component.picklist = picklist;

    // Call the method with picklistId and externalCode
    const label = component.getLabelFromExternalCode('somePicklistId', 'code1');

    // Expect the method to return the correct label
    expect(label).toEqual('Label1');
  });

  it('should return undefined if picklistId is not found', () => {
    const picklist = [
      {
        picklistId: 'somePicklistId',
        Picklist: [
          { externalCode: 'code1', label: 'Label1' },
          { externalCode: 'code2', label: 'Label2' },
        ],
      },
    ];

    component.picklist = picklist;

    // Call the method with a picklistId that does not exist
    const label = component.getLabelFromExternalCode('nonExistentId', 'code1');

    // Expect the method to return undefined
    expect(label).toBeUndefined();
  });

  it('should return undefined if externalCode is not found in picklist', () => {
    const picklist = [
      {
        picklistId: 'somePicklistId',
        Picklist: [
          { externalCode: 'code1', label: 'Label1' },
          { externalCode: 'code2', label: 'Label2' },
        ],
      },
    ];

    component.picklist = picklist;

    // Call the method with an externalCode that does not exist in the picklist
    const label = component.getLabelFromExternalCode(
      'somePicklistId',
      'nonExistentCode',
    );

    // Expect the method to return undefined
    expect(label).toBeUndefined();
  });

  it('should return undefined if picklist is empty', () => {
    // Ensure picklist is empty
    component.picklist = [];

    // Call the method with any arguments
    const label = component.getLabelFromExternalCode(
      'anyPicklistId',
      'anyCode',
    );

    // Expect the method to return undefined
    expect(label).toBeUndefined();
  });

  it('should set regionName correctly when calendarName is Eastern Holiday Calendar', () => {
    const mockHolidayCalendarsData = {
      data: {
        calenderData: [
          {
            countryCode: 'IND',
            calendarList: [
              {
                calendarCode: 'KA_HC',
                calendarName: 'Eastern Holiday Calendar',
              },
            ],
          },
        ],
      },
    };
    const mockPickListData = [
      { Picklist: [{ externalCode: 'IND', label: 'India' }] },
    ];

    spyOn(dashboardService, 'getHolidayCalendars').and.returnValue(
      of(mockHolidayCalendarsData),
    );
    spyOn(commonService, 'getPickList').and.returnValue(of(mockPickListData));

    component.combineApiCalls();

    expect(component.holidayCalendarsList).toEqual(
      mockHolidayCalendarsData.data.calenderData,
    );
  });

  it('should call commonService.getEmployeeTimeOff and invoke other methods after resolving the promise', async () => {
    const mockTimeOffData = 'mockTimeOffData';
    spyOn(commonService, 'getEmployeeTimeOff').and.returnValue(
      Promise.resolve(mockTimeOffData),
    );
    const combineApiCallsSpy = spyOn(component, 'combineApiCalls');
    const getLeaveAndHolidayListSpy = spyOn(
      component,
      'getLeaveAndHolidayList',
    );

    await component.ngOnInit();

    expect(commonService.getEmployeeTimeOff).toHaveBeenCalled();
    expect(component.selectedCalendarCode).toEqual(mockTimeOffData);
    expect(combineApiCallsSpy).toHaveBeenCalled();
    expect(getLeaveAndHolidayListSpy).toHaveBeenCalled();
  });

  it('should correctly handle calendar data when countryCode is IND', () => {
    const mockHolidayCalendarsData = {
      data: {
        calenderData: [
          {
            countryCode: 'IND',
            calendarList: [
              {
                calendarCode: 'KA_HC',
                calendarName: 'Karnataka Holiday Calendar',
              },
              {
                calendarCode: 'KL_HC',
                calendarName: 'Kerala Holiday Calendar',
              },
            ],
          },
        ],
      },
    };
    const mockPickListData = [
      { Picklist: [{ externalCode: 'IND', label: 'India' }] },
    ];

    spyOn(dashboardService, 'getHolidayCalendars').and.returnValue(
      of(mockHolidayCalendarsData),
    );
    spyOn(commonService, 'getPickList').and.returnValue(of(mockPickListData));

    component.combineApiCalls();

    expect(component.holidayCalendarsList).toEqual(
      mockHolidayCalendarsData.data.calenderData,
    );

    // Test for South region
    const southRegionData = component.regionData.find(
      (region) => region.calendarName === 'South - Bangalore',
    );
    expect(southRegionData).toBeTruthy();
    expect(southRegionData.calendarCode).toEqual('KA_HC');

    // Test for other regions
    const eastRegionData = component.regionData.find((region) => {
      debugServiceSpy.log(region, 'region ---------------');
      return region.calendarName === 'South - Kerala';
    });
    expect(eastRegionData).toBeTruthy();
    expect(eastRegionData.calendarCode).toEqual('KL_HC');
  });
});
