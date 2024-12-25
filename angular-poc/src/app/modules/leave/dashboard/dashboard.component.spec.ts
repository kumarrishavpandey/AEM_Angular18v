import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { AdobeAnalyticsServiceMock } from 'src/app/shared/services/__mock__/adobe-analytics.service.mock';
import { CommonServiceMock } from 'src/app/shared/services/__mock__/common.service.mock';
import { AdobeAnalyticsService } from 'src/app/shared/services/adobe-analytics.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { DashboardService } from '../services/dashboard.service';
import { DashboardServiceMock } from '../services/dashboard.service.mock';
import { DashboardComponent } from './dashboard.component';
import { SelectRegionComponent } from './select-region/select-region.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let adobeAnalyticsServiceSpy: jasmine.SpyObj<AdobeAnalyticsService>;
  let commonServiceSpy: jasmine.SpyObj<CommonService>;
  let dashboardServiceSpy: jasmine.SpyObj<DashboardService>;

  beforeEach(waitForAsync(() => {
    adobeAnalyticsServiceSpy = new AdobeAnalyticsServiceMock().adobeAnalyticsServiceSpy;

    commonServiceSpy = new CommonServiceMock().commonServiceSpy;

    commonServiceSpy.getEmployeeTimeOff.and.returnValue(Promise.resolve('KA_HC'));

    commonServiceSpy.getPickList.and.returnValue(
      of([
        {
          Picklist: [{ externalCode: 'IND', label: 'India' }],
        },
      ]),
    );

    dashboardServiceSpy = new DashboardServiceMock().dashboardServiceSpy;

    dashboardServiceSpy.getHolidayCalendars.and.returnValue(
      of({
        data: {
          calenderData: [
            {
              countryCode: 'IND',
              calendarList: [
                {
                  calendarCode: 'KA_HC',
                  calendarName: 'Karnataka Holiday Calendar',
                },
              ],
            },
          ],
        },
      }),
    );

    dashboardServiceSpy.getEmployeeDashboardLeaveBalance.and.returnValue(
      of({
        data: {
          leaveTypes: [],
        },
      }),
    );

    dashboardServiceSpy.getEmployeeDashboardLeaveList.and.returnValue(
      of({
        data: {
          upcomingHolidayLeavesCalendarView: [],
        },
      }),
    );

    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatMenuModule,
        MatTabsModule,
        BrowserAnimationsModule,
      ],
      declarations: [DashboardComponent, SelectRegionComponent],
      providers: [
        { provide: DashboardService, useValue: dashboardServiceSpy },
        { provide: CommonService, useValue: commonServiceSpy },
        { provide: AdobeAnalyticsService, useValue: adobeAnalyticsServiceSpy },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    component.dashboardLabels = {
      btnCalendarView: 'Calendar View',
      btnListView: 'List View',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set default values on init', async () => {
    await component.ngOnInit();
    expect(component.selectedView).toBe('Calendar View');
    expect(component.selectedCalendarCode).toBe('KA_HC');
    expect(commonServiceSpy.getEmployeeTimeOff).toHaveBeenCalled();
    expect(commonServiceSpy.fetchPersonaInfo).toHaveBeenCalled();
    expect(
      dashboardServiceSpy.getEmployeeDashboardLeaveBalance,
    ).toHaveBeenCalled();
    expect(
      dashboardServiceSpy.getEmployeeDashboardLeaveList,
    ).toHaveBeenCalled();
    expect(dashboardServiceSpy.getHolidayCalendars).toHaveBeenCalled();
    expect(commonServiceSpy.getPickList).toHaveBeenCalled();
  });

  it('should update dashboard selected region', () => {
    const el = {
      subItem: 'Bangalore',
      item: 'Karnataka',
      subItemCode: 'KA_HC',
      code: 'KA',
    };
    component.updateDashboardSelectedRegion(el);
    expect(component.selectedElementName).toBe('Bangalore, Karnataka');
    expect(component.selectedCalendarCode).toBe('KA_HC');
    expect(
      dashboardServiceSpy.getEmployeeDashboardLeaveList,
    ).toHaveBeenCalledWith('KA_HC');
  });

  it('should set selected date', () => {
    const date = new Date();
    component.setSelectedDate(date);
    expect(component.selectedCalendarDate).toBe(date);
  });

  it('should toggle view to Calendar View', () => {
    component.toggleView('Calendar View');
    expect(component.selectedView).toBe('Calendar View');
    expect(component.isCalendarView).toBe(true);
  });

  it('should toggle view to List View', () => {
    component.toggleView('List View');
    expect(component.selectedView).toBe('List View');
    expect(component.isCalendarView).toBe(false);
  });

  it('should apply leave and emit event', () => {
    spyOn(component.openTabEvent, 'emit');
    component.onApplyLeaveButtonClick();
    expect(adobeAnalyticsServiceSpy.clickEventDatalayer).toHaveBeenCalled();
    expect(component.openTabEvent.emit).toHaveBeenCalled();
  });

  it('should handle header button click and toggle view', () => {
    spyOn(component, 'toggleView');
    component.onHeaderButtonClick('List View');
    expect(adobeAnalyticsServiceSpy.clickEventDatalayer).toHaveBeenCalled();
    expect(component.toggleView).toHaveBeenCalledWith('List View');
  });

  it('should handle select region button click', () => {
    component.selectRegionButtonClicked();
    expect(adobeAnalyticsServiceSpy.clickEventDatalayer).toHaveBeenCalled();
  });
});
