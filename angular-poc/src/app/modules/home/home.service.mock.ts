import { of, Subject } from 'rxjs';
import { BaseManagerListData } from '../shared/services/data/base-manager-list.data';
import { HomeService } from './home.service';

export const testEmployeeId = '80043172';

export const quickActionData = {
  data: {
    actionSubategoryCfModelByPath: {
      navCategories: {
        categoryId: 'quick-action-employees',
        label: 'Quick Actions',
        iconColor: 'rgba(61, 0, 59, 1)',
        iconBgColor: 'rgba(61, 0, 59, 0.06)',
        actionList: [
          {
            appId: 'EN_IN-1',
            label: 'Leaves',
            iconName: 'date_range',
            iconColor: 'rgba(232, 149, 129, 1)',
            iconBgColor: 'rgba(232, 149, 129, 0.06)',
            iconHoverBgColor: 'rgba(255, 140, 0, 0.15)',
            linkPath: '/content/my-ai/in/en/leave.html',
            isExternal: false,
            isQuickAction: true,
            isOneIdIcon: false,
          },
          {
            appId: 'EN_IN-2',
            label: 'myTeam',
            iconName: 'supervisor_account',
            iconColor: 'rgba(49, 116, 224, 1)',
            iconBgColor: 'rgba(49, 116, 224, 0.06)',
            iconHoverBgColor: 'rgba(49, 116, 224, 0.15)',
            linkPath: '/content/my-ai/in/en/my-team.html',
            isExternal: false,
            isQuickAction: true,
            isOneIdIcon: false,
          },
          {
            appId: 'EN_IN-4',
            label: 'Payroll',
            iconName: 'payments',
            iconColor: 'rgba(35, 162, 190, 1)',
            iconBgColor: 'rgba(35, 162, 190, 0.06)',
            iconHoverBgColor: 'rgba(35, 162, 190, 0.15)',
            linkPath: '/content/my-ai/in/en/payroll.html',
            isExternal: false,
            isQuickAction: true,
            isOneIdIcon: false,
          },
          {
            appId: 'EN_IN-3',
            label: 'Service Request',
            iconName: 'confirmation_number',
            iconColor: 'rgba(167, 30, 162, 1)',
            iconBgColor: 'rgba(167, 30, 162, 0.06)',
            iconHoverBgColor: 'rgba(167, 30, 162, 0.15)',
            linkPath: '/content/my-ai/in/en/service-request.html',
            isExternal: false,
            isQuickAction: true,
            isOneIdIcon: false,
          },
          {
            appId: 'EN_IN-5',
            label: 'Benefits',
            iconName: 'medical_information',
            iconColor: 'rgba(112, 213, 135, 1)',
            iconBgColor: 'rgba(112, 213, 135, 0.06)',
            iconHoverBgColor: 'rgba(112, 213, 135, 0.15)',
            linkPath: '/content/my-ai/in/en/benefits.html',
            isExternal: false,
            isQuickAction: true,
            isOneIdIcon: false,
          },
          {
            appId: 'EN_IN-6',
            label: 'Policies',
            iconName: 'policy',
            iconColor: 'rgba(158, 121, 71, 1)',
            iconBgColor: 'rgba(158, 121, 71, 0.06)',
            iconHoverBgColor: 'rgba(158, 121, 71, 0.15)',
            linkPath: '/content/my-ai/in/en/policy.html',
            isExternal: false,
            isQuickAction: true,
            isOneIdIcon: false,
          },
          {
            appId: 'EN_IN-7',
            label: 'myDocuments',
            iconName: 'article',
            iconColor: 'rgba(139, 110, 220, 1)',
            iconBgColor: 'rgba(139, 110, 220, 0.06)',
            iconHoverBgColor: 'rgba(107, 52, 176, 0.15)',
            linkPath: '/content/my-ai/in/en/mydocuments.html',
            isExternal: false,
            isQuickAction: true,
            isOneIdIcon: false,
          },
          {
            appId: 'EN_IN-14',
            label: 'myTrips',
            iconName: 'card_travel',
            iconColor: 'rgba(235, 190, 105, 1)',
            iconBgColor: 'rgba(235, 190, 105, 0.06)',
            iconHoverBgColor: 'rgba(235, 190, 105, 0.15)',
            linkPath: '/content/my-ai/in/en/my-trip.html',
            isExternal: false,
            isQuickAction: true,
            isOneIdIcon: false,
          },
          {
            appId: 'EN_IN-8',
            label: 'Learning Calender',
            iconName: 'school',
            iconColor: 'rgba(217, 184, 7, 1)',
            iconBgColor: 'rgba(217, 184, 7, 0.06)',
            iconHoverBgColor: 'rgba(217, 184, 7, 0.15)',
            linkPath: '/content/my-ai/in/en/learning-management.html',
            isExternal: false,
            isQuickAction: true,
            isOneIdIcon: false,
          },
        ],
      },
    },
  },
};

export class HomeServiceMock {
  homeServiceSpy: jasmine.SpyObj<HomeService>;

  homeServiceMock = {
    employeeData: new Subject<any>(),
    employeeHomePageData: new Subject<any>(),
    employeeId: testEmployeeId,
    setEmployeeData: jasmine.createSpy('setEmployeeData'),
    getEmployeeData: jasmine.createSpy('getEmployeeData'),
    setEmployeeHomePageData: jasmine.createSpy('setEmployeeHomePageData'),
    getEmployeeHomePageData: jasmine.createSpy('getEmployeeHomePageData'),
    getHowDoIDataFromAEM: jasmine.createSpy('getHowDoIDataFromAEM'),
    getWorkplace: jasmine.createSpy('getWorkplace'),
    getLearningData: jasmine.createSpy('getLearningData'),
    getLeaveBalance: jasmine.createSpy('getLeaveBalance'),
    getBlockHours: jasmine.createSpy('getBlockHours'),
    getTakeOffsLanding: jasmine.createSpy('getTakeOffsLanding'),
    getUpcomingHolidayData: jasmine.createSpy('getUpcomingHolidayData'),
    getUpcomingLearningData: jasmine.createSpy('getUpcomingLearningData'),
    getUpcomingTeamBirthdayData: jasmine.createSpy(
      'getUpcomingTeamBirthdayData'
    ),
    getUpcomingAlertDataFromAEM: jasmine.createSpy(
      'getUpcomingAlertDataFromAEM'
    ),
    getAwardsData: jasmine.createSpy('getAwardsData'),
    getDocExpInfo: jasmine.createSpy('getDocExpInfo'),
    getFlyingStats: jasmine.createSpy('getFlyingStats'),
    getWorkplaceConfig: jasmine.createSpy('getWorkplaceConfig'),
    getQuickActionsDataFromAEM: jasmine.createSpy('getQuickActionsDataFromAEM'),
    getBaseManagerList: jasmine.createSpy('getBaseManagerList'),
  };

  constructor() {
    this.homeServiceSpy = jasmine.createSpyObj(
      'HomeService',
      this.homeServiceMock
    );

    this.homeServiceSpy.getQuickActionsDataFromAEM.and.returnValue(
      of(quickActionData)
    );

    this.homeServiceSpy.getBaseManagerList.and.returnValue(
      of(BaseManagerListData)
    );
  }
}
