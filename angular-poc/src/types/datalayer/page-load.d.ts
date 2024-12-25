import { AnalyticsEvent } from 'src/app/shared/constants';
import { AirIndiaDL } from './airindia';
import { WebPageDetailsDL } from './web-page-details';

export interface PageLoadDL {
  event: AnalyticsEvent;
  _airindia: AirIndiaDL;
  web: {
    webPageDetails: WebPageDetailsDL;
  };
}
