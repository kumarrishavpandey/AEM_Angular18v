import { of } from 'rxjs';
import { DashboardService } from './dashboard.service';

export class DashboardServiceMock {
  dashboardServiceSpy: jasmine.SpyObj<DashboardService>;

  dashboardServiceMock = {
    getEmployeeDashboardLeaveBalance: jasmine.createSpy('getEmployeeDashboardLeaveBalance'),
    getEmployeeDashboardLeaveList: jasmine.createSpy('getEmployeeDashboardLeaveList'),
    getHolidayCalendars: jasmine.createSpy('getHolidayCalendars'),
  };

  constructor() {
    this.dashboardServiceSpy = jasmine.createSpyObj('DashboardService', this.dashboardServiceMock);

    this.dashboardServiceSpy.getEmployeeDashboardLeaveBalance.and.returnValue(of({}));

    this.dashboardServiceSpy.getEmployeeDashboardLeaveList.and.returnValue(of({}));

    this.dashboardServiceSpy.getHolidayCalendars.and.returnValue(of({}));
  }
}
