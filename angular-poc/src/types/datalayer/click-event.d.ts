import { AnalyticsEvent } from 'src/app/shared/constants';
import { ClickInfoAIDL } from './click-info';
import { WebInteractionsDL } from './web-interaction';

export interface ClickEventDL {
  event: AnalyticsEvent;
  _airindia: ClickInfoAIDL;
  web: {
    webInteractions: WebInteractionsDL;
  };
}
