import { AnalyticsEvent } from 'src/app/shared/constants';
import { FormStartAIDL } from './form-start-info';
import { WebInteractionsDL } from './web-interaction';

export interface FormStartDL {
  event: AnalyticsEvent;
  _airindia: FormStartAIDL;
  web: {
    webInteractions: WebInteractionsDL;
  };
}
