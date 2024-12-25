import { BehaviorSubject, of } from 'rxjs';
import { NavigationService } from './navigation.service';

export const personalisedNavigation = {
  personalNavList: {
    categoryId: 'EN_IN-Personalised-Employee',
    label: 'All Apps',
    iconName: 'link',
    iconColor: 'rgba(61, 0, 59, 1)',
    iconBgColor: 'rgba(61, 0, 59, 0.06)',
    actionList: [
      {
        appId: '1234567890',
        label: '1to1 Help',
        iconUrl: {
          _path: '/content/dam/my-ai/app-icon/1to1help.png',
        },
        linkPath: 'https://1to1help.net/',
        isExternal: true,
        isQuickAction: true,
        isOneIdIcon: false,
      },
      {
        appId: 'NA',
        label: 'Life ka Plan',
        iconUrl: {
          _path: '/content/dam/my-ai/app-icon/lifeKaPlan.png',
        },
        linkPath: 'https://lifekaplan-eb.tmibasl.in/login',
        isExternal: true,
        isQuickAction: true,
        isOneIdIcon: false,
      },
      {
        appId: '809b47c9-d312-4930-9b83-5e4cfee71687',
        label: ' Microsoft 365',
        iconUrl: {
          _path: '/content/dam/my-ai/app-icon/microsoft.png',
        },
        linkPath: 'https://www.office.com/?auth=2',
        isExternal: true,
        isQuickAction: true,
        isOneIdIcon: true,
      },
      {
        appId: 'NA',
        label: 'Outlook',
        iconUrl: {
          _path: '/content/dam/my-ai/app-icon/Outlook.png',
        },
        linkPath: 'https://outlook.office.com/mail/',
        isExternal: true,
        isQuickAction: true,
        isOneIdIcon: true,
      },
    ],
  },
};

export class NavigationServiceMock {
  navigationServiceSpy: jasmine.SpyObj<NavigationService>;

  navigationServiceMock = {
    personalisedNavigation: new BehaviorSubject<any>(null),
    fetchPersonalisedNavigation: true,
    getAnalyzeAppData: jasmine.createSpy('getAnalyzeAppData'),
    updateAppCounter: jasmine.createSpy('updateAppCounter'),
    getPersonalisedNavigationData: jasmine.createSpy('getPersonalisedNavigationData'),
    setPersonalisedNavigation: jasmine.createSpy('setPersonalisedNavigation'),
  };

  constructor() {
    this.navigationServiceSpy = jasmine.createSpyObj('NavigationService', this.navigationServiceMock);

    this.navigationServiceSpy.personalisedNavigation = new BehaviorSubject<any>(personalisedNavigation);

    this.navigationServiceSpy.getAnalyzeAppData.and.returnValue(of({}));

    this.navigationServiceSpy.updateAppCounter.and.returnValue(of({}));

    this.navigationServiceSpy.getPersonalisedNavigationData.and.returnValue(of({}));

    this.navigationServiceSpy.setPersonalisedNavigation.and.returnValue();
  }
}
