import { Injectable } from '@angular/core';

import { CommonService } from './common.service';
import { DebugService } from './debug.service';
import { AnalyticsInfo } from '../../../../types/datalayer/analytics-info';
import { ClickInfoAIDL } from '../../../../types/datalayer/click-info';
import { AirIndiaDL } from '../../../../types/datalayer/airindia';
import { PageLoadDL } from '../../../../types/datalayer/page-load';
import { ClickEventDL } from '../../../../types/datalayer/click-event';
import { FormStartDL } from '../../../../types/datalayer/form-start';
import { FormCompleteDL } from '../../../../types/datalayer/form-complete';
import { ApiErrorDL } from '../../../../types/datalayer/api-error';
import { AnalyticsComponent, AnalyticsEvent, EmploymentType } from '../constants';
import { WebInteractionsDL } from '../../../../types/datalayer/web-interaction';
import { FormStartAIDL } from '../../../../types/datalayer/form-start-info';
import { FormCompleteAIDL } from '../../../../types/datalayer/form-complete-info';
import { FormErrorAIDL } from '../../../../types/datalayer/form-error-info';
import { FormErrorDL } from '../../../../types/datalayer/form-error';
import { ApiErrorAIDL } from '../../../../types/datalayer/api-error-info';
import { replaceSpaceWithHyphen, toTitleCase } from '../../../../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class AdobeAnalyticsService {
  analyticsInfo: AnalyticsInfo;

  siteSection: string;

  siteSubSection: string;

  clickName: string;

  constructor(
    private commonService: CommonService,
    private debugService: DebugService,
  ) {}

  setAnalyticsInfo(analyticsInfo: AnalyticsInfo) {
    window.myaiAnalyticsInfo = analyticsInfo;

    this.analyticsInfo = analyticsInfo;
  }

  getComponentID(data: ClickInfoAIDL, airindiaDataLayer: AirIndiaDL) {
    const { clickInfo } = data;

    const { siteSection, siteSubSection } = airindiaDataLayer;

    const { clickName, componentName } = clickInfo;

    let componentID: string = siteSection;

    if (siteSection !== siteSubSection) {
      componentID += `_${siteSubSection}`;
    }

    if (siteSubSection !== componentName) {
      componentID += `_${componentName}`;
    }

    if (componentName !== clickName) {
      componentID += `_${clickName}`;
    }

    return replaceSpaceWithHyphen(componentID.toLowerCase());
  }

  windowAdobeDataLayer = (data: any) => {
    window.adobeDataLayer.push(data);

    this.debugService.trace(data);
  };

  pushAdobeDataLayer = (
    data: PageLoadDL | ClickEventDL | FormStartDL | FormCompleteDL | ApiErrorDL,
  ) => {
    window.adobeDataLayer = window.adobeDataLayer || [];

    if ('adobeDataLayer' in window && window.adobeDataLayer.length > -1) {
      if (this.commonService.isLoginPage()) {
        this.windowAdobeDataLayer(data);
      } else {
        this.commonService.fetchLoggedInEmployeeData().subscribe((user) => {
          const userDepartment = user.departmentDesc;

          const userDesignation = user.designationDesc;

          const userFunction = user.functionDesc;

          const userPersona = user.role;

          const userEmploymentType = user.employmentType === '1' ? EmploymentType.VISTARA : EmploymentType.AI;

          const dlData = {
            ...data,
            _airindia: {
              ...data._airindia,
              userDepartment,
              userDesignation,
              userFunction,
              userPersona,
              userEmploymentType,
            },
          };

          this.windowAdobeDataLayer(dlData);
        });
      }
    }
  };

  airindiaDL = (data: AirIndiaDL): AirIndiaDL => {
    const dlAnalyticsInfo = {} as AirIndiaDL;

    if (this.analyticsInfo) {
      if ('countryCode' in this.analyticsInfo && this.analyticsInfo.countryCode) {
        dlAnalyticsInfo.countryCode = this.analyticsInfo.countryCode;
      }

      if ('countryName' in this.analyticsInfo && this.analyticsInfo.countryName) {
        dlAnalyticsInfo.countryName = this.analyticsInfo.countryName;
      }

      if ('language' in this.analyticsInfo && this.analyticsInfo.language) {
        dlAnalyticsInfo.language = this.analyticsInfo.language;
      }

      if ('pageName' in this.analyticsInfo && this.analyticsInfo.pageName) {
        dlAnalyticsInfo.pageName = this.analyticsInfo.pageName;
      }

      if ('pageType' in this.analyticsInfo && this.analyticsInfo.pageType) {
        dlAnalyticsInfo.pageType = this.analyticsInfo.pageType;
      }

      if ('siteName' in this.analyticsInfo && this.analyticsInfo.siteName) {
        dlAnalyticsInfo.siteName = this.analyticsInfo.siteName;
      }
    }

    const dlOtherInfo = {} as {
      pageURL: string;
      isErrorPage: boolean;
      siteSection: string;
      siteSubSection: string;
    };

    [dlOtherInfo.pageURL] = window.location.href.split('?');

    if (data) {
      if ('isErrorPage' in data && data.isErrorPage !== undefined) {
        dlOtherInfo.isErrorPage = data.isErrorPage;
      }

      if ('siteSection' in data && data.siteSection) {
        dlOtherInfo.siteSection = toTitleCase(data.siteSection);

        this.siteSection = dlOtherInfo.siteSection;
      }

      if ('siteSubSection' in data && data.siteSubSection) {
        dlOtherInfo.siteSubSection = data.siteSubSection;

        if (data.siteSubSection === 'Navbar' && this.analyticsInfo && 'pageName' in this.analyticsInfo) {
          const siteSectionObj = this.analyticsInfo.pageName.split('|');
          dlOtherInfo.siteSection = siteSectionObj[siteSectionObj.length - 1];
        }

        dlOtherInfo.siteSubSection = toTitleCase(dlOtherInfo.siteSubSection);

        this.siteSubSection = dlOtherInfo.siteSubSection;
      }
    }

    return {
      ...dlAnalyticsInfo,
      ...dlOtherInfo,
    };
  };

  pageLoadDatalayer = (data: AirIndiaDL): void => {
    const dataLayer: PageLoadDL = {
      event: AnalyticsEvent.PAGE_LOAD,
      _airindia: {
        ...this.airindiaDL(data),
      },
      web: {
        webPageDetails: {
          name: this.analyticsInfo.pageName,
          URL: window.location.href.split('?')[0],
          server: this.analyticsInfo.server,
          siteSection: toTitleCase(data.siteSection),
          pageViews: {
            value: 1,
          },
        },
      },
    };

    this.pushAdobeDataLayer(dataLayer);
  };

  clickEventDatalayer = (data: ClickInfoAIDL): void => {
    const { clickInfo } = data;

    const airindiaDataLayer: AirIndiaDL = this.airindiaDL(data);

    const webInteractions = {
      name: clickInfo.clickName,
      type: 'other',
      linkClicks: {
        value: 1,
      },
    } as WebInteractionsDL;

    this.clickName = clickInfo.clickName;

    if (data && 'linkURL' && data && data.linkURL) {
      let { linkURL } = data;

      if (!linkURL.startsWith('http')) {
        linkURL = window.location.origin + linkURL;
      }

      [webInteractions.URL] = linkURL.split('?');
    }

    const dataLayer: ClickEventDL = {
      event: AnalyticsEvent.CLICK,
      _airindia: {
        ...airindiaDataLayer,
        clickInfo: {
          ...clickInfo,
          componentID: this.getComponentID(data, airindiaDataLayer),
        },
      },
      web: {
        webInteractions: { ...webInteractions },
      },
    };

    this.pushAdobeDataLayer(dataLayer);
  };

  formStartDatalayer = (data: FormStartAIDL): void => {
    const { form } = data;

    this.clickName = form.clickName;

    const dataLayer: FormStartDL = {
      event: AnalyticsEvent.FORM_START,
      _airindia: {
        ...this.airindiaDL(data),
        form: { ...form },
      },
      web: {
        webInteractions: {
          name: form.clickName,
          type: 'other',
          linkClicks: {
            value: 1,
          },
        },
      },
    };

    this.pushAdobeDataLayer(dataLayer);
  };

  formCompleteDatalayer = (data: FormCompleteAIDL): void => {
    const { form } = data;

    this.clickName = form.clickName;

    const dataLayer: FormCompleteDL = {
      event: AnalyticsEvent.FORM_COMPLETE,
      _airindia: {
        ...this.airindiaDL(data),
        form: { ...form },
      },
      web: {
        webInteractions: {
          name: form.clickName,
          type: 'other',
          linkClicks: {
            value: 1,
          },
        },
      },
    };

    this.pushAdobeDataLayer(dataLayer);
  };

  formErrorDatalayer = (data: FormErrorAIDL, clickName: string): void => {
    const { errorInfo } = data;

    const { form } = data;

    const dataLayer: FormErrorDL = {
      event: AnalyticsEvent.FORM_ERROR,
      _airindia: {
        ...this.airindiaDL(data),
        errorInfo: { ...errorInfo },
        form: { ...form },
      },
      web: {
        webInteractions: {
          name: clickName,
          type: 'other',
          linkClicks: {
            value: 1,
          },
        },
      },
    };

    this.pushAdobeDataLayer(dataLayer);
  };

  apiErrorDatalayer = (data: ApiErrorAIDL, clickName?: string): void => {
    const { errorInfo } = data;

    const dlData = { ...data };

    if (clickName) {
      this.clickName = clickName;
    }

    dlData.siteSection = this.siteSection;

    dlData.siteSubSection = this.siteSubSection;

    const dataLayer: ApiErrorDL = {
      event: AnalyticsEvent.API_ERROR,
      _airindia: {
        ...this.airindiaDL(dlData),
        errorInfo: { ...errorInfo },
      },
      web: {
        webInteractions: {
          name: this.clickName || 'API ERROR',
          type: 'other',
          linkClicks: {
            value: 1,
          },
        },
      },
    };

    this.pushAdobeDataLayer(dataLayer);
  };

  trackClickEvent(data: {
    siteSection: string;
    siteSubSection: string;
    clickName: string;
    clickComponentType: AnalyticsComponent;
    componentName: string;
    bannerName?: string;
    bannerDescription?: string;
    linkURL?: string;
    isErrorPage?: boolean;
  }) {
    let dataLayer: ClickInfoAIDL = {
      isErrorPage: data.isErrorPage || false,
      siteSection: data.siteSection,
      siteSubSection: data.siteSubSection,
      clickInfo: {
        clickName: data.clickName,
        clickComponentType: data.clickComponentType,
        componentName: data.componentName,
      },
    };

    if (data.bannerName) {
      dataLayer = {
        ...dataLayer,
        clickInfo: {
          ...dataLayer.clickInfo,
          bannerName: data.bannerName,
          bannerDescription: data.bannerDescription,
        },
      };
    }

    if (data.linkURL) {
      dataLayer = {
        ...dataLayer,
        linkURL: data.linkURL,
      };
    }

    this.clickEventDatalayer(dataLayer);
  }
}
