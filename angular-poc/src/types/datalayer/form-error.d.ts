import { AnalyticsEvent } from 'src/app/shared/constants';
import { FormErrorAIDL } from './form-error-info';
import { WebInteractionsDL } from './web-interaction';

export interface FormErrorDL {
  event: AnalyticsEvent;
  _airindia: FormErrorAIDL;
  web: {
    webInteractions: WebInteractionsDL;
  };
}
