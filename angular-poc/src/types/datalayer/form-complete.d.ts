import { AnalyticsEvent } from 'src/app/shared/constants';
import { FormCompleteAIDL } from './form-complete-info';
import { WebInteractionsDL } from './web-interaction';

export interface FormCompleteDL {
  event: AnalyticsEvent;
  _airindia: FormCompleteAIDL;
  web: {
    webInteractions: WebInteractionsDL;
  };
}
